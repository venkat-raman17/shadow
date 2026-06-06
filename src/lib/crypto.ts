import { gcm } from '@noble/ciphers/aes.js';
import { getItem, setItem } from '@/lib/kv';

const KEY_STORE_KEY = 'shadow.enc.key';

function randomBytes(n: number): Uint8Array {
  const buf = new Uint8Array(n);
  crypto.getRandomValues(buf);
  return buf;
}

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function loadOrCreateKey(): Promise<Uint8Array> {
  const stored = await getItem(KEY_STORE_KEY);
  if (stored) return fromBase64(stored);

  const key = randomBytes(32);
  await setItem(KEY_STORE_KEY, toBase64(key));
  return key;
}

// Returns base64(12-byte nonce || ciphertext+tag)
export function encrypt(plaintext: string, key: Uint8Array): string {
  const nonce = randomBytes(12);
  const data = new TextEncoder().encode(plaintext);
  const cipher = gcm(key, nonce);
  const ciphertext = cipher.encrypt(data);
  const combined = new Uint8Array(nonce.length + ciphertext.length);
  combined.set(nonce, 0);
  combined.set(ciphertext, nonce.length);
  return toBase64(combined);
}

export function decrypt(encoded: string, key: Uint8Array): string {
  const combined = fromBase64(encoded);
  const nonce = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  const cipher = gcm(key, nonce);
  const plaintext = cipher.decrypt(ciphertext);
  return new TextDecoder().decode(plaintext);
}
