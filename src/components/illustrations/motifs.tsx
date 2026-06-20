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

  // ── Wave 2: archetypes & the imaginal ──────────────────────────────────────
  mandala: (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="32" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="19" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="50" cy="18" r="5" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="82" cy="50" r="5" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="82" r="5" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="18" cy="50" r="5" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  lantern: (c: MotifColors) => (
    <>
      <Line x1="50" y1="12" x2="50" y2="22" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 24 L60 24 L58 30 L42 30 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Rect x="40" y="30" width="20" height="34" rx="2" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="47" r="7" fill={c.warm} stroke="none" />
      <Line x1="44" y1="31" x2="44" y2="63" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="56" y1="31" x2="56" y2="63" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="38" y1="68" x2="62" y2="68" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'trickster-mask': (c: MotifColors) => (
    <>
      <Path d="M50 22 L45 11 L55 14 Z" fill={c.warm} stroke="none" />
      <Path d="M28 32 C50 24 72 32 72 50 C72 70 58 80 50 80 C42 80 28 66 28 48 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M35 44 C38 39 45 39 48 45" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="54" y1="46" x2="64" y2="44" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M39 60 C46 69 57 67 62 57" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'road-mountain': (c: MotifColors) => (
    <>
      <Line x1="16" y1="84" x2="84" y2="84" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M22 70 L50 28 L78 70 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d={sparkle(50, 30, 4)} fill={c.warm} stroke="none" />
      <Path d="M38 84 C50 78 50 76 50 70 C50 64 58 62 56 56" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'vessel-cup': (c: MotifColors) => (
    <>
      <Path d="M26 42 C26 64 38 74 50 74 C62 74 74 64 74 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M24 42 C36 36 64 36 76 42" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M26 46 C16 46 16 60 26 60" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M74 46 C84 46 84 60 74 60" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="74" x2="50" y2="82" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="82" x2="60" y2="82" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="54" r="5" fill={c.warm} stroke="none" />
    </>
  ),

  'inner-child': (c: MotifColors) => (
    <>
      <Line x1="24" y1="74" x2="64" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="44" cy="40" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M34 74 C34 54 54 54 54 74" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="53" y1="50" x2="70" y2="30" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="73" cy="26" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  'standing-stones': (c: MotifColors) => (
    <>
      <Line x1="18" y1="80" x2="82" y2="80" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="42" r="6" fill={c.warm} stroke="none" />
      <Path d="M30 80 L30 40 C30 33 40 33 40 40 L40 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M60 80 L60 36 C60 29 70 29 70 36 L70 80 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  scales: (c: MotifColors) => (
    <>
      <Line x1="50" y1="22" x2="50" y2="62" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 66 C44 61 56 61 60 66" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="24" y1="34" x2="76" y2="26" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="30" r="3" fill={c.primary} stroke="none" />
      <Line x1="24" y1="34" x2="24" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M16 44 C16 51 32 51 32 44" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="76" y1="26" x2="76" y2="36" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M68 36 C68 43 84 43 84 36" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="76" cy="33" r="2.5" fill={c.warm} stroke="none" />
    </>
  ),

  key: (c: MotifColors) => (
    <>
      <Circle cx="34" cy="42" r="13" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="34" cy="42" r="5" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Line x1="47" y1="42" x2="82" y2="42" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="74" y1="42" x2="74" y2="52" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="82" y1="42" x2="82" y2="54" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="34" cy="34" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  alembic: (c: MotifColors) => (
    <>
      <Circle cx="50" cy="20" r="3" fill={c.warm} stroke="none" />
      <Path d="M40 42 L40 30 L60 30 L60 42 C72 52 72 74 50 78 C28 74 28 52 40 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="30" x2="60" y2="30" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M33 60 C40 64 60 64 67 60" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="67" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  eclipse: (c: MotifColors) => (
    <>
      <Line x1="50" y1="14" x2="50" y2="22" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="74" x2="50" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="14" y1="48" x2="22" y2="48" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="78" y1="48" x2="86" y2="48" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="26" y1="24" x2="32" y2="30" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="68" y1="66" x2="74" y2="72" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="48" r="20" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="48" r="11" fill={c.primary} stroke="none" />
      <Path d="M36 56 C42 64 58 64 64 56" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // ── Wave 2: everyday & relational shadow ───────────────────────────────────
  magnifier: (c: MotifColors) => (
    <>
      <Line x1="20" y1="30" x2="42" y2="30" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="40" x2="38" y2="40" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="50" x2="42" y2="50" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="58" cy="48" r="18" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="71" y1="61" x2="84" y2="74" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 42 C53 38 58 38 61 41" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'two-masks': (c: MotifColors) => (
    <>
      <Path d="M22 34 C22 28 38 28 38 34 C38 50 32 58 30 58 C28 58 22 50 22 38 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M26 44 C28 48 32 48 34 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 38 C50 32 66 32 66 38 C66 54 60 62 58 62 C56 62 50 54 50 42 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M54 52 C56 48 60 48 62 52" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  ear: (c: MotifColors) => (
    <>
      <Path d="M38 34 C56 26 68 40 60 56 C56 66 48 64 48 74" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 42 C52 38 57 46 52 52" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M70 36 C76 44 76 56 70 64" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M78 28 C88 42 88 58 78 72" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  'flame-boundary': (c: MotifColors) => (
    <>
      <Path d="M50 22 C42 32 44 42 50 48 C56 42 58 32 50 22 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="64" x2="80" y2="64" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="32" y1="58" x2="32" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="56" x2="50" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="68" y1="58" x2="68" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  lineage: (c: MotifColors) => (
    <>
      <Line x1="50" y1="28" x2="50" y2="40" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 40 C50 47 32 47 32 54" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 40 C50 47 68 47 68 54" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="22" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="32" cy="60" r="6" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="68" cy="60" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  'linked-rings': (c: MotifColors) => (
    <>
      <Circle cx="42" cy="42" r="17" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="58" cy="58" r="17" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="3.5" fill={c.warm} stroke="none" />
    </>
  ),

  kintsugi: (c: MotifColors) => (
    <>
      <Path d="M26 44 C26 66 40 76 50 76 C60 76 74 66 74 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M26 44 C36 38 64 38 74 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 38 L46 50 L54 60 L50 76" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M46 50 L37 54" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // ── Wave 2: the life arc ───────────────────────────────────────────────────
  'noon-sun': (c: MotifColors) => (
    <>
      <Path d="M16 70 C16 38 84 38 84 70" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} strokeDasharray="2 4" {...cap} />
      <Line x1="16" y1="72" x2="84" y2="72" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="40" r="10" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="50" y1="22" x2="50" y2="16" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="34" y1="28" x2="30" y2="24" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="66" y1="28" x2="70" y2="24" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  hourglass: (c: MotifColors) => (
    <>
      <Line x1="30" y1="22" x2="70" y2="22" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="30" y1="78" x2="70" y2="78" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 22 C34 40 50 46 50 50 C50 54 34 60 34 78" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M66 22 C66 40 50 46 50 50 C50 54 66 60 66 78" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M41 27 L59 27 L52 41 C50 43 50 43 48 41 Z" fill={c.fill} stroke="none" />
      <Line x1="50" y1="47" x2="50" y2="59" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M43 73 C45 64 55 64 57 73 Z" fill={c.warm} stroke="none" />
    </>
  ),

  'forked-road': (c: MotifColors) => (
    <>
      <Line x1="16" y1="34" x2="84" y2="34" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M50 84 L50 50" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 50 C46 44 36 40 26 37" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 50 C54 44 64 40 74 37" fill="none" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="2 4" {...cap} />
      <Circle cx="26" cy="37" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  'bare-tree': (c: MotifColors) => (
    <>
      <Line x1="30" y1="80" x2="70" y2="80" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 80 L50 48" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 58 L38 46 M50 58 L62 46 M50 50 L42 40 M50 50 L60 40 M50 44 L50 32" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M67 56 C71 54 73 58 69 60 C67 61 66 58 67 56 Z" fill={c.warm} stroke="none" />
    </>
  ),

  // ── Wave 2: ways of working ────────────────────────────────────────────────
  'empty-chair': (c: MotifColors) => (
    <>
      <Line x1="24" y1="80" x2="76" y2="80" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M38 24 L36 80" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="56" x2="64" y2="56" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="63" y1="56" x2="63" y2="80" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="34" x2="46" y2="35" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="46" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  'rain-cloud': (c: MotifColors) => (
    <>
      <Path d="M32 46 C25 46 24 37 32 35 C33 27 46 25 49 33 C57 27 68 33 64 43 C72 43 72 53 62 53 L34 53 C29 53 28 49 32 46 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="59" x2="35" y2="69" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="59" x2="47" y2="71" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="62" y1="59" x2="59" y2="69" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'felt-sense': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="24" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M34 80 C34 50 66 50 66 80" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="62" r="12" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} />
      <Circle cx="50" cy="62" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  constellation: (c: MotifColors) => (
    <>
      <Line x1="50" y1="46" x2="28" y2="32" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="50" y1="46" x2="64" y2="28" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="50" y1="46" x2="38" y2="64" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="50" y1="46" x2="66" y2="62" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Circle cx="28" cy="32" r="3" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="64" cy="28" r="3" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="38" cy="64" r="3" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="66" cy="62" r="3" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="46" r="5" fill={c.warm} stroke="none" />
    </>
  ),

  'carry-bundle': (c: MotifColors) => (
    <>
      <Path d="M26 56 C30 69 44 73 50 73" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M74 56 C70 69 56 73 50 73" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="54" r="9" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="54" r="3" fill={c.warm} stroke="none" />
      <Line x1="50" y1="42" x2="50" y2="36" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="41" y1="45" x2="38" y2="40" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="59" y1="45" x2="62" y2="40" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'jagged-voice': (c: MotifColors) => (
    <>
      <Path d="M28 26 L72 26 C78 26 78 50 72 50 L52 50 L44 60 L44 50 L28 50 C22 50 22 26 28 26 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="32" x2="50" y2="40" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="44" r="1.8" fill={c.primary} stroke="none" />
    </>
  ),
} as const;

/** The set of available illustrations — the contract between content and art. */
export type IllustrationKey = keyof typeof MOTIFS;
