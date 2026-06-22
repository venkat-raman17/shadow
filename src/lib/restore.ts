import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { pbkdf2Async } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import type { SQLiteDatabase } from 'expo-sqlite';

import { decrypt } from '@/lib/crypto';
import type { ShadowExport } from '@/lib/export';
import {
  restoreEntries,
  restoreParts,
  restoreSessions,
  restoreExperiments,
  restoreGrounding,
} from '@/lib/db';
import { getItem, setItem } from '@/lib/kv';
import { BACKUP_KEYS } from '@/lib/backupKeys';
import { canAuthenticate } from '@/lib/appLock';

// ─── Result types ────────────────────────────────────────────────────────────

export interface RestoreResult {
  entries: number;
  parts: number;
  sessions: number;
  experiments: number;
  grounding: number;
  /** True when the backup carried a profile and the user was signed back in. */
  signedIn: boolean;
}

export type RestoreOutcome =
  | RestoreResult
  | 'canceled'
  | 'wrong_passphrase'
  | 'invalid_file';

// ─── Internal helper ────────────────────────────────────────────────────────

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function isValidEnvelope(obj: unknown): obj is { version: number; salt: string; data: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj as Record<string, unknown>).version === 1 &&
    typeof (obj as Record<string, unknown>).salt === 'string' &&
    typeof (obj as Record<string, unknown>).data === 'string'
  );
}

// ─── Main restore function ────────────────────────────────────────────────────

/**
 * Opens the system file picker, reads the chosen .shadowexport file,
 * decrypts it with the provided passphrase, and merges the plaintext data
 * into the local DB using INSERT OR IGNORE (by primary key).
 *
 * Re-encrypts all plaintext fields with the current device key before inserting,
 * keeping the DB schema consistent with the rest of the app.
 *
 * Returns a RestoreResult (counts), or a string tag for user-visible errors.
 */
export async function pickAndRestoreBackup(
  db: SQLiteDatabase,
  deviceKey: Uint8Array,
  passphrase: string,
): Promise<RestoreOutcome> {
  // 1. Open file picker
  const picked = await DocumentPicker.getDocumentAsync({
    type: '*/*',
    copyToCacheDirectory: true,
  });

  if (picked.canceled) return 'canceled';

  const uri = picked.assets[0].uri;

  // 2. Read file. On web the picker hands back a blob: URL (FileSystem can't read
  //    it) — fetch it instead; on native, read from the file URI.
  let raw: string;
  try {
    raw =
      Platform.OS === 'web'
        ? await fetch(uri).then((r) => r.text())
        : await FileSystem.readAsStringAsync(uri);
  } catch {
    return 'invalid_file';
  }

  // 3. Parse outer envelope
  let envelope: unknown;
  try {
    envelope = JSON.parse(raw);
  } catch {
    return 'invalid_file';
  }

  if (!isValidEnvelope(envelope)) return 'invalid_file';

  // 4. Derive key from passphrase + salt
  let salt: Uint8Array;
  try {
    salt = fromBase64(envelope.salt);
  } catch {
    return 'invalid_file';
  }

  const derivedKey = await pbkdf2Async(sha256, passphrase, salt, {
    c: 100_000,
    dkLen: 32,
  });

  // 5. Decrypt — wrong passphrase will throw here
  let inner: string;
  try {
    inner = decrypt(envelope.data, derivedKey);
  } catch {
    return 'wrong_passphrase';
  }

  // 6. Parse inner export object
  let exportObj: ShadowExport;
  try {
    exportObj = JSON.parse(inner) as ShadowExport;
  } catch {
    return 'invalid_file';
  }

  // 7. Merge into DB (INSERT OR IGNORE — never overwrites)
  const [entries, parts, sessions, experiments, grounding] = await Promise.all([
    restoreEntries(db, exportObj.entries ?? [], deviceKey),
    restoreParts(db, exportObj.parts ?? [], deviceKey),
    restoreSessions(db, exportObj.sessions ?? [], deviceKey),
    restoreExperiments(db, exportObj.experiments ?? [], deviceKey),
    restoreGrounding(db, exportObj.grounding ?? [], deviceKey),
  ]);

  // 8. Restore the SecureStore identity. v2 backups carry the full `prefs` map
  //    (name, gender, onboarding acknowledgment, theme, favorites, unlocks, and
  //    the locks); v1 backups only carried `profile` (name/gender).
  let signedIn = false;
  const prefs = exportObj.prefs;
  if (prefs) {
    const allow = new Set<string>(BACKUP_KEYS);
    for (const [k, v] of Object.entries(prefs)) {
      if (!allow.has(k)) continue;
      // App-lock safety: never re-arm a biometric lock the new device can't
      // actually satisfy, or the restored user would be stranded.
      if (k === 'shadow.app_lock_enabled' && v === 'true' && !(await canAuthenticate())) {
        await setItem(k, 'false');
      } else {
        await setItem(k, v);
      }
    }
    signedIn = !!prefs['shadow.user_name'] && !!prefs['shadow.user_gender'];
    if (signedIn) await setItem('shadow.onboarding_complete', 'true');
  } else {
    // Legacy v1 path: only name/gender/onboarding from `profile`.
    const profile = exportObj.profile;
    if (profile && profile.name && profile.gender) {
      await Promise.all([
        setItem('shadow.user_name', profile.name),
        setItem('shadow.user_gender', profile.gender),
        setItem('shadow.onboarding_complete', 'true'),
      ]);
      signedIn = true;
    }
  }

  // Guard: if notebook lock was marked enabled but no PIN hash exists (new-format
  // backup that excludes PIN credentials, or an old backup on a fresh device),
  // disable the lock so the user isn't stranded behind a PIN they can't enter.
  const pinHash = await getItem('shadow.notebook_pin_hash');
  if (!pinHash) await setItem('shadow.notebook_lock_enabled', 'false');

  return { entries, parts, sessions, experiments, grounding, signedIn };
}
