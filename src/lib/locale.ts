/**
 * Best-effort device region (ISO 3166-1 alpha-2), derived from `Intl` so we need
 * no native dependency. Used only to choose which bundled crisis lines to
 * surface — callers MUST fall back to the international set when this returns
 * null, so a user is never shown another country's numbers as if they were
 * local. Kept at module scope (no impure call in a render body).
 */
export function getDeviceRegion(): string | null {
  try {
    const locale = new Intl.DateTimeFormat().resolvedOptions().locale; // e.g. "en-GB"
    const region = locale.split('-').pop();
    if (region && /^[A-Z]{2}$/.test(region)) return region;
    return null;
  } catch {
    return null;
  }
}
