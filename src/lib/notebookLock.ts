import { pbkdf2Async } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { Platform } from 'react-native';

import { getItem, setItem } from '@/lib/kv';
import { toBase64, fromBase64 } from '@/lib/base64';
import { canAuthenticate, authenticate } from '@/lib/appLock';

/**
 * A separate, optional PIN lock for the Notebook tab — distinct from the
 * device-passcode app lock, so the user's reflections stay closed even to
 * someone who can unlock the phone. Compassion-first, not a vault: no
 * failed-attempt counter, no lockout timer; everything fails toward "ask again"
 * and never erases data (which is already AES-encrypted at rest). We still salt
 * and stretch the PIN so a leaked SecureStore blob can't be trivially reversed.
 */

const ENABLED_KEY = 'shadow.notebook_lock_enabled';
const SALT_KEY = 'shadow.notebook_pin_salt';
const HASH_KEY = 'shadow.notebook_pin_hash';
const BIOMETRIC_KEY = 'shadow.notebook_pin_biometric';
// The digit count of the set PIN, so the pad knows when an entry is complete and
// can auto-submit (supports 4–6 digits). Only the length is stored, never the
// PIN, and the hash it guards is already hardware-protected in SecureStore.
const LEN_KEY = 'shadow.notebook_pin_len';
// The PBKDF2 iteration count used when the PIN was set, stored so we can change
// the default per-platform without invalidating existing hashes.
const ITERS_KEY = 'shadow.notebook_pin_iters';

export const MIN_PIN_LENGTH = 4;
export const MAX_PIN_LENGTH = 6;

// Web: @noble/hashes detects crypto.subtle and delegates to the browser's
// native WebCrypto (C++) → 200k iterations completes in <1ms.
// Native: no crypto.subtle → pure-JS PBKDF2 → 200k blocks the JS thread for
// ~10s. 10k keeps it under ~100ms while remaining ample for a privacy curtain
// backed by hardware-protected SecureStore.
const DEFAULT_PBKDF2_ITERS = Platform.OS === 'web' ? 200_000 : 10_000;
// Fallback for hashes written before ITERS_KEY was introduced.
const LEGACY_PBKDF2_ITERS = 200_000;
const DK_LEN = 32;
const SALT_LEN = 16;

function randomBytes(n: number): Uint8Array {
  const buf = new Uint8Array(n);
  crypto.getRandomValues(buf);
  return buf;
}

async function hashPin(pin: string, salt: Uint8Array, iters: number): Promise<Uint8Array> {
  return pbkdf2Async(sha256, pin, salt, { c: iters, dkLen: DK_LEN });
}

/** Constant-time byte comparison — never short-circuits on the first mismatch. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function isNotebookLockEnabled(): Promise<boolean> {
  return (await getItem(ENABLED_KEY)) === 'true';
}

/** True once a PIN has actually been stored (guards against a half-set state). */
export async function hasPinSet(): Promise<boolean> {
  const hash = await getItem(HASH_KEY);
  return !!hash;
}

/** Set (or rotate) the PIN: fresh salt + stretched hash, and enable the lock. */
export async function setPin(pin: string): Promise<void> {
  const salt = randomBytes(SALT_LEN);
  const iters = DEFAULT_PBKDF2_ITERS;
  const hash = await hashPin(pin, salt, iters);
  await setItem(SALT_KEY, toBase64(salt));
  await setItem(HASH_KEY, toBase64(hash));
  await setItem(LEN_KEY, String(pin.length));
  await setItem(ITERS_KEY, String(iters));
  await setItem(ENABLED_KEY, 'true');
}

/** The digit count of the set PIN, so the pad can auto-submit at the right length. */
export async function getPinLength(): Promise<number> {
  const raw = await getItem(LEN_KEY);
  const n = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n >= MIN_PIN_LENGTH && n <= MAX_PIN_LENGTH ? n : MIN_PIN_LENGTH;
}

/** Verify an entered PIN. Returns false on any error or when no PIN is set. */
export async function verifyPin(pin: string): Promise<boolean> {
  try {
    const saltB64 = await getItem(SALT_KEY);
    const hashB64 = await getItem(HASH_KEY);
    if (!saltB64 || !hashB64) return false;
    const rawIters = await getItem(ITERS_KEY);
    const parsed = rawIters ? parseInt(rawIters, 10) : NaN;
    const iters = Number.isFinite(parsed) ? parsed : LEGACY_PBKDF2_ITERS;
    const computed = await hashPin(pin, fromBase64(saltB64), iters);
    return timingSafeEqual(computed, fromBase64(hashB64));
  } catch {
    return false;
  }
}

/** Turn the lock off and forget the PIN entirely. */
export async function disableNotebookLock(): Promise<void> {
  await setItem(ENABLED_KEY, 'false');
  await setItem(HASH_KEY, '');
  await setItem(SALT_KEY, '');
  await setItem(LEN_KEY, '');
  await setItem(ITERS_KEY, '');
  await setItem(BIOMETRIC_KEY, '');
}

export async function isBiometricShortcutEnabled(): Promise<boolean> {
  return (await getItem(BIOMETRIC_KEY)) === 'true';
}

export async function setBiometricShortcut(on: boolean): Promise<void> {
  await setItem(BIOMETRIC_KEY, on ? 'true' : 'false');
}

/** Whether the Face/Touch ID shortcut is both allowed and usable on this device. */
export async function canUseBiometric(): Promise<boolean> {
  return (await isBiometricShortcutEnabled()) && (await canAuthenticate());
}

/** Run the OS biometric prompt as a shortcut past the PIN pad. */
export async function authenticateBiometric(): Promise<boolean> {
  return authenticate('Unlock your Notebook');
}
