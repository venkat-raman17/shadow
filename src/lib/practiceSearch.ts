import { PRACTICES, FLOWS, THEME_GROUPS, type Practice } from '@/lib/practices';
import { expandQuality } from '@/lib/db';
import type { PromptStep } from '@/types/flow';

/**
 * The Workshop's practice search. Today's screen substring-matches only a
 * practice's title/blurb, so typing a feeling ("angry"), a situation ("got under
 * my skin"), or a half-remembered method ("RAIN") finds nothing. This builds a
 * small weighted index over the static catalogue — combining the title, the
 * authored keywords, the blurb/subtitle, and the theme door + the flow's own
 * example chips — and ranks matches. Deterministic, offline, no dependencies.
 *
 * Matching is by WORD PREFIX, not raw substring: a query token must begin a word
 * in the haystack. That keeps partial typing useful ("bound" → "boundaries",
 * "settl" → "settle") while avoiding the substring false-positives that would
 * otherwise rank "Write it out" (keyword "brain dump") above the RAIN practice
 * for the query "rain", or match "art" inside "part".
 *
 * The index is built once at module load: PRACTICES + FLOWS are static
 * synchronous requires (PRACTICES already reads FLOWS[id] at import).
 */

// Field weights: a title hit outranks a keyword hit outranks blurb/subtitle
// outranks the theme/chip text.
const W = { title: 4, keyword: 3, body: 2, theme: 1 } as const;

/** Split text into lowercased word tokens (letters/digits). Apostrophes are
 *  dropped first so contractions stay whole ("can't" → "cant", "what's" →
 *  "whats"); everything else splits on non-alphanumerics, so "self-compassion" →
 *  ["self", "compassion"]. Shared by the index and the query. */
function words(text: string): string[] {
  return text.toLowerCase().replace(/['’]/g, '').split(/[^a-z0-9]+/).filter(Boolean);
}

// Filler words stripped from the QUERY (not the index) before the all-tokens
// match, so natural phrasing doesn't fail on words the practice doesn't repeat —
// "got under my skin" shouldn't miss a card titled "…under your skin", and
// "can't settle" should still find "settle". If a query is nothing but these,
// they're kept (so a one-word "it" still does something rather than nothing).
const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with',
  'as', 'from', 'into', 'about', 'my', 'your', 'our', 'their', 'his', 'her', 'its', 'i', 'me',
  'you', 'it', 'we', 'us', 'im', 'ive', 'id', 'ill', 'youre', 'is', 'are', 'am', 'was', 'were',
  'be', 'been', 'being', 'do', 'does', 'did', 'dont', 'doesnt', 'didnt', 'cant', 'wont', 'isnt',
  'arent', 'wasnt', 'that', 'this', 'these', 'those', 'what', 'who', 'whose', 'whom', 'which',
  'when', 'where', 'why', 'how', 'just', 'really', 'very',
]);

/** All assistChips authored on a flow's prompt steps. */
function assistChipsFor(flowId: string): string {
  const flow = FLOWS[flowId];
  if (!flow) return '';
  return flow.steps
    .filter((s): s is PromptStep => s.type === 'prompt' && Array.isArray((s as PromptStep).assistChips))
    .flatMap((s) => s.assistChips ?? [])
    .join(' ');
}

interface Indexed {
  practice: Practice;
  /** Catalogue position — the stable tie-break when scores are equal. */
  order: number;
  titleWords: string[];
  keywordWords: string[];
  bodyWords: string[];
  themeWords: string[];
}

// The flow's own title is deliberately NOT indexed — it's a near-duplicate of the
// canonical catalogue title ("What's the body holding?" vs "What's your body
// holding?") and would double-weight the same words.
const INDEX: Indexed[] = PRACTICES.map((p, order) => {
  const flow = FLOWS[p.id];
  const door = THEME_GROUPS.find((t) => t.group === p.group);
  return {
    practice: p,
    order,
    titleWords: words(p.title),
    keywordWords: words((p.keywords ?? []).join(' ')),
    bodyWords: words([p.blurb, flow?.subtitle ?? ''].join(' ')),
    themeWords: words([door?.label ?? '', door?.intro ?? '', assistChipsFor(p.id)].join(' ')),
  };
});

/** Does any word in this field begin with any of the token's variants? */
function fieldHit(fieldWords: string[], variants: string[]): boolean {
  return fieldWords.some((w) => variants.some((v) => w.startsWith(v)));
}

/**
 * Score one entry against the query tokens. Each token scores its single
 * highest-weight field, and the scores sum — but EVERY token must land somewhere
 * (AND), so "got under my skin" only matches a practice whose text covers all of
 * those words. A token is expanded through its morphological siblings so feeling
 * variants connect ("angry" finds "anger" and vice-versa).
 */
function scoreEntry(tokens: string[], e: Indexed): number {
  let total = 0;
  for (const raw of tokens) {
    const variants = expandQuality(raw);
    let best = 0;
    if (fieldHit(e.titleWords, variants)) best = W.title;
    else if (fieldHit(e.keywordWords, variants)) best = W.keyword;
    else if (fieldHit(e.bodyWords, variants)) best = W.body;
    else if (fieldHit(e.themeWords, variants)) best = W.theme;
    if (best === 0) return 0; // token AND — this entry doesn't cover the whole query
    total += best;
  }
  return total;
}

/**
 * The catalogue practices matching a query, best first. Pure over static data —
 * identical output every call. Gender / time / depth-lock filtering stays with
 * the caller (the Workshop screen) so this owns matching only.
 */
export function searchPractices(query: string): Practice[] {
  const all = words(query);
  const trimmed = all.filter((t) => !STOP.has(t));
  const tokens = trimmed.length > 0 ? trimmed : all;
  if (tokens.length === 0) return [];
  return INDEX
    .map((e) => ({ e, score: scoreEntry(tokens, e) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.e.order - b.e.order)
    .map((r) => r.e.practice);
}
