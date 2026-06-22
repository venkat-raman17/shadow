import type { Book, BookSignal, Shelf } from './types';
import { BOOKS } from './registry';

/**
 * Curate the shelf from recent work — deterministic, offline, pure (no clock).
 * Non-evergreen books with any signal overlap surface under "for where you are
 * now"; evergreen books are always present; the remainder sits on the shelf.
 */
export function rankBooks(signal: BookSignal, max = 3): Shelf {
  const families = new Set(signal.qualityFamilies);
  const scoreOf = (b: Book): { score: number; reason: string | null } => {
    let score = 0;
    let reason: string | null = null;
    for (const q of b.match?.qualities ?? []) {
      if (families.has(q)) {
        score += 1;
        if (!reason) reason = q;
      }
    }
    for (const key of b.match?.flowIds ?? []) {
      if (signal.flowIds.some((f) => f.includes(key))) score += 1;
    }
    return { score, reason };
  };

  const evergreen = BOOKS.filter((b) => b.evergreen);
  const suggested = BOOKS.filter((b) => !b.evergreen)
    .map((b) => ({ b, ...scoreOf(b) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((s) => ({ book: s.b, reason: s.reason }));
  const suggestedIds = new Set(suggested.map((s) => s.book.id));
  const rest = BOOKS.filter((b) => !b.evergreen && !suggestedIds.has(b.id));
  return { suggested, evergreen, rest };
}
