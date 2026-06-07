/**
 * Translate a stored 0–10 charge into a *word* band — never a number on screen.
 * Used on return ("last time this felt like {priorFelt}") so the app can mirror
 * what's shifted qualitatively, honouring the anti-gamification north star: no
 * deltas, no trend lines, no scores. Charge rising is not failure.
 *
 * Kept at module scope (pure) so callers don't read state during render.
 */
export function feltSenseBand(charge: number | null | undefined): string {
  if (charge == null) return 'something';
  if (charge <= 3) return 'fairly settled';
  if (charge <= 6) return 'a real charge';
  return 'almost too much to hold';
}
