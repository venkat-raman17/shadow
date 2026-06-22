import { FLOWS } from '@/lib/practices';
import type { TimelineItem } from '@/lib/db';

/**
 * Pure helpers for the Notebook's practice history. Kept out of db.ts because
 * they depend on the flow registry (FLOWS), which the data layer intentionally
 * doesn't import. No state, no Date.now() — callers pass timestamps in.
 */

/** Below this many items we show one un-chunked leaf rather than per-month pages. */
export const SMALL_RECORD = 8;

/** A human label for the practice behind a timeline item. */
export function practiceLabel(item: TimelineItem): string {
  switch (item.kind) {
    case 'entry':
      return (item.flowId && FLOWS[item.flowId]?.title) || 'A noticing';
    case 'session':
      return (item.flowId && FLOWS[item.flowId]?.title) || 'A meeting';
    case 'grounding':
      return (item.flowId && FLOWS[item.flowId]?.title) || 'A grounding';
    case 'experiment':
      return 'Something you set out to try';
  }
}

const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
const gutterDayFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

/** Stable key for grouping by calendar month, e.g. "2026-5". */
export function monthKey(at: number): string {
  const d = new Date(at);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

/** "June 2026" — a month leaf's header. */
export function monthLabel(at: number): string {
  return monthFmt.format(new Date(at));
}

/** Stable key for grouping by calendar day. */
export function dayKey(at: number): string {
  const d = new Date(at);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** "Thursday, Jun 19" — a day divider within a month. */
export function dayLabel(at: number): string {
  return dayFmt.format(new Date(at));
}

/** The two-line gutter date: short day over time, e.g. { date: "Jun 19", time: "3:45 PM" }. */
export function gutterDate(at: number): { date: string; time: string } {
  const d = new Date(at);
  return { date: gutterDayFmt.format(d), time: timeFmt.format(d) };
}

export interface TimelineGroup {
  key: string;
  label: string;
  items: TimelineItem[];
}

/** Group a reverse-chron list into contiguous runs keyed by `keyOf` (order preserved). */
function groupBy(
  items: TimelineItem[],
  keyOf: (at: number) => string,
  labelOf: (at: number) => string,
): TimelineGroup[] {
  const groups: TimelineGroup[] = [];
  let current: TimelineGroup | null = null;
  for (const it of items) {
    const k = keyOf(it.at);
    if (!current || current.key !== k) {
      current = { key: k, label: labelOf(it.at), items: [] };
      groups.push(current);
    }
    current.items.push(it);
  }
  return groups;
}

/** One group per calendar month — the leaves of the flip-book. */
export function groupByMonth(items: TimelineItem[]): TimelineGroup[] {
  return groupBy(items, monthKey, monthLabel);
}

/** One group per calendar day — the dividers within a month leaf. */
export function groupByDay(items: TimelineItem[]): TimelineGroup[] {
  return groupBy(items, dayKey, dayLabel);
}
