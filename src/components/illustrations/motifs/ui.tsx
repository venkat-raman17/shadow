import { Circle, Line, Path, Rect } from 'react-native-svg';
import { cap, type Motif, type MotifColors } from './kit';

export const uiMotifs = {
  // ── Functional UI glyphs ───────────────────────────────────────────────────
  // Simple, single-idea marks meant to read at 13–24px. Drawn stroke-led with no
  // sub-`sw*0.7` detail and minimal primitives, so they hold up small and look
  // right in the flat `ui`/`color` tone (where every slot is one colour). The few
  // used as content icons (ui-bolt-heart, ui-pin*) also read in `soft`/`duo`.
  'ui-search': (c: MotifColors) => (
    <>
      <Circle cx="45" cy="45" r="28" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="65" y1="65" x2="86" y2="86" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // Settings as three soft sliders — gentler than a mechanical gear, on-brand.
  'ui-sliders': (c: MotifColors) => (
    <>
      <Line x1="18" y1="30" x2="82" y2="30" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="18" y1="50" x2="82" y2="50" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="18" y1="70" x2="82" y2="70" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="64" cy="30" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="36" cy="50" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="58" cy="70" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
    </>
  ),

  'ui-close': (c: MotifColors) => (
    <Path d="M26 26 L74 74 M74 26 L26 74" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
  ),

  'ui-close-circle': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="33" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M39 39 L61 61 M61 39 L39 61" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'ui-chevron': (c: MotifColors) => (
    <Path d="M38 22 L66 50 L38 78" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
  ),

  'ui-backspace': (c: MotifColors) => (
    <>
      <Path d="M14 50 L37 26 L86 26 L86 74 L37 74 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M52 40 L70 60 M70 40 L52 60" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  'ui-faceid': (c: MotifColors) => (
    <>
      <Path d="M22 38 L22 27 Q22 22 27 22 L38 22 M62 22 L73 22 Q78 22 78 27 L78 38 M78 62 L78 73 Q78 78 73 78 L62 78 M38 78 L27 78 Q22 78 22 73 L22 62" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="42" x2="40" y2="53" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="60" y1="42" x2="60" y2="53" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 61 Q50 69 60 61" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'ui-lock': (c: MotifColors) => (
    <>
      <Path d="M36 46 L36 36 A14 14 0 0 1 64 36 L64 46" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Rect x="26" y="46" width="48" height="40" rx="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="62" r="4" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Line x1="50" y1="64" x2="50" y2="74" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  'ui-pin': (c: MotifColors) => (
    <>
      <Path d="M40 20 L60 20 L55 44 L66 54 L34 54 L45 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="54" x2="50" y2="82" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'ui-pin-filled': (c: MotifColors) => (
    <>
      <Path d="M40 20 L60 20 L55 44 L66 54 L34 54 L45 44 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="54" x2="50" y2="82" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // Theme as a light/dark appearance disc — matches the tonal-paper themes.
  'ui-theme': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="30" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M50 20 A30 30 0 0 1 50 80 Z" fill={c.primary} stroke="none" />
    </>
  ),

  'ui-bolt-heart': (c: MotifColors) => (
    <>
      <Path d="M50 38 C44 28 28 28 26 43 C24 55 40 66 50 76 C60 66 76 55 74 43 C72 28 56 28 50 38 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M55 44 L44 57 L52 57 L47 68" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.9} {...cap} />
    </>
  ),


  // ── Tab-bar family (one weight, read at 24px) ──────────────────────────────
  'tab-home': (c: MotifColors) => (
    <>
      <Path d="M18 50 L50 22 L82 50" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M27 45 L27 80 L73 80 L73 45" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M43 80 L43 62 L57 62 L57 80" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  // A seated, cross-legged figure — reads as practice/stillness, not a profile.
  'tab-practice': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="27" r="11" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M50 43 C41 43 35 50 33 60 L27 77 C27 80 33 81 50 81 C67 81 73 80 73 77 L67 60 C65 50 59 43 50 43 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M36 61 C40 69 60 69 64 61" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  'tab-notebook': (c: MotifColors) => (
    <>
      <Rect x="26" y="20" width="48" height="60" rx="5" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="36" y1="36" x2="64" y2="36" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="36" y1="50" x2="64" y2="50" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="36" y1="64" x2="56" y2="64" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  'tab-library': (c: MotifColors) => (
    <>
      <Rect x="22" y="26" width="15" height="52" rx="2" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Rect x="42" y="22" width="15" height="56" rx="2" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Rect x="62" y="30" width="15" height="48" rx="2" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="18" y1="82" x2="82" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),


  // ── New content motifs (writing / cold) ────────────────────────────────────
  'writing-page': (c: MotifColors) => (
    <>
      <Rect x="20" y="20" width="44" height="60" rx="5" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="30" y1="36" x2="54" y2="36" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="30" y1="48" x2="54" y2="48" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="30" y1="60" x2="46" y2="60" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M56 82 L80 44 L88 49 L64 86 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 82 L54 90 L62 86 Z" fill={c.primary} stroke="none" />
    </>
  ),

  'frost-star': (c: MotifColors) => (
    <>
      <Path d="M50 16 L50 84 M22 32 L78 68 M78 32 L22 68" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 26 L42 34 M50 26 L58 34 M50 74 L42 66 M50 74 L58 66 M26 34 L36 35 M26 66 L36 65 M74 34 L64 35 M74 66 L64 65" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="50" cy="50" r="3.5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── Entryway + fallback marks ──────────────────────────────────────────────
  // The quiet neutral fallback for any record whose flow has no catalogue motif.
  'generic-practice': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="26" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="44" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M38 64 C38 52 62 52 62 64" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // sit entryway — two low facing seats with a soft gap.
  'two-seats': (c: MotifColors) => (
    <>
      <Path d="M22 56 C22 50 40 50 40 56 L40 66 L22 66 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M60 56 C60 50 78 50 78 56 L78 66 L60 66 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="58" r="2.6" fill={c.warm} stroke="none" />
    </>
  ),

  // steady entryway — an anchor under a calm waterline, a warm bead at the ring.
  'steady-anchor': (c: MotifColors) => (
    <>
      <Line x1="18" y1="34" x2="82" y2="34" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="30" r="5" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="50" y1="35" x2="50" y2="74" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="46" x2="60" y2="46" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M30 62 C32 74 50 80 50 80 C50 80 68 74 70 62" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="30" r="1.8" fill={c.warm} stroke="none" />
    </>
  ),
} satisfies Record<string, Motif>;
