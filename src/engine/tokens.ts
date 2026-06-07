import type { FlowInputs } from '@/types/flow';

/**
 * Deterministic, offline echo-back interpolation — the engine that makes the
 * app feel like it's *listening* without any AI. Authored copy weaves the user's
 * own earlier answers back in; this only ever repeats their verbatim words, it
 * never characterizes or interprets them (keeping the "never name what the
 * person discovers" principle intact).
 *
 * Syntax, all resolved against the flow's accumulated inputs:
 *   {quality}            → the stored value of inputs.quality (trimmed)
 *   {quality|that}       → "that" when quality is empty/missing
 *   [[ …{quality}… ]]    → the whole bracketed fragment vanishes if it contains
 *                          a token that has no value and no fallback, so a
 *                          sentence never renders with a dangling blank.
 *
 * Plain strings with no markers pass straight through untouched.
 */

// {key} or {key|fallback}. Keys are word chars; fallback is anything but '}'.
const TOKEN = /\{([a-zA-Z0-9_]+)(?:\|([^}]*))?\}/g;
// [[ optional fragment ]] (non-greedy, may span newlines).
const FRAGMENT = /\[\[([\s\S]*?)\]\]/g;

function valueFor(inputs: FlowInputs, key: string): string {
  const v = inputs[key];
  if (v === undefined || v === null) return '';
  return String(v).trim();
}

/** True when the fragment holds a token with neither a value nor a fallback. */
function fragmentHasUnresolved(fragment: string, inputs: FlowInputs): boolean {
  let unresolved = false;
  // Reset lastIndex defensively (global regex is module-shared).
  TOKEN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN.exec(fragment)) !== null) {
    const [, key, fallback] = m;
    if (!valueFor(inputs, key) && (fallback === undefined || fallback === '')) {
      unresolved = true;
      break;
    }
  }
  return unresolved;
}

function substitute(text: string, inputs: FlowInputs): string {
  return text.replace(TOKEN, (_full, key: string, fallback?: string) => {
    const val = valueFor(inputs, key);
    if (val) return val;
    return fallback ?? '';
  });
}

/**
 * Resolve all tokens/fragments in `text` against `inputs`. Returns the original
 * string unchanged when it contains no markers (the common case for the many
 * flows that don't use echo yet).
 */
export function resolveTokens(
  text: string | undefined,
  inputs: FlowInputs,
): string {
  if (!text) return '';
  if (text.indexOf('{') === -1 && text.indexOf('[[') === -1) return text;

  // 1) Drop optional fragments that can't fully resolve; keep the rest inline.
  let out = text.replace(FRAGMENT, (_full, inner: string) =>
    fragmentHasUnresolved(inner, inputs) ? '' : inner,
  );
  // 2) Substitute the remaining tokens.
  out = substitute(out, inputs);
  // 3) Tidy whitespace/punctuation left where a fragment was removed.
  return out
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+([.,!?;:])/g, '$1')
    .trim();
}
