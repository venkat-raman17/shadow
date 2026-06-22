import type { Gender } from '@/hooks/useUserProfile';
import { getPractice } from '@/lib/practices';

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
 *  gendered framing. Exported so Paths can resolve the "dazzled" trail's first
 *  step the same way the doorways and entry routes do. */
export function captivatedFlow(gender: Gender | null | undefined): FlowId {
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

export interface Situation {
  /** A plain, first-person line of where someone is right now. */
  label: string;
  /** The flow that fits that moment. */
  flowId: FlowId;
}

/**
 * The "Not sure where to begin?" situations on the Workshop — a small set of
 * felt moments, each mapped to the flow that fits, so a user can pick by what's
 * happening rather than by method. Shares the routing vocabulary with the
 * doorways and the text router; gender is accepted for parity (and future use).
 */
export function situationsFor(_gender: Gender | null | undefined): Situation[] {
  return [
    { label: 'Something just happened', flowId: 'noticing.in_the_moment.v1' },
    { label: 'Someone got under my skin', flowId: 'noticing.projection_recall.v1' },
    { label: 'A feeling won’t lift', flowId: 'noticing.rain.v1' },
    { label: 'I admire someone I can’t stop thinking about', flowId: 'noticing.golden_shadow.v1' },
    { label: 'I need to steady myself', flowId: 'grounding.settle.v1' },
  ];
}

/**
 * Resolve an entryway option's deferred route ("resolve:<key>") at runtime,
 * where the destination depends on data a flow JSON can't branch on (gender,
 * a sensible default). Keeps every gender-aware decision in the one file that
 * owns routing. Falls back to the body-first noticing — the safe universal door.
 */
export function resolveEntryRoute(key: string, gender: Gender | null | undefined): FlowId {
  switch (key) {
    case 'captivated':
      return captivatedFlow(gender);
    case 'voice':
      return voiceFlow(gender);
    case 'suggest':
    default:
      return 'noticing.somatic.v1';
  }
}

/**
 * The adaptive suggestion behind "Begin where I am" / "I'm not sure" — what to
 * open when the user hasn't said anything specific. Lives here, alongside the
 * text and doorway routers, so the whole "which flow comes next" decision has a
 * single home. Pure and deterministic: the caller passes the data and the clock
 * hour, so there's no hidden state and it stays trivially testable.
 */
export interface SuggestContext {
  /** No prior entries, parts, or experiments yet. */
  firstRun: boolean;
  /** Highest surfacing-pattern count (0 when none recur). */
  topPatternCount: number;
  hasParts: boolean;
  hasOpenExperiment: boolean;
  gender: Gender | null | undefined;
  /** Local hour 0–23, passed in to keep this pure. */
  hour: number;
}

export function suggestFlow(ctx: SuggestContext): FlowId {
  // A newcomer starts from the body — no situation or person required.
  if (ctx.firstRun) return 'noticing.somatic.v1';

  // Something keeps surfacing — invite sitting with it (the personification move).
  if (ctx.topPatternCount >= 2 && getPractice('meeting.active_imagination.v1')) {
    return 'meeting.active_imagination.v1';
  }

  // Parts met but nothing being carried — close the loop with an experiment.
  if (ctx.hasParts && !ctx.hasOpenExperiment) return 'integration.after_meeting.v1';

  // Otherwise a gentle noticing, shaped by time of day, then gender.
  if (ctx.hour < 12) return 'noticing.somatic.v1';
  if (ctx.hour < 18) return 'noticing.projection_recall.v1';
  if (ctx.gender === 'man') return 'noticing.anima_projection.v1';
  if (ctx.gender === 'woman') return 'noticing.animus_projection.v1';
  return 'noticing.golden_shadow.v1';
}
