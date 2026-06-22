import type { ReactNode } from 'react';
import { Circle, Path } from 'react-native-svg';

/**
 * Shared kit for the motif library. Every motif file imports ONLY from here, so
 * the dependency graph stays a tree (kit ← category files ← index) with no cycles.
 *
 * A motif is a pure function that draws into a fixed `0 0 100 100` viewBox using
 * four theme-resolved colours, so the same drawing reads on the dark, light, and
 * sepia papers. Style: refined stroke-led line-art ("light on paper, not pigment")
 * — clear silhouettes, a soft translucent fill for body, the odd warm highlight.
 * `sw` is the base stroke; use `sw*0.7` for fine inner detail so the hierarchy reads.
 * Colours always come from `MotifColors` (resolved by `Illustration`), never hardcoded.
 */
export interface MotifColors {
  /** Main stroke. */
  primary: string;
  /** Quieter stroke for secondary elements (a shadow, a reflection, detail). */
  secondary: string;
  /** Soft translucent interior fill, or 'none' for pure line tone. */
  fill: string;
  /** A single warm highlight (a spark, a flame, a low sun). */
  warm: string;
  /** Stroke width in viewBox units, sized so the on-screen line stays even. */
  sw: number;
}

/** A single motif drawing. Category files export `Record<string, Motif>` maps. */
export type Motif = (c: MotifColors) => ReactNode;

export const cap = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/** Build a tiny four-point sparkle path centred on (x, y) with radius r. */
export function sparkle(x: number, y: number, r: number): string {
  const i = r * 0.36;
  return `M${x} ${y - r} L${x + i} ${y - i} L${x + r} ${y} L${x + i} ${y + i} L${x} ${y + r} L${x - i} ${y + i} L${x - r} ${y} L${x - i} ${y - i} Z`;
}

/** A simple standing figure (head + gently tapered body) — reused across motifs. */
export function figure(
  cx: number,
  headY: number,
  footY: number,
  r: number,
  c: MotifColors,
  stroke: string,
  fillIt: boolean,
) {
  const top = headY + r;
  const halfW = r * 1.5;
  const d = `M${cx - halfW} ${footY} C${cx - halfW} ${top + (footY - top) * 0.35} ${cx - r * 0.7} ${top} ${cx} ${top} C${cx + r * 0.7} ${top} ${cx + halfW} ${top + (footY - top) * 0.35} ${cx + halfW} ${footY} Z`;
  return (
    <>
      <Circle cx={cx} cy={headY} r={r} fill={fillIt ? c.fill : 'none'} stroke={stroke} strokeWidth={c.sw} />
      <Path d={d} fill={fillIt ? c.fill : 'none'} stroke={stroke} strokeWidth={c.sw} {...cap} />
    </>
  );
}
