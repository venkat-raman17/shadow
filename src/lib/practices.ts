import type { SymbolViewProps } from 'expo-symbols';
import type { Flow, FlowInputs } from '@/types/flow';
import { resolveTokens } from '@/engine/tokens';

/** The platform-aware symbol name object accepted by expo-symbols' SymbolView. */
type IconName = SymbolViewProps['name'];

// ─── Bundled flows ──────────────────────────────────────────────────────────
// Single source of truth for both the flow runner (src/app/flow/[id].tsx) and
// the Home catalogue below. Add new flow files here as they're authored.
export const FLOWS: Record<string, Flow> = {
  'noticing.projection_recall.v1': require('@/assets/flows/noticing.projection_recall.v1.json'),
  'noticing.somatic.v1': require('@/assets/flows/noticing.somatic.v1.json'),
  'noticing.facing_shame.v1': require('@/assets/flows/noticing.facing_shame.v1.json'),
  'noticing.golden_shadow.v1': require('@/assets/flows/noticing.golden_shadow.v1.json'),
  'noticing.anima_projection.v1': require('@/assets/flows/noticing.anima_projection.v1.json'),
  'noticing.animus_projection.v1': require('@/assets/flows/noticing.animus_projection.v1.json'),
  'noticing.persona.v1': require('@/assets/flows/noticing.persona.v1.json'),
  'noticing.321.v1': require('@/assets/flows/noticing.321.v1.json'),
  'grounding.settle.v1': require('@/assets/flows/grounding.settle.v1.json'),
  'meeting.active_imagination.v1': require('@/assets/flows/meeting.active_imagination.v1.json'),
  'integration.after_meeting.v1': require('@/assets/flows/integration.after_meeting.v1.json'),
};

// ─── The three depths ───────────────────────────────────────────────────────
// The organizing spine of the app. Depth is surfaced progressively: a newcomer
// only sees 'notice'; 'sit' and 'carry' open once there's prior work.
export type Depth = 'notice' | 'sit' | 'carry';

export interface Practice {
  id: string;
  title: string;
  /** Plain-language "what this is" — the method stays under the hood. */
  blurb: string;
  depth: Depth;
  estimatedMinutes: number;
  icon: IconName;
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
    icon: { ios: 'figure.mind.and.body', web: 'self_improvement' },
  },
  {
    id: 'noticing.projection_recall.v1',
    title: 'Who got under your skin?',
    blurb: 'Notice a reaction to someone, and the quality underneath it.',
    depth: 'notice',
    icon: { ios: 'person.fill.questionmark', web: 'person' },
  },
  {
    id: 'noticing.golden_shadow.v1',
    title: 'Who do you admire?',
    blurb: 'Follow an admiration back to something unlived in you.',
    depth: 'notice',
    icon: { ios: 'sparkles', web: 'auto_awesome' },
  },
  {
    id: 'noticing.anima_projection.v1',
    title: 'Who captivates you?',
    blurb: 'Notice when intense attraction is pointing at something unlived in you.',
    depth: 'notice',
    icon: { ios: 'figure.2.arms.open', web: 'favorite_border' },
    requiresGender: 'man',
  },
  {
    id: 'noticing.animus_projection.v1',
    title: 'Whose voice is in your head?',
    blurb: 'Notice the inner critic or the pull toward someone who carries your unlived strength.',
    depth: 'notice',
    icon: { ios: 'quote.bubble', web: 'record_voice_over' },
    requiresGender: 'woman',
  },
  {
    id: 'noticing.persona.v1',
    title: "Who are you when no one's watching?",
    blurb: 'The gap between the self you show and the self you keep.',
    depth: 'notice',
    icon: { ios: 'theatermasks', web: 'theater_comedy' },
  },
  {
    id: 'noticing.321.v1',
    title: 'Turn a reaction around',
    blurb: 'Take a strong reaction through three angles — them, you, and I — and find what’s yours.',
    depth: 'notice',
    icon: { ios: 'arrow.2.squarepath', web: 'swap_horiz' },
  },
  {
    id: 'noticing.facing_shame.v1',
    title: 'What shame says about you',
    blurb: 'Not fixing it — just naming it, and meeting it differently.',
    depth: 'notice',
    icon: { ios: 'heart.circle', web: 'favorite' },
  },
  {
    id: 'meeting.active_imagination.v1',
    title: 'Sit with what keeps coming up',
    blurb: 'Meet a part of yourself in a written back-and-forth.',
    depth: 'sit',
    icon: { ios: 'bubble.left.and.bubble.right', web: 'forum' },
  },
  {
    id: 'integration.after_meeting.v1',
    title: 'Carry something into your week',
    blurb: 'Turn what you found into one small, real thing to try.',
    depth: 'carry',
    icon: { ios: 'arrow.forward.circle', web: 'arrow_forward' },
  },
];

export const PRACTICES: Practice[] = CATALOGUE.map((p) => ({
  ...p,
  estimatedMinutes: FLOWS[p.id]?.estimatedMinutes ?? 0,
}));

export function practicesByDepth(depth: Depth): Practice[] {
  return PRACTICES.filter((p) => p.depth === depth);
}

export function getPractice(id: string): Practice | undefined {
  return PRACTICES.find((p) => p.id === id);
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
