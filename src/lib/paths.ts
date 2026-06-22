import type { Gender } from '@/hooks/useUserProfile';
import type { IllustrationKey } from '@/components/illustrations';
import type { BookSignal } from '@/lib/readings';
import { captivatedFlow } from '@/lib/threshold';

/**
 * Paths — the worn trails through the practices.
 *
 * A Path is a gentle, ordered sequence of existing flows for a common moment
 * ("someone got under your skin" → recall the projection → the 3-2-1 turn →
 * carry one thing). It's an *index*, not a new runtime: the flow runner threads
 * a user along a path via `?path=&pathStep=` params (see FlowEngine's exit), and
 * any step can also be entered on its own. Nothing here is required or tracked —
 * a path is a trail you can enter anywhere, leave anywhere, and never finish.
 *
 * These mirror the Library's `ways-through` reading 1:1, so the prose and the
 * actionable trail never drift.
 */

export interface PathStep {
  /** An existing flow id (must be a key of FLOWS / a CATALOGUE practice). */
  flowId: string;
  /** One quiet line on why this step sits here — descriptive, never a metric. */
  why: string;
}

export interface Path {
  id: string;
  /** The situation, as a phrase. */
  title: string;
  /** The moment in the user's own felt language, second person. */
  when: string;
  /** The default (gender-neutral) sequence. */
  steps: PathStep[];
  /** The Library chapter this trail is described in. */
  readingId?: string;
  /** A cover/header motif (an existing illustration key only). */
  icon?: IllustrationKey;
  /** Quality families that surface this path (see suggestPath). */
  match?: { qualities?: string[] };
  /** Gender-varied step order, when a step is contrasexual (only "dazzled"). */
  resolve?: (g: Gender | null | undefined) => PathStep[];
}

export const PATHS: Path[] = [
  {
    id: 'path.under_skin.v1',
    title: 'Someone got under your skin',
    when: 'A reaction to someone is still chewing at you, hours later, far bigger than the moment that set it off.',
    icon: 'coat-hook',
    readingId: 'ways-through',
    match: { qualities: ['anger', 'resentment', 'envy', 'jealousy'] },
    steps: [
      { flowId: 'noticing.projection_recall.v1', why: 'Notice the reaction while it’s warm, and the quality underneath it.' },
      { flowId: 'noticing.321.v1', why: 'Walk the charge home — face it, talk to it, be it.' },
      { flowId: 'integration.after_meeting.v1', why: 'Take your own coat back off their hook — carry one small thing.' },
    ],
  },
  {
    id: 'path.dazzled.v1',
    title: 'Something — or someone — dazzles you',
    when: 'You can’t stop circling a person, a quality, a life that isn’t yours — the pull aches more than it has any right to.',
    icon: 'aching-pull',
    readingId: 'ways-through',
    match: { qualities: ['longing', 'envy'] },
    steps: [
      { flowId: 'noticing.golden_shadow.v1', why: 'Follow the quality that draws you — a seed already in you.' },
      { flowId: 'meeting.active_imagination.v1', why: 'Sit with the figure to hear what you’ve admired from a distance.' },
      { flowId: 'integration.after_meeting.v1', why: 'The golden shadow asks to be lived, not just envied — carry one small thing.' },
    ],
    resolve: (g) => [
      { flowId: captivatedFlow(g), why: 'Follow the quality that draws you — a seed already in you.' },
      { flowId: 'meeting.active_imagination.v1', why: 'Sit with the figure to hear what you’ve admired from a distance.' },
      { flowId: 'integration.after_meeting.v1', why: 'The golden shadow asks to be lived, not just envied — carry one small thing.' },
    ],
  },
  {
    id: 'path.shame_spiral.v1',
    title: 'A shame spiral',
    when: 'You’ve dropped below the line — small, exposed, sure you’re the one thing about yourself you can’t bear.',
    icon: 'spiral-inward',
    readingId: 'ways-through',
    match: { qualities: ['shame', 'guilt'] },
    steps: [
      { flowId: 'grounding.settle.v1', why: 'Steady first — ground back inside the window before looking.' },
      { flowId: 'noticing.facing_shame.v1', why: 'Meet the shame gently, now that you’re steady enough to.' },
      { flowId: 'noticing.self_compassion.v1', why: 'Turn toward yourself the way you would toward a frightened friend.' },
    ],
  },
  {
    id: 'path.circling.v1',
    title: 'You keep circling the same thing',
    when: 'The same feeling, the same figure, the same ache keeps coming back around no matter how you turn from it.',
    icon: 'return-loop',
    readingId: 'ways-through',
    match: { qualities: ['numbness', 'heaviness', 'restlessness', 'longing'] },
    steps: [
      { flowId: 'meeting.active_imagination.v1', why: 'Sit with the part underneath the pattern — slower, in writing.' },
      { flowId: 'integration.after_meeting.v1', why: 'Carry one small thing of what it asked for.' },
    ],
  },
  {
    id: 'path.dial_spike.v1',
    title: 'When the dial spikes',
    when: 'It’s suddenly too much — too loud and too fast to think, let alone go looking for meaning.',
    icon: 'dial-gauge',
    readingId: 'ways-through',
    match: { qualities: ['anxiety', 'fear', 'tightness' ] },
    steps: [
      { flowId: 'grounding.settle.v1', why: 'Stop the depth work — come back through the breath and an anchor.' },
      { flowId: 'grounding.tipp.v1', why: 'If it stays high, turn the dial down fast, through the body.' },
    ],
  },
];

export function getPath(id: string): Path | undefined {
  return PATHS.find((p) => p.id === id);
}

/** The resolved step sequence for a path, given the user's gender. */
export function pathSteps(path: Path, gender: Gender | null | undefined): PathStep[] {
  return path.resolve ? path.resolve(gender) : path.steps;
}

/**
 * The one path to gently offer for where the user is now — chosen from the top
 * surfacing quality family. Returns undefined when nothing is surfacing yet
 * (a newcomer), so Home can simply show nothing. Deterministic, offline.
 */
export function suggestPath(signal: BookSignal): Path | undefined {
  for (const family of signal.qualityFamilies) {
    const hit = PATHS.find((p) => p.match?.qualities?.includes(family));
    if (hit) return hit;
  }
  return undefined;
}
