import { Platform } from 'react-native';
import { pbkdf2Async } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import type { SQLiteDatabase } from 'expo-sqlite';

import { decrypt, encrypt } from '@/lib/crypto';
import { getItem } from '@/lib/kv';

// ─── Internal helper ────────────────────────────────────────────────────────

function toBase64(bytes: Uint8Array): string {
  let result = '';
  for (let i = 0; i < bytes.length; i++) result += String.fromCharCode(bytes[i]);
  return btoa(result);
}

/** Safely decrypt a nullable enc field — returns null on any failure */
function dec(val: string | null | undefined, key: Uint8Array): string | null {
  if (!val) return null;
  try {
    return decrypt(val, key);
  } catch {
    return null;
  }
}

// ─── Export payload types ────────────────────────────────────────────────────

export interface ExportEntry {
  id: string;
  created_at: number;
  flow_id: string | null;
  subject: string | null;
  quality: string | null;
  charge: number | null;
  echo: string | null;
  reclaim: string | null;
}

export interface ExportPart {
  id: string;
  name: string | null;
  form: string | null;
  body_location: string | null;
  first_appeared: string | null;
  sketch: string | null;
  golden: number;
  created_at: number;
  last_met_at: number | null;
}

export interface ExportSession {
  id: string;
  part_id: string | null;
  flow_id: string | null;
  created_at: number;
  charge_before: number | null;
  charge_after: number | null;
  dialogue: string | null;
  need: string | null;
}

export interface ExportExperiment {
  id: string;
  source_session_id: string | null;
  description: string | null;
  created_at: number;
  status: string;
  reflection: string | null;
}

/** Optional so a restore can fully sign the user back in (older backups omit it). */
export interface ShadowProfile {
  name: string | null;
  gender: string | null;
}

export interface ShadowExport {
  version: 1;
  exportedAt: number;
  entries: ExportEntry[];
  parts: ExportPart[];
  sessions: ExportSession[];
  experiments: ExportExperiment[];
  profile?: ShadowProfile;
}

// ─── Row types (what the DB returns) ────────────────────────────────────────

interface EntryRow {
  id: string;
  created_at: number;
  flow_id: string | null;
  subject_enc: string | null;
  quality: string | null;
  charge: number | null;
  echo_enc: string | null;
  reclaim_enc: string | null;
}

interface PartRow {
  id: string;
  name: string | null;
  form_enc: string | null;
  body_location: string | null;
  first_appeared_enc: string | null;
  sketch_enc: string | null;
  golden: number;
  created_at: number;
  last_met_at: number | null;
}

interface SessionRow {
  id: string;
  part_id: string | null;
  flow_id: string | null;
  created_at: number;
  charge_before: number | null;
  charge_after: number | null;
  dialogue_enc: string | null;
  need_enc: string | null;
}

interface ExperimentRow {
  id: string;
  source_session_id: string | null;
  description_enc: string | null;
  created_at: number;
  status: string;
  reflection_enc: string | null;
}

// ─── Main export function ────────────────────────────────────────────────────

/**
 * Decrypts all journal data, re-encrypts it under a PBKDF2-derived key from
 * the user's passphrase, writes the envelope to the device cache, and opens
 * the system share sheet so the user can save it wherever they choose.
 *
 * File format:
 *   { version: 1, salt: base64(16 bytes), data: encrypt(JSON, derivedKey) }
 *
 * The `data` field uses the same AES-256-GCM format as the rest of the app:
 *   base64(12-byte-nonce || ciphertext+tag)
 *
 * To restore: derive the key from passphrase + salt, then decrypt `data`.
 */
export async function exportData(
  db: SQLiteDatabase,
  existingKey: Uint8Array,
  passphrase: string,
): Promise<void> {
  // 1. Query and decrypt entries
  const entryRows = await db.getAllAsync<EntryRow>(
    'SELECT id, created_at, flow_id, subject_enc, quality, charge, echo_enc, reclaim_enc FROM entries ORDER BY created_at DESC',
  );
  const entries: ExportEntry[] = entryRows.map((r) => ({
    id: r.id,
    created_at: r.created_at,
    flow_id: r.flow_id,
    subject: dec(r.subject_enc, existingKey),
    quality: r.quality,
    charge: r.charge,
    echo: dec(r.echo_enc, existingKey),
    reclaim: dec(r.reclaim_enc, existingKey),
  }));

  // 2. Query and decrypt parts
  const partRows = await db.getAllAsync<PartRow>(
    'SELECT id, name, form_enc, body_location, first_appeared_enc, sketch_enc, golden, created_at, last_met_at FROM parts ORDER BY created_at DESC',
  );
  const parts: ExportPart[] = partRows.map((r) => ({
    id: r.id,
    name: r.name,
    form: dec(r.form_enc, existingKey),
    body_location: r.body_location,
    first_appeared: dec(r.first_appeared_enc, existingKey),
    sketch: dec(r.sketch_enc, existingKey),
    golden: r.golden,
    created_at: r.created_at,
    last_met_at: r.last_met_at,
  }));

  // 3. Query and decrypt sessions
  const sessionRows = await db.getAllAsync<SessionRow>(
    'SELECT id, part_id, flow_id, created_at, charge_before, charge_after, dialogue_enc, need_enc FROM sessions ORDER BY created_at DESC',
  );
  const sessions: ExportSession[] = sessionRows.map((r) => ({
    id: r.id,
    part_id: r.part_id,
    flow_id: r.flow_id,
    created_at: r.created_at,
    charge_before: r.charge_before,
    charge_after: r.charge_after,
    dialogue: dec(r.dialogue_enc, existingKey),
    need: dec(r.need_enc, existingKey),
  }));

  // 4. Query and decrypt experiments
  const expRows = await db.getAllAsync<ExperimentRow>(
    'SELECT id, source_session_id, description_enc, created_at, status, reflection_enc FROM experiments ORDER BY created_at DESC',
  );
  const experiments: ExportExperiment[] = expRows.map((r) => ({
    id: r.id,
    source_session_id: r.source_session_id,
    description: dec(r.description_enc, existingKey),
    created_at: r.created_at,
    status: r.status,
    reflection: dec(r.reflection_enc, existingKey),
  }));

  // 5. Profile (name/gender) — lets a restore fully sign the user back in.
  const profile: ShadowProfile = {
    name: await getItem('shadow.user_name'),
    gender: await getItem('shadow.user_gender'),
  };

  // 6. Assemble plaintext export object
  const exportObj: ShadowExport = {
    version: 1,
    exportedAt: Date.now(),
    entries,
    parts,
    sessions,
    experiments,
    profile,
  };

  // 6. Derive a new key from the passphrase (100k PBKDF2-SHA256 iterations)
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  const derivedKey = await pbkdf2Async(sha256, passphrase, salt, {
    c: 100_000,
    dkLen: 32,
  });

  // 7. Encrypt the full export JSON with the derived key
  const cipherData = encrypt(JSON.stringify(exportObj), derivedKey);

  // 8. Wrap in the outer envelope
  const envelope = JSON.stringify({
    version: 1,
    salt: toBase64(salt),
    data: cipherData,
  });

  // 9. Save the backup. On web, trigger a browser download; on native, write to
  //    the cache and open the system share sheet.
  const filename = `shadow-backup-${Date.now()}.shadowexport`;

  if (Platform.OS === 'web') {
    const blob = new Blob([envelope], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return;
  }

  const cacheDir = FileSystem.cacheDirectory ?? '';
  const uri = `${cacheDir}${filename}`;
  await FileSystem.writeAsStringAsync(uri, envelope);
  await Sharing.shareAsync(uri, {
    mimeType: 'application/octet-stream',
    dialogTitle: 'Save your Partwise backup',
  });
}
