import { getItem, setItem } from '@/lib/kv';

/**
 * Local, on-device usage awareness — nothing more. We remember only *when* the
 * app was last opened, solely to soften re-entry after a long gap (titration).
 * There are NO streaks, NO counts, and nothing is ever surfaced as a score or
 * leaves the device. This is the whole of it.
 */

const LAST_OPEN_KEY = 'shadow.usage.last_open';
const DAY_MS = 24 * 60 * 60 * 1000;

// Resolved once per launch: the stored timestamp BEFORE this session advanced
// it — i.e. the previous visit. Cached so every caller in a launch sees the same
// value regardless of who reads first (the root layout's recordOpen, or the
// Home screen's titration), and so the marker advances exactly once.
let snapshot: Promise<number | null> | null = null;

function readStored(): Promise<number | null> {
  return getItem(LAST_OPEN_KEY).then((raw) => {
    if (!raw) return null;
    const n = parseInt(raw, 10);
    return Number.isNaN(n) ? null : n;
  });
}

function ensureSnapshot(): Promise<number | null> {
  if (!snapshot) {
    snapshot = readStored();
    // Advance the marker to now for the next launch's gap; the cached snapshot
    // above already holds the previous value, so this doesn't disturb it.
    snapshot.then(() => setItem(LAST_OPEN_KEY, String(Date.now())));
  }
  return snapshot;
}

/** Note that the app came to the foreground. Idempotent within a launch. */
export function recordOpen(): Promise<number | null> {
  return ensureSnapshot();
}

/** Keep the stored marker fresh during a long-running session (no snapshot change). */
export function touch(): void {
  setItem(LAST_OPEN_KEY, String(Date.now()));
}

/** Timestamp (ms) of the previous visit, or null on the first-ever launch. */
export function getPreviousOpenAt(): Promise<number | null> {
  return ensureSnapshot();
}

/** Whole days since the previous visit, or null if unknown / first launch. */
export async function daysSincePreviousOpen(): Promise<number | null> {
  const prev = await getPreviousOpenAt();
  if (prev === null) return null;
  return Math.floor((Date.now() - prev) / DAY_MS);
}
