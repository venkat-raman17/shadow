import type { Flow, FlowInputs } from '@/types/flow';
import type { IllustrationKey } from '@/components/illustrations';
import { resolveTokens } from '@/engine/tokens';

/** Safe default motif if a practice ever lacks a mapped icon. */
export const FALLBACK_ICON: IllustrationKey = 'generic-practice';

// ─── Bundled flows ──────────────────────────────────────────────────────────
// Single source of truth for both the flow runner (src/app/flow/[id].tsx) and
// the Home catalogue below. Add new flow files here as they're authored.
export const FLOWS: Record<string, Flow> = {
  'noticing.projection_recall.v1': require('@/assets/flows/noticing.projection_recall.v1.json'),
  'noticing.somatic.v1': require('@/assets/flows/noticing.somatic.v1.json'),
  'noticing.in_the_moment.v1': require('@/assets/flows/noticing.in_the_moment.v1.json'),
  'noticing.draw_whats_here.v1': require('@/assets/flows/noticing.draw_whats_here.v1.json'),
  'noticing.facing_shame.v1': require('@/assets/flows/noticing.facing_shame.v1.json'),
  'noticing.golden_shadow.v1': require('@/assets/flows/noticing.golden_shadow.v1.json'),
  'noticing.anima_projection.v1': require('@/assets/flows/noticing.anima_projection.v1.json'),
  'noticing.animus_projection.v1': require('@/assets/flows/noticing.animus_projection.v1.json'),
  'noticing.persona.v1': require('@/assets/flows/noticing.persona.v1.json'),
  'noticing.321.v1': require('@/assets/flows/noticing.321.v1.json'),
  'noticing.tensions.v1': require('@/assets/flows/noticing.tensions.v1.json'),
  'noticing.unlived_expression.v1': require('@/assets/flows/noticing.unlived_expression.v1.json'),
  'noticing.self_compassion.v1': require('@/assets/flows/noticing.self_compassion.v1.json'),
  'noticing.expressive_writing.v1': require('@/assets/flows/noticing.expressive_writing.v1.json'),
  'noticing.reclaim_ritual.v1': require('@/assets/flows/noticing.reclaim_ritual.v1.json'),
  'noticing.rain.v1': require('@/assets/flows/noticing.rain.v1.json'),
  'noticing.defusion.v1': require('@/assets/flows/noticing.defusion.v1.json'),
  'noticing.nightmare.v1': require('@/assets/flows/noticing.nightmare.v1.json'),
  'noticing.grief_letting_go.v1': require('@/assets/flows/noticing.grief_letting_go.v1.json'),
  'noticing.values_vocation.v1': require('@/assets/flows/noticing.values_vocation.v1.json'),
  'noticing.boundaries.v1': require('@/assets/flows/noticing.boundaries.v1.json'),
  // Home-only quick captures: registered for the runner + Notebook labels, but
  // intentionally kept out of the CATALOGUE (Library/Workshop). Free writing
  // saves straight from Home; free drawing runs canvas-first as a short flow.
  'noticing.free_writing.v1': require('@/assets/flows/noticing.free_writing.v1.json'),
  'noticing.free_drawing.v1': require('@/assets/flows/noticing.free_drawing.v1.json'),
  'grounding.settle.v1': require('@/assets/flows/grounding.settle.v1.json'),
  'grounding.body_scan.v1': require('@/assets/flows/grounding.body_scan.v1.json'),
  'grounding.urge_surf.v1': require('@/assets/flows/grounding.urge_surf.v1.json'),
  'grounding.tipp.v1': require('@/assets/flows/grounding.tipp.v1.json'),
  'meeting.active_imagination.v1': require('@/assets/flows/meeting.active_imagination.v1.json'),
  'meeting.inner_child.v1': require('@/assets/flows/meeting.inner_child.v1.json'),
  'meeting.archetypal_encounter.v1': require('@/assets/flows/meeting.archetypal_encounter.v1.json'),
  'meeting.dream_figure.v1': require('@/assets/flows/meeting.dream_figure.v1.json'),
  'integration.after_meeting.v1': require('@/assets/flows/integration.after_meeting.v1.json'),
  // Entryway routers (the spine): a few questions that dispatch into the flows
  // above. Registered for the runner, but kept out of the CATALOGUE/Library.
  'entry.notice.v1': require('@/assets/flows/entry.notice.v1.json'),
  'entry.sit.v1': require('@/assets/flows/entry.sit.v1.json'),
  'entry.steady.v1': require('@/assets/flows/entry.steady.v1.json'),
  'entry.carry.v1': require('@/assets/flows/entry.carry.v1.json'),
};

// ─── The three depths ───────────────────────────────────────────────────────
// The organizing spine of the app. Depth is surfaced progressively: a newcomer
// only sees 'notice'; 'sit' and 'carry' open once there's prior work.
export type Depth = 'notice' | 'sit' | 'carry' | 'ground';

// A themed "door" — the second level of organization, now spanning every depth.
// Each practice belongs to one theme door, grouping practices by what you're
// working *from* or *toward* (a reaction, the body, a figure, carrying it
// forward…). The Workshop's question-first front door is built from these.
export type ThemeGroup =
  | 'reaction' | 'attraction' | 'body' | 'self' | 'feeling' // notice
  | 'figures' | 'unlived' // sit
  | 'carry' // carry
  | 'steady'; // ground

export interface Practice {
  id: string;
  title: string;
  /** Plain-language "what this is" — the method stays under the hood. */
  blurb: string;
  depth: Depth;
  estimatedMinutes: number;
  icon: IllustrationKey;
  /** Themed door this practice lives in (see THEME_GROUPS). Every catalogue
   *  practice carries one; it drives the question-first Workshop. */
  group?: ThemeGroup;
  /** If set, only surface this practice for users whose gender matches. Non-binary users see all. */
  requiresGender?: 'man' | 'woman';
  /** Hidden search terms NOT already in title/blurb — the feelings/qualities the
   *  practice addresses (family form), method names (RAIN, active imagination…),
   *  and situational phrases ("got under my skin"). Names the topic/method, never
   *  an outcome. Authored in PRACTICE_KEYWORDS, merged in below. */
  keywords?: string[];
}

// Curated catalogue. Titles stay evocative; the blurb says plainly what you'll
// do. Estimated time is read from the flow JSON so the two never drift.
const CATALOGUE: Omit<Practice, 'estimatedMinutes'>[] = [
  {
    id: 'noticing.somatic.v1',
    title: "What's your body holding?",
    blurb: 'Start from a sensation — no situation or person needed.',
    depth: 'notice',
    group: 'body',
    icon: 'body-held',
  },
  {
    id: 'noticing.in_the_moment.v1',
    title: 'Something just happened',
    blurb: "Catch a reaction while it's still warm — thirty seconds, no setup.",
    depth: 'notice',
    group: 'reaction',
    icon: 'ui-bolt-heart',
  },
  {
    id: 'noticing.draw_whats_here.v1',
    title: "Draw what's here",
    blurb: 'When there are no words yet — let your hand find the shape.',
    depth: 'notice',
    group: 'body',
    icon: 'hand-finding-shape',
  },
  {
    id: 'noticing.projection_recall.v1',
    title: 'Who got under your skin?',
    blurb: 'Notice a reaction to someone, and the quality underneath it.',
    depth: 'notice',
    group: 'reaction',
    icon: 'reflected-other',
  },
  {
    id: 'noticing.golden_shadow.v1',
    title: 'Who do you admire?',
    blurb: 'Follow an admiration back to something unlived in you.',
    depth: 'notice',
    group: 'attraction',
    icon: 'admire-star',
  },
  {
    id: 'noticing.anima_projection.v1',
    title: 'Who captivates you?',
    blurb: 'Notice when intense attraction is pointing at something unlived in you.',
    depth: 'notice',
    group: 'attraction',
    icon: 'captivation',
    requiresGender: 'man',
  },
  {
    id: 'noticing.animus_projection.v1',
    title: 'Whose voice is in your head?',
    blurb: 'Notice the inner critic or the pull toward someone who carries your unlived strength.',
    depth: 'notice',
    group: 'attraction',
    icon: 'borrowed-voice',
    requiresGender: 'woman',
  },
  {
    id: 'noticing.persona.v1',
    title: "Who are you when no one's watching?",
    blurb: 'The gap between the self you show and the self you keep.',
    depth: 'notice',
    group: 'self',
    icon: 'mask-gap',
  },
  {
    id: 'noticing.321.v1',
    title: 'Turn a reaction around',
    blurb: 'Take a strong reaction through three angles — them, you, and I — and find what’s yours.',
    depth: 'notice',
    group: 'reaction',
    icon: 'charge-uturn',
  },
  {
    id: 'noticing.facing_shame.v1',
    title: 'What shame says about you',
    blurb: 'Not fixing it — just naming it, and meeting it differently.',
    depth: 'notice',
    group: 'feeling',
    icon: 'unclench-shame',
  },
  {
    id: 'noticing.self_compassion.v1',
    title: 'Turn toward yourself',
    blurb: 'A small practice in meeting your own pain with kindness.',
    depth: 'notice',
    group: 'feeling',
    icon: 'turn-toward',
  },
  {
    id: 'noticing.expressive_writing.v1',
    title: 'Write it out',
    blurb: "Free writing to untangle what's knotted — no one reads it but you.",
    depth: 'notice',
    group: 'self',
    icon: 'writing-page',
  },
  {
    id: 'noticing.tensions.v1',
    title: 'When two truths collide',
    blurb: 'Hold two opposing pulls without choosing — and let a third thing surface.',
    depth: 'notice',
    group: 'self',
    icon: 'two-pans',
  },
  {
    id: 'noticing.rain.v1',
    title: 'Meet a hard feeling',
    blurb: 'RAIN — recognize, allow, investigate, and nurture what hurts.',
    depth: 'notice',
    group: 'feeling',
    icon: 'four-drops',
  },
  {
    id: 'noticing.defusion.v1',
    title: 'Unhook from a thought',
    blurb: 'Step back and watch a sticky thought pass, instead of being inside it.',
    depth: 'notice',
    group: 'feeling',
    icon: 'unhook-thought',
  },
  {
    id: 'noticing.grief_letting_go.v1',
    title: "What you're ready to set down",
    blurb: 'Set down a little of what you carry — without letting go of what you love.',
    depth: 'notice',
    group: 'feeling',
    icon: 'open-hand-leaf',
  },
  {
    id: 'noticing.values_vocation.v1',
    title: 'What matters, underneath',
    blurb: 'Listen, under the daily, for the direction you actually want to face.',
    depth: 'notice',
    group: 'self',
    icon: 'inner-heading',
  },
  {
    id: 'meeting.active_imagination.v1',
    title: 'Sit with what keeps coming up',
    blurb: 'Meet a part of yourself in a written back-and-forth.',
    depth: 'sit',
    group: 'figures',
    icon: 'facing-chairs',
  },
  {
    id: 'meeting.inner_child.v1',
    title: 'Meet your younger self',
    blurb: 'A gentle written meeting with the child you once were.',
    depth: 'sit',
    group: 'figures',
    icon: 'crouch-to-child',
  },
  {
    id: 'meeting.dream_figure.v1',
    title: 'A figure from a dream',
    blurb: 'Meet someone or something from a dream — not to decode it, to hear it.',
    depth: 'sit',
    group: 'figures',
    icon: 'night-visitor',
  },
  {
    id: 'meeting.archetypal_encounter.v1',
    title: 'Sit with what you already know',
    blurb: 'A quieter dialogue with the steadier, deeper part of you.',
    depth: 'sit',
    group: 'figures',
    icon: 'deep-knowing',
  },
  {
    id: 'noticing.unlived_expression.v1',
    title: 'What did you set aside?',
    blurb: 'Follow an unlived part of you back to what still wants expression.',
    depth: 'sit',
    group: 'unlived',
    icon: 'unfurling-sprout',
  },
  {
    id: 'noticing.nightmare.v1',
    title: 'Rewrite a recurring dream',
    blurb: 'Gently give a returning nightmare a new shape, while you’re awake.',
    depth: 'sit',
    group: 'unlived',
    icon: 'reshaped-dream',
  },
  {
    id: 'integration.after_meeting.v1',
    title: 'Carry something into your week',
    blurb: 'Turn what you found into one small, real thing to try.',
    depth: 'carry',
    group: 'carry',
    icon: 'carry-step',
  },
  {
    id: 'noticing.reclaim_ritual.v1',
    title: "Set down what's not yours",
    blurb: 'A quiet closing: release the burden a part carried, keep the part.',
    depth: 'carry',
    group: 'carry',
    icon: 'release-birds',
  },
  {
    id: 'noticing.boundaries.v1',
    title: "The line you haven't drawn",
    blurb: 'Follow the resentment back to one small boundary you could keep.',
    depth: 'carry',
    group: 'carry',
    icon: 'drawn-line',
  },
  {
    id: 'grounding.settle.v1',
    title: 'Slow down and settle',
    blurb: 'Breath and anchors to come back when things speed up.',
    depth: 'ground',
    group: 'steady',
    icon: 'slow-exhale',
  },
  {
    id: 'grounding.body_scan.v1',
    title: 'A short body scan',
    blurb: 'Come back into your body, one place at a time.',
    depth: 'ground',
    group: 'steady',
    icon: 'scan-sweep',
  },
  {
    id: 'grounding.urge_surf.v1',
    title: 'Ride the urge',
    blurb: 'An urge rises, crests, and falls — ride it instead of fighting it.',
    depth: 'ground',
    group: 'steady',
    icon: 'cresting-wave',
  },
  {
    id: 'grounding.tipp.v1',
    title: 'Turn the dial down fast',
    blurb: 'When distress is very high, the quickest way back is through the body.',
    depth: 'ground',
    group: 'steady',
    icon: 'frost-star',
  },
];

// Hidden search keywords per practice — only terms NOT already in title/blurb,
// so the Workshop search finds a practice by how it feels (family-form qualities),
// the method it uses, or the moment it's for. Topic/method only, never an outcome.
// Merged into PRACTICES below; consumed by src/lib/practiceSearch.ts.
const PRACTICE_KEYWORDS: Record<string, string[]> = {
  'noticing.somatic.v1': ['tension', 'tightness', 'heaviness', 'numbness', 'dread', 'restlessness', 'felt sense', 'no trigger', 'wordless', 'gut', 'chest', 'throat'],
  'noticing.in_the_moment.v1': ['triggered', 'in the moment', 'quick', 'heat of the moment', 'reacted', 'flared up', 'annoyed', 'irritation', 'anger', 'snapped'],
  'noticing.draw_whats_here.v1': ['drawing', 'sketch', 'image', 'no words', 'wordless', 'visual', 'picture', 'art', 'shapeless', 'colour'],
  'noticing.projection_recall.v1': ['projection', 'they bother me', 'annoyed me', 'anger', 'resentment', 'irritation', 'arrogance', 'neediness', 'judging someone', 'triggered by someone', 'what is mine'],
  'noticing.golden_shadow.v1': ['envy', 'longing', 'look up to', 'wish I could', 'golden shadow', 'jealous of', 'role model', 'aspire', 'what they have', 'drawn to'],
  'noticing.anima_projection.v1': ['infatuation', 'longing', 'crush', 'obsessed with someone', 'anima', 'feminine', "can't stop thinking about", 'idealize', 'projection', 'smitten'],
  'noticing.animus_projection.v1': ['animus', 'masculine', 'self-criticism', 'harsh voice', 'judging voice', 'should', 'projection', 'longing', 'pull toward someone'],
  'noticing.persona.v1': ['persona', 'mask', 'hidden self', 'authenticity', 'people-pleasing', 'performing', 'front', 'pretending', 'image', 'exhausting', 'two faces'],
  'noticing.321.v1': ['3-2-1', '321', 'three two one', 'shadow process', 'wilber', 'face it talk to it be it', 'projection', 'reclaim', 'perspective'],
  'noticing.facing_shame.v1': ['guilt', 'unworthy', 'not enough', 'inner critic', 'self-loathing', 'embarrassed', 'exposed', 'too much', 'humiliation', 'self-worth'],
  'noticing.self_compassion.v1': ['self-compassion', 'self-kindness', 'self-care', 'be kind to yourself', 'self-soothe', 'gentleness', 'harsh on myself', 'comfort', 'reassure'],
  'noticing.expressive_writing.v1': ['expressive writing', 'journaling', 'vent', 'process', 'pennebaker', 'get it out', 'clear my head', 'write it down', 'brain dump'],
  'noticing.tensions.v1': ['ambivalence', 'torn', 'two minds', 'dilemma', 'opposites', 'paradox', 'both true', 'indecision', 'stuck between', 'conflicted', 'transcendent function'],
  'noticing.rain.v1': ['sit with a feeling', 'overwhelm', 'difficult emotion', 'mindfulness', 'tara brach', 'fear', 'anger', 'sadness', 'grief', 'anxiety', 'allow it'],
  'noticing.defusion.v1': ['defusion', 'cognitive defusion', 'rumination', 'overthinking', 'intrusive thought', 'act', 'acceptance commitment', 'spiraling', 'looping thought', 'obsessive thought'],
  'noticing.grief_letting_go.v1': ['grief', 'loss', 'mourning', 'bereavement', 'sadness', 'heaviness', 'release', 'continuing bonds', 'someone I lost', 'burden'],
  'noticing.values_vocation.v1': ['values', 'meaning', 'purpose', 'vocation', 'calling', 'what matters', 'midlife', 'life direction', 'priorities', 'restless for change'],
  'meeting.active_imagination.v1': ['active imagination', 'parts', 'ifs', 'internal family systems', 'inner figure', 'dialogue', 'protector', 'jung', 'imaginal', 'talk to a part', 'recurring'],
  'meeting.inner_child.v1': ['inner child', 'childhood', 'reparenting', 'little me', 'child within', 'wounded child', 'vulnerable part', 'growing up', 'as a kid'],
  'meeting.dream_figure.v1': ['dream figure', 'dream character', 'dreamwork', 'dream image', 'symbol', 'recurring dream', 'dream meaning', 'night'],
  'meeting.archetypal_encounter.v1': ['archetype', 'the self', 'wise self', 'inner wisdom', 'inner guide', 'guidance', 'quiet knowing', 'centre', 'deeper part'],
  'noticing.unlived_expression.v1': ['unlived life', 'suppressed', 'repressed', 'what I gave up', 'lost part', 'potential', 'unexpressed', 'dormant', 'gave up on', 'put away'],
  'noticing.nightmare.v1': ['bad dream', 'dream rehearsal', 'rescripting', 'imagery rehearsal', 'night terror', 'frightening dream', 'dread', 'trapped', 'helpless'],
  'integration.after_meeting.v1': ['integration', 'intention', 'if-then', 'implementation intention', 'one small step', 'behaviour change', 'what next', 'experiment', 'put into practice'],
  'noticing.reclaim_ritual.v1': ['reclaim', 'not mine', 'give it back', 'unburden', 'closing ritual', 'carried for someone', 'ancestral', 'let it go'],
  'noticing.boundaries.v1': ['boundary', 'boundaries', 'say no', 'overcommitted', 'people-pleasing', 'assertive', 'limits', 'protect my time', 'resent', 'taken advantage'],
  'grounding.settle.v1': ['grounding', 'calm down', 'panic', 'anxiety', 'overwhelmed', 'breathing', 'box breathing', '5-4-3-2-1', 'regulate', 'too much', 'nervous system'],
  'grounding.body_scan.v1': ['grounding', 'relaxation', 'progressive relaxation', 'tension release', 'mindfulness of body', 'present moment', 'settle', 'calm'],
  'grounding.urge_surf.v1': ['urge surfing', 'craving', 'impulse', 'temptation', 'addiction', 'resist', 'wave', 'ride it out', 'relapse', 'self-control', 'dbt'],
  'grounding.tipp.v1': ['tipp', 'crisis', 'panic', 'overwhelm', 'cold water', 'intense emotion', 'dbt', 'calm down fast', 'emergency', 'spike', 'too much'],
};

export const PRACTICES: Practice[] = CATALOGUE.map((p) => ({
  ...p,
  estimatedMinutes: FLOWS[p.id]?.estimatedMinutes ?? 0,
  keywords: PRACTICE_KEYWORDS[p.id],
}));

export function practicesByDepth(depth: Depth): Practice[] {
  return PRACTICES.filter((p) => p.depth === depth);
}

/** The practices behind a single theme door — drives the Workshop's theme view. */
export function practicesByGroup(group: ThemeGroup): Practice[] {
  return PRACTICES.filter((p) => p.group === group);
}

export interface DepthGroup {
  depth: Depth;
  /** Section label in the Practices browser. */
  label: string;
  /** Shown in place of the practices while this depth is still locked. */
  lockedHint?: string;
}

// The presentation of the depth spine, shared by the Practices browser and the
// Home screen so the Notice → Sit → Carry → Ground language reads identically
// everywhere. 'sit' and 'carry' carry a lock hint; 'notice' and the grounding
// toolkit are always open. Order here is the order shown.
export const DEPTHS: DepthGroup[] = [
  { depth: 'notice', label: 'Notice' },
  { depth: 'sit', label: 'Go deeper', lockedHint: "These open once you've noticed a few things." },
  {
    depth: 'carry',
    label: 'Carry forward',
    lockedHint: "This opens once you've met a part to carry forward.",
  },
  { depth: 'ground', label: 'Steady yourself' },
];

export function getPractice(id: string): Practice | undefined {
  return PRACTICES.find((p) => p.id === id);
}

/**
 * The motif for a stored flow id — used to surface a practice's icon wherever its
 * record appears (flow exit, notebook rows, history, part sessions). Entryway /
 * grounding / null flows that aren't in the CATALOGUE fall back to a quiet generic
 * mark, so the lookup is always safe.
 */
export function iconForFlow(flowId: string | null | undefined): IllustrationKey {
  return (flowId ? getPractice(flowId)?.icon : undefined) ?? FALLBACK_ICON;
}

/**
 * A themed "door" into the catalogue. The Workshop opens by asking where the
 * user is starting from and offers these as the ways in; picking one reveals
 * only that door's practices. `match.qualities` lets a door float to the top
 * when it speaks to what's been surfacing in the user's recent work — the
 * qualities MUST be in family form (the `qualityFamily` / `QUALITY_SYNONYMS`
 * targets in db.ts), since surfacing patterns are family-normalized.
 */
export interface ThemeDoor {
  group: ThemeGroup;
  depth: Depth;
  /** Door title — a plain place to begin, never a method name. */
  label: string;
  /** One line naming the moment this door is for. */
  intro: string;
  icon: IllustrationKey;
  match?: { qualities?: string[] };
}

// The theme doors, in display order. Each practice in the catalogue belongs to
// exactly one. Deeper doors (sit / carry) follow the same prior-work gate as
// their depth; the steady door is always open.
export const THEME_GROUPS: ThemeDoor[] = [
  { group: 'reaction', depth: 'notice', label: 'From a reaction', intro: 'When something someone did is still working on you.', icon: 'charge-uturn', match: { qualities: ['anger', 'resentment', 'jealousy', 'envy'] } },
  { group: 'attraction', depth: 'notice', label: 'Admiration & attraction', intro: 'When a pull toward someone is pointing at something in you.', icon: 'admire-star', match: { qualities: ['longing', 'envy'] } },
  { group: 'body', depth: 'notice', label: 'Starting from the body', intro: 'When there’s a sensation but no words for it yet.', icon: 'body-held', match: { qualities: ['tightness', 'heaviness', 'numbness', 'restlessness'] } },
  { group: 'self', depth: 'notice', label: 'A closer look at yourself', intro: 'When you want to turn the lamp on quietly, on your own.', icon: 'mask-gap' },
  { group: 'feeling', depth: 'notice', label: 'Sitting with a hard feeling', intro: 'When something painful is here and asking to be met.', icon: 'four-drops', match: { qualities: ['shame', 'guilt', 'grief', 'sadness', 'fear', 'anxiety', 'loneliness'] } },
  { group: 'figures', depth: 'sit', label: 'Meeting a figure', intro: 'When something keeps coming up and wants to be heard.', icon: 'facing-chairs', match: { qualities: ['numbness', 'heaviness', 'restlessness', 'longing'] } },
  { group: 'unlived', depth: 'sit', label: 'What you set aside', intro: 'When a part of you was put away and still wants out.', icon: 'unfurling-sprout' },
  { group: 'carry', depth: 'carry', label: 'Carry it forward', intro: 'When you want to turn what you found into something real.', icon: 'carry-step' },
  { group: 'steady', depth: 'ground', label: 'Steady yourself', intro: 'When you need to come back and settle — anytime.', icon: 'slow-exhale' },
];

// The split for the Workshop's time filter: practices that take this long or
// less are "a few minutes" (≤5: ~14 practices); longer ones are "a longer sit".
export const QUICK_MAX_MINUTES = 5;

/** Whether a practice fits the "a few minutes" time filter. */
export function isQuick(p: Practice): boolean {
  return p.estimatedMinutes <= QUICK_MAX_MINUTES;
}

// Fallbacks when a flow can't be resolved (e.g. a flow was removed after an
// entry was saved). Kept generic and gentle, never clinical.
const INPUT_KEY_FALLBACK: Record<string, string> = {
  subject: 'What you noticed',
  quality: 'The quality underneath',
  echo: 'Where it echoes',
  reclaim: 'How it lives in you',
};

/**
 * Resolve the ORIGINAL question text a noticing entry's field was captured
 * under, so the read-back screen can show each answer beneath the exact prompt
 * the user saw. The label is flow-specific: inputKey 'echo' is "Where have you
 * felt this before?" in projection_recall but "What might it be pointing at?"
 * in somatic. Falls back to a generic label only if the flow/step is missing.
 */
export function questionForInputKey(
  flowId: string | null,
  inputKey: string,
): string {
  const flow = flowId ? FLOWS[flowId] : undefined;
  const step = flow?.steps.find((s) => 'inputKey' in s && s.inputKey === inputKey);
  if (step && 'title' in step && step.title) return step.title;
  return INPUT_KEY_FALLBACK[inputKey] ?? '';
}

export interface ReadbackField {
  key: 'subject' | 'quality' | 'echo' | 'reclaim';
  question: string;
}

// The persisted, written entry fields, in a sensible default order.
const READBACK_KEYS: ReadbackField['key'][] = ['subject', 'quality', 'echo', 'reclaim'];

/**
 * The reflective fields a noticing entry captured, IN THE ORDER the user
 * actually answered them, each paired with its original question. Walking the
 * flow's prompt steps (rather than a fixed list) keeps the read-back faithful —
 * e.g. in the 3·2·1 and persona flows the `quality` step is a substantive
 * written answer, not just a one-word tag, and it lands in its true position.
 */
export function readbackFields(
  flowId: string | null,
  inputs: FlowInputs = {},
): ReadbackField[] {
  const flow = flowId ? FLOWS[flowId] : undefined;
  if (flow) {
    const fields: ReadbackField[] = [];
    for (const s of flow.steps) {
      if (s.type === 'prompt' && (READBACK_KEYS as string[]).includes(s.inputKey)) {
        // Resolve echo tokens so the read-back shows the question exactly as the
        // user saw it (e.g. "How present is tightness?", not "{quality|it}").
        fields.push({ key: s.inputKey as ReadbackField['key'], question: resolveTokens(s.title, inputs) });
      }
    }
    if (fields.length) return fields;
  }
  return READBACK_KEYS.map((key) => ({ key, question: questionForInputKey(null, key) }));
}
