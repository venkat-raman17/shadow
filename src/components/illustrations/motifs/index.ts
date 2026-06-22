import { shadowMotifs } from './shadow';
import { steadyMotifs } from './steady';
import { shameMotifs } from './shame';
import { figuresMotifs } from './figures';
import { integrationMotifs } from './integration';
import { deeperMotifs } from './deeper';
import { everydayMotifs } from './everyday';
import { lifeMotifs } from './life';
import { workingMotifs } from './working';
import { personaMotifs } from './persona';
import { feelingsMotifs } from './feelings';
import { bodyMotifs } from './body';
import { spiritMotifs } from './spirit';
import { thresholdsMotifs } from './thresholds';
import { belongingMotifs } from './belonging';
import { practiceMotifs } from './practices';
import { pathMotifs } from './paths';
import { uiMotifs } from './ui';
import { chapterMotifs } from './chapters';

export type { MotifColors } from './kit';

/**
 * The full motif registry, merged from every category file. Each source map is
 * `satisfies Record<string, Motif>` (literal keys preserved); spreading them into
 * one object closed with `as const` yields the exact union of all keys, so
 * `IllustrationKey` stays a literal union. Never annotate MOTIFS as Record<…> —
 * that would collapse the keys to `string`.
 */
export const MOTIFS = {
  ...shadowMotifs,
  ...steadyMotifs,
  ...shameMotifs,
  ...figuresMotifs,
  ...integrationMotifs,
  ...deeperMotifs,
  ...everydayMotifs,
  ...lifeMotifs,
  ...workingMotifs,
  ...personaMotifs,
  ...feelingsMotifs,
  ...bodyMotifs,
  ...spiritMotifs,
  ...thresholdsMotifs,
  ...belongingMotifs,
  ...practiceMotifs,
  ...pathMotifs,
  ...uiMotifs,
  ...chapterMotifs,
} as const;

/** The set of available illustrations — the contract between content and art. */
export type IllustrationKey = keyof typeof MOTIFS;
