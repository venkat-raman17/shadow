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

// A second level of organization inside the (large) 'notice' depth: a themed
// cluster grouping practices by what you're working *from* (a reaction, the
// body, a hard feeling…). Only 'notice' practices carry one; the smaller depths
// stay flat.
export type NoticeGroup = 'reaction' | 'attraction' | 'body' | 'self' | 'feeling';

export interface Practice {
  id: string;
  title: string;
  /** Plain-language "what this is" — the method stays under the hood. */
  blurb: string;
  depth: Depth;
  estimatedMinutes: number;
  icon: IllustrationKey;
  /** Themed sub-cluster within the 'notice' depth (see NOTICE_GROUPS). */
  group?: NoticeGroup;
  /** If set, only surface this practice for users whose gender matches. Non-binary users see all. */
  requiresGender?: 'man' | 'woman';
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
    icon: 'facing-chairs',
  },
  {
    id: 'meeting.inner_child.v1',
    title: 'Meet your younger self',
    blurb: 'A gentle written meeting with the child you once were.',
    depth: 'sit',
    icon: 'crouch-to-child',
  },
  {
    id: 'meeting.dream_figure.v1',
    title: 'A figure from a dream',
    blurb: 'Meet someone or something from a dream — not to decode it, to hear it.',
    depth: 'sit',
    icon: 'night-visitor',
  },
  {
    id: 'meeting.archetypal_encounter.v1',
    title: 'Sit with what you already know',
    blurb: 'A quieter dialogue with the steadier, deeper part of you.',
    depth: 'sit',
    icon: 'deep-knowing',
  },
  {
    id: 'noticing.unlived_expression.v1',
    title: 'What did you set aside?',
    blurb: 'Follow an unlived part of you back to what still wants expression.',
    depth: 'sit',
    icon: 'unfurling-sprout',
  },
  {
    id: 'noticing.nightmare.v1',
    title: 'Rewrite a recurring dream',
    blurb: 'Gently give a returning nightmare a new shape, while you’re awake.',
    depth: 'sit',
    icon: 'reshaped-dream',
  },
  {
    id: 'integration.after_meeting.v1',
    title: 'Carry something into your week',
    blurb: 'Turn what you found into one small, real thing to try.',
    depth: 'carry',
    icon: 'carry-step',
  },
  {
    id: 'noticing.reclaim_ritual.v1',
    title: "Set down what's not yours",
    blurb: 'A quiet closing: release the burden a part carried, keep the part.',
    depth: 'carry',
    icon: 'release-birds',
  },
  {
    id: 'noticing.boundaries.v1',
    title: "The line you haven't drawn",
    blurb: 'Follow the resentment back to one small boundary you could keep.',
    depth: 'carry',
    icon: 'drawn-line',
  },
  {
    id: 'grounding.settle.v1',
    title: 'Slow down and settle',
    blurb: 'Breath and anchors to come back when things speed up.',
    depth: 'ground',
    icon: 'slow-exhale',
  },
  {
    id: 'grounding.body_scan.v1',
    title: 'A short body scan',
    blurb: 'Come back into your body, one place at a time.',
    depth: 'ground',
    icon: 'scan-sweep',
  },
  {
    id: 'grounding.urge_surf.v1',
    title: 'Ride the urge',
    blurb: 'An urge rises, crests, and falls — ride it instead of fighting it.',
    depth: 'ground',
    icon: 'cresting-wave',
  },
  {
    id: 'grounding.tipp.v1',
    title: 'Turn the dial down fast',
    blurb: 'When distress is very high, the quickest way back is through the body.',
    depth: 'ground',
    icon: 'frost-star',
  },
];

export const PRACTICES: Practice[] = CATALOGUE.map((p) => ({
  ...p,
  estimatedMinutes: FLOWS[p.id]?.estimatedMinutes ?? 0,
}));

export function practicesByDepth(depth: Depth): Practice[] {
  return PRACTICES.filter((p) => p.depth === depth);
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

// The themed clusters inside the 'notice' depth, in display order. Notice holds
// ~15 practices; these sub-headers turn that wall into a few scannable groups by
// what you're working *from*. The one-line intro names the moment each cluster
// is for, so the long section reads as a few clear doors rather than a list.
// Order here is the order shown.
export const NOTICE_GROUPS: { group: NoticeGroup; label: string; intro: string }[] = [
  { group: 'reaction', label: 'From a reaction', intro: 'When something someone did is still working on you.' },
  { group: 'attraction', label: 'Admiration & attraction', intro: 'When a pull toward someone is pointing at something in you.' },
  { group: 'body', label: 'Starting from the body', intro: 'When there’s a sensation but no words for it yet.' },
  { group: 'self', label: 'A closer look at yourself', intro: 'When you want to turn the lamp on quietly, on your own.' },
  { group: 'feeling', label: 'Sitting with a hard feeling', intro: 'When something painful is here and asking to be met.' },
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
