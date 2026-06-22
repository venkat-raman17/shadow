import type { Block, IllustrationKey, Reading } from './types';

/** Split a body into blocks by the leading-token grammar documented in types.ts. */
export function parseBody(body: string): Block[] {
  return body
    .split('\n\n')
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((b): Block => {
      if (b.startsWith('## ')) return { kind: 'subhead', text: b.slice(3).trim() };
      if (b.startsWith('> ')) return { kind: 'quote', text: b.slice(2).trim() };
      if (b.startsWith('[try] ')) return { kind: 'callout', variant: 'try', text: b.slice(6).trim() };
      if (b.startsWith('[note] ')) return { kind: 'callout', variant: 'note', text: b.slice(7).trim() };
      if (b.startsWith('~ ')) {
        const [name, ...rest] = b.slice(2).split('|');
        return { kind: 'figure', name: name.trim() as IllustrationKey, caption: rest.join('|').trim() || undefined };
      }
      return { kind: 'para', text: b };
    });
}

/** A quiet read-time estimate (~200 wpm), used as descriptive info — never a score. */
export function readTimeOf(r: Reading): string {
  if (r.readTime) return r.readTime;
  const words = r.body.split(/\s+/).filter(Boolean).length;
  return `~${Math.max(1, Math.round(words / 200))} min`;
}
