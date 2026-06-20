import React from 'react';
import { Circle, Line, Path, Rect } from 'react-native-svg';

/**
 * The line-art motif library for the Library. Each motif is a pure function that
 * draws into a fixed `0 0 100 100` viewBox using four theme-resolved colours, so
 * the same drawing reads correctly on the dark, light, and sepia papers. Keep
 * each motif simple (a handful of nodes) and stroke-led — "light on paper, not
 * pigment". Colours always come from the palette via `Illustration`; never
 * hardcode a hex here.
 */
export interface MotifColors {
  /** Main stroke. */
  primary: string;
  /** Quieter stroke for the "second" element (a shadow, a reflection). */
  secondary: string;
  /** Soft translucent interior fill, or 'none' for pure line tone. */
  fill: string;
  /** A single warm highlight (a spark, a flame, a low sun). */
  warm: string;
  /** Stroke width in viewBox units, sized so the on-screen line stays even. */
  sw: number;
}

const cap = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/** Build a tiny four-point sparkle path centred on (x, y) with radius r. */
function sparkle(x: number, y: number, r: number): string {
  const i = r * 0.38;
  return `M${x} ${y - r} L${x + i} ${y - i} L${x + r} ${y} L${x + i} ${y + i} L${x} ${y + r} L${x - i} ${y + i} L${x - r} ${y} L${x - i} ${y - i} Z`;
}

export const MOTIFS = {
  // ── The shadow itself ──────────────────────────────────────────────────────
  'figure-and-shadow': (c: MotifColors) => (
    <>
      <Path d="M48 80 L90 88 L84 80 C72 77 60 78 50 80 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="14" y1="80" x2="86" y2="80" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="40" cy="30" r="9" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M27 80 C27 53 53 53 53 80" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  mask: (c: MotifColors) => (
    <>
      <Circle cx="58" cy="50" r="26" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Path
        d="M30 26 C56 18 70 30 70 50 C70 72 56 84 46 80 C34 76 26 60 26 44 C26 34 28 28 30 26 Z"
        fill={c.fill}
        stroke={c.primary}
        strokeWidth={c.sw}
        {...cap}
      />
      <Path d="M33 46 C36 42 42 42 45 46" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 46 C53 42 59 42 62 46" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'two-shadows': (c: MotifColors) => (
    <>
      <Path d="M50 70 L20 86 L42 73 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 70 L80 86 L58 73 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="28" r="9" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M40 71 C40 49 60 49 60 71" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // ── Meeting what's in others ───────────────────────────────────────────────
  mirror: (c: MotifColors) => (
    <>
      <Line x1="50" y1="14" x2="50" y2="86" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="2 5" {...cap} />
      <Circle cx="31" cy="34" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M21 80 C21 58 41 58 41 80" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="69" cy="34" r="8" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M59 80 C59 58 79 58 79 80" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  mandorla: (c: MotifColors) => (
    <>
      <Path d="M50 26 A26 26 0 0 1 50 74 A26 26 0 0 1 50 26 Z" fill={c.fill} stroke="none" />
      <Circle cx="40" cy="50" r="26" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="60" cy="50" r="26" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  'turning-arrow': (c: MotifColors) => (
    <>
      <Circle cx="74" cy="66" r="5" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M73 60 C68 28 34 28 29 56" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M22 50 L29 58 L37 52" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="28" cy="66" r="5" fill={c.warm} stroke="none" />
    </>
  ),

  'inner-figure': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="26" r="9" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M30 84 C30 50 70 50 70 84" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="56" r="5" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M42 84 C42 68 58 68 58 84" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // ── The body & staying steady ──────────────────────────────────────────────
  pendulum: (c: MotifColors) => (
    <>
      <Path d="M22 64 C36 80 64 80 78 64" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} strokeDasharray="2 5" {...cap} />
      <Line x1="50" y1="18" x2="36" y2="70" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="2 4" {...cap} />
      <Circle cx="50" cy="18" r="3" fill={c.primary} stroke="none" />
      <Line x1="50" y1="18" x2="64" y2="70" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="64" cy="74" r="6" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} />
    </>
  ),

  'roots-mountain': (c: MotifColors) => (
    <>
      <Line x1="14" y1="58" x2="86" y2="58" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M24 58 L46 26 L58 42 L66 32 L80 58 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 58 L50 74 M50 66 L40 80 M50 66 L60 80 M50 74 L45 86 M50 74 L55 86" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // ── Shame & self-compassion ────────────────────────────────────────────────
  'hand-on-heart': (c: MotifColors) => (
    <>
      <Path
        d="M50 44 C44 33 28 35 28 49 C28 62 50 74 50 74 C50 74 72 62 72 49 C72 35 56 33 50 44 Z"
        fill={c.fill}
        stroke={c.primary}
        strokeWidth={c.sw}
        {...cap}
      />
      <Path d="M22 62 C34 84 66 84 78 62" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="52" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  seed: (c: MotifColors) => (
    <>
      <Path d="M28 68 C40 84 60 84 72 68" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="70" x2="50" y2="38" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 54 C40 52 33 44 35 36 C44 36 50 46 50 54 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 46 C60 44 67 36 65 28 C56 28 50 38 50 46 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="72" r="2.6" fill={c.warm} stroke="none" />
    </>
  ),

  // ── Meeting your figures ───────────────────────────────────────────────────
  'quill-two-voices': (c: MotifColors) => (
    <>
      <Path d="M20 32 C20 22 42 22 42 32 C42 41 30 43 30 43 L25 48 L27 41 C22 40 20 36 20 32 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M58 52 C58 43 80 43 80 52 C80 61 68 63 68 63 L73 68 L70 61 C62 60 58 56 58 52 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="76" x2="66" y2="50" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 79 L44 74 L42 72 Z" fill={c.warm} stroke="none" />
    </>
  ),

  'moon-stars': (c: MotifColors) => (
    <>
      <Path
        d="M60 22 C44 24 34 40 38 56 C42 72 58 80 72 74 C58 78 46 66 44 52 C42 38 50 26 60 22 Z"
        fill={c.fill}
        stroke={c.primary}
        strokeWidth={c.sw}
        {...cap}
      />
      <Path d={sparkle(74, 34, 4)} fill={c.warm} stroke="none" />
      <Path d={sparkle(80, 56, 3)} fill={c.secondary} stroke="none" />
      <Path d={sparkle(66, 66, 3)} fill={c.secondary} stroke="none" />
    </>
  ),

  // ── Integration & living it ────────────────────────────────────────────────
  'ocean-horizon': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="42" r="12" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Line x1="14" y1="58" x2="86" y2="58" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M16 68 C24 64 30 72 38 68 C46 64 52 72 60 68 C68 64 74 72 84 68" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M16 78 C24 74 30 82 38 78 C46 74 52 82 60 78 C68 74 74 82 84 78" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  threshold: (c: MotifColors) => (
    <>
      <Line x1="24" y1="84" x2="76" y2="84" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M32 84 L32 20 L68 20 L68 84" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M32 84 L32 24 L54 30 L54 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M58 36 L72 42 M58 52 L74 56 M58 68 L72 70" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'open-door': (c: MotifColors) => (
    <>
      <Line x1="14" y1="86" x2="86" y2="86" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="68" y1="56" x2="86" y2="56" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M68 86 L68 20 L34 20 L34 86" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 86 L34 24 L56 30 L56 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="62" cy="60" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  'closed-door': (c: MotifColors) => (
    <>
      <Rect x="32" y="18" width="36" height="68" rx="2" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Rect x="38" y="24" width="24" height="22" rx="1.5" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Rect x="38" y="52" width="24" height="22" rx="1.5" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="50" cy="48" r="3.4" fill={c.warm} stroke="none" />
      <Path d="M50 51 L48 59 L52 59 Z" fill={c.warm} stroke="none" />
    </>
  ),

  'open-book-lamp': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="34" r="11" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M50 27 C47 31 47 36 50 40 C53 36 53 31 50 27 Z" fill={c.warm} stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path
        d="M16 62 C30 54 44 54 50 60 C56 54 70 54 84 62 L84 72 C70 64 56 64 50 70 C44 64 30 64 16 72 Z"
        fill={c.fill}
        stroke={c.primary}
        strokeWidth={c.sw}
        {...cap}
      />
      <Line x1="50" y1="60" x2="50" y2="70" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M24 63 C32 59 42 59 48 63 M52 63 C58 59 68 59 76 63" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  // ── Going deeper ───────────────────────────────────────────────────────────
  compass: (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="30" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="50" y1="20" x2="50" y2="26" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="74" x2="50" y2="80" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="50" x2="26" y2="50" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="74" y1="50" x2="80" y2="50" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 32 L57 50 L50 50 Z" fill={c.warm} stroke="none" />
      <Path d="M50 68 L43 50 L50 50 Z" fill={c.secondary} stroke="none" />
      <Circle cx="50" cy="50" r="2.6" fill={c.primary} stroke="none" />
    </>
  ),

  'two-circles-meeting': (c: MotifColors) => (
    <>
      <Circle cx="36" cy="54" r="20" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="64" cy="54" r="20" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Line x1="50" y1="50" x2="50" y2="30" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="26" r="3" fill={c.primary} stroke="none" />
      <Circle cx="50" cy="54" r="4" fill={c.warm} stroke="none" />
    </>
  ),
} as const;

/** The set of available illustrations — the contract between content and art. */
export type IllustrationKey = keyof typeof MOTIFS;
