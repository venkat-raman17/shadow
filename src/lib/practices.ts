import type { SymbolViewProps } from 'expo-symbols';
import type { Flow } from '@/types/flow';

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
    id: 'noticing.persona.v1',
    title: "Who are you when no one's watching?",
    blurb: 'The gap between the self you show and the self you keep.',
    depth: 'notice',
    icon: { ios: 'theatermasks', web: 'theater_comedy' },
  },
  {
    id: 'noticing.321.v1',
    title: "What's pulling your attention?",
    blurb: 'Three small moves to settle a busy mind.',
    depth: 'notice',
    icon: { ios: 'scope', web: 'center_focus_weak' },
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
