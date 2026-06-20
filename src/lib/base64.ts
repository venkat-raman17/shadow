// Small, dependency-free base64 helpers for byte arrays. Shared by the crypto
// store (key + ciphertext) and the notebook PIN store (salt + hash) so the two
// encodings never drift apart.

export function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

export function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
