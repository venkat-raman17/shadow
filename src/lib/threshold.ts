import type { Gender } from '@/hooks/useUserProfile';

/**
 * The threshold router. The home screen lets the user speak into an open
 * question ("What's here right now?") instead of picking a worksheet from a
 * menu. This maps what they say — or the doorway they tap — to the flow that
 * fits, entirely on-device and deterministically. No tracking, no AI.
 *
 * When free text matches nothing, the caller falls back to the adaptive
 * suggestion (the same logic the old "Start here" card used).
 */

type FlowId = string;

/** Resolve the contrasexual flows by gender; non-binary users get the golden
 *  shadow route, which carries the same "unlived quality" work without the
 *  gendered framing. */
function captivatedFlow(gender: Gender | null | undefined): FlowId {
  if (gender === 'man') return 'noticing.anima_projection.v1';
  if (gender === 'woman') return 'noticing.animus_projection.v1';
  return 'noticing.golden_shadow.v1';
}

function voiceFlow(gender: Gender | null | undefined): FlowId {
  // The inner critic is the animus's classic form for women; otherwise it sits
  // closest to the shame work.
  if (gender === 'woman') return 'noticing.animus_projection.v1';
  return 'noticing.facing_shame.v1';
}

export interface Doorway {
  key: string;
  /** The word(s) shown on the chip — plain, first-person, never clinical. */
  label: string;
  resolve: (gender: Gender | null | undefined) => FlowId;
}

/** The doorways offered beneath the open prompt, shaped a little by gender. */
export function doorwaysFor(gender: Gender | null | undefined): Doorway[] {
  const doorways: Doorway[] = [
    { key: 'body', label: 'something in my body', resolve: () => 'noticing.somatic.v1' },
    { key: 'skin', label: 'someone got under my skin', resolve: () => 'noticing.projection_recall.v1' },
    { key: 'admire', label: 'admiring someone', resolve: () => 'noticing.golden_shadow.v1' },
  ];

  if (gender === 'man') {
    doorways.push({ key: 'captivated', label: 'captivated by someone', resolve: captivatedFlow });
  } else if (gender === 'woman') {
    doorways.push({ key: 'voice', label: 'a voice in my head', resolve: voiceFlow });
  }

  doorways.push(
    { key: 'shame', label: 'ashamed, not enough', resolve: () => 'noticing.facing_shame.v1' },
    { key: 'scattered', label: 'scattered, can’t settle', resolve: () => 'grounding.settle.v1' },
  );

  return doorways;
}

// Keyword groups, scanned in priority order. Acute-overwhelm first (settle
// before going deep), then the container-first shame work, then the rest.
const RULES: { test: RegExp; resolve: (g: Gender | null | undefined) => FlowId }[] = [
  {
    // Acute overwhelm: settle before any depth (titration). Never route a
    // flooded user into the 3-2-1 reclamation work.
    test: /\b(overwhelm|panic|spinning|racing|can'?t focus|scattered|too much going|frantic|busy mind)/,
    resolve: () => 'grounding.settle.v1',
  },
  {
    test: /\b(ashamed|shame|not enough|worthless|embarrassed|humiliat|hate myself|never enough|small|exposed)/,
    resolve: () => 'noticing.facing_shame.v1',
  },
  {
    test: /\b(tight|tension|chest|gut|throat|shoulders|heavy|clench|knot|ache|aching|body|breathe|numb|exhaust|tired)/,
    resolve: () => 'noticing.somatic.v1',
  },
  {
    test: /\b(admire|admiring|envy|envious|jealous|inspired|look up to|wish i|idol|in awe)/,
    resolve: () => 'noticing.golden_shadow.v1',
  },
  {
    test: /\b(captivat|drawn to|obsess|infatuat|crush|can'?t stop thinking|smitten|enchant)/,
    resolve: captivatedFlow,
  },
  {
    test: /\b(voice in my head|inner critic|critical|criticiz|judging me|i should|harsh on myself)/,
    resolve: voiceFlow,
  },
  {
    test: /\b(angry|anger|irritat|annoyed|furious|frustrat|someone|rude|arrogan|can'?t stand|got under|hate (him|her|them|that))/,
    resolve: () => 'noticing.projection_recall.v1',
  },
];

/**
 * Map free text to a flow id, or null when nothing matches (caller falls back
 * to the adaptive suggestion). Purely lexical and offline.
 */
export function routeFromText(text: string, gender: Gender | null | undefined): FlowId | null {
  const t = text.trim().toLowerCase();
  if (!t) return null;
  for (const rule of RULES) {
    if (rule.test.test(t)) return rule.resolve(gender);
  }
  return null;
}
