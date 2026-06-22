/**
 * Shared types for the Library content module.
 *
 * Body markup — a tiny line-prefix grammar over blocks split by a blank line.
 * Each block is classified by its leading token (unknown tokens fall through to
 * a plain paragraph, so a typo degrades gracefully):
 *   plain text        → serif body paragraph
 *   "## "             → subheading
 *   "> "              → pull-quote (large serif, accent rule)
 *   "~ key | caption" → inline illustration (key ∈ IllustrationKey; caption optional)
 *   "[try] "          → a gentle "Try this" callout
 *   "[note] "         → a "Notice this" / safety callout
 * Inline, within any paragraph/quote/callout: a leading "**term** — …" renders
 * the term in the accent colour (a quiet key-term highlight).
 *
 * Quotes are deliberately conservative: every attributed line in the content was
 * checked against a source. Famous-but-apocryphal lines (e.g. "until you make the
 * unconscious conscious… you will call it fate") are intentionally avoided.
 */

import type { IllustrationKey } from '@/components/illustrations';
export type { IllustrationKey };

export interface Reading {
  id: string;
  title: string;
  /** One-line teaser for the list. */
  blurb: string;
  /** Running text in the body grammar above; paragraphs split by "\n\n". */
  body: string;
  /** Header illustration on the reading page. */
  cover?: IllustrationKey;
  /** Small motif shown beside the chapter in a book's table of contents. */
  icon?: IllustrationKey;
  /** A short epigraph shown under the header, with who said it. */
  epigraph?: { text: string; attribution?: string };
  /** Override the computed read-time label (e.g. "~2 min"). */
  readTime?: string;
}

/** A reading body parsed into typed blocks the reader renders dumbly. */
export type Block =
  | { kind: 'subhead'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'figure'; name: IllustrationKey; caption?: string }
  | { kind: 'callout'; variant: 'try' | 'note'; text: string };

// ─── Books ────────────────────────────────────────────────────────────────────
// The Library tab is a shelf of books; a book is a themed collection of chapters
// (reading ids). Each book lives in its own file under books/ alongside its
// chapters; the registry flattens them into BOOKS + READINGS. The shelf is
// curated to recent work (see rankBooks); evergreen books are always present.

export type BookSpine = 'sage' | 'warm' | 'muted' | 'clay';

export interface Book {
  id: string;
  title: string;
  /** A real-book subtitle for the cover, distinct from the list blurb. */
  subtitle?: string;
  blurb: string;
  /** Cover accent, resolved to a palette colour in the view. */
  spine: BookSpine;
  /** The cover illustration motif. */
  cover: IllustrationKey;
  /** Reading ids, in reading order. */
  chapters: string[];
  /** Always on the shelf, regardless of recent work. */
  evergreen?: boolean;
  /** Signals that surface this book: quality families + flow-id fragments. */
  match?: { qualities?: string[]; flowIds?: string[] };
}

export interface BookSignal {
  /** Normalized quality families the user has surfaced (already family-keyed). */
  qualityFamilies: string[];
  /** Flow ids the user has run. */
  flowIds: string[];
}

export interface ShelfBook {
  book: Book;
  /** A surfaced quality that surfaced this book, for a gentle reason line. */
  reason: string | null;
}

export interface Shelf {
  suggested: ShelfBook[];
  evergreen: Book[];
  rest: Book[];
}
