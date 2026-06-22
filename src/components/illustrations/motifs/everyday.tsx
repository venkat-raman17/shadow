import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const everydayMotifs = {
  // ── Everyday & relational shadow ───────────────────────────────────────────
  magnifier: (c: MotifColors) => (
    <>
      <Line x1="19" y1="28" x2="43" y2="28" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="19" y1="38" x2="38" y2="38" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="19" y1="48" x2="41" y2="48" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="19" y1="58" x2="34" y2="58" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="59" cy="50" r="19" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="59" cy="50" r="19" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.5} />
      <Line x1="72" y1="64" x2="85" y2="77" stroke={c.primary} strokeWidth={c.sw * 1.2} {...cap} />
      <Path d="M50 44 C53 40 58 40 61 43" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'two-masks': (c: MotifColors) => (
    <>
      <Path d="M21 32 C21 26 39 26 39 33 C39 50 33 60 30 60 C27 60 21 50 21 38 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M25 41 C27 39 29 39 31 41 M29 47 C31 50 35 50 37 47" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M61 38 C61 32 79 32 79 39 C79 56 73 66 70 66 C67 66 61 56 61 44 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M65 47 C67 45 69 45 71 47 M64 58 C66 55 70 55 72 58" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  ear: (c: MotifColors) => (
    <>
      <Path d="M37 36 C40 25 55 23 63 32 C71 41 66 54 59 58 C54 61 53 66 53 72 C53 77 47 78 45 73" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 40 C50 35 58 40 55 48 C53 53 48 52 48 56" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M71 35 C77 43 77 55 71 63" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M79 28 C88 41 88 57 79 70" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'flame-boundary': (c: MotifColors) => (
    <>
      <Path d="M50 20 C44 30 47 36 46 42 C50 40 52 36 52 33 C55 37 56 43 53 48 C58 46 60 38 56 30 C54 26 51 23 50 20 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="18" y1="64" x2="82" y2="64" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="30" y1="58" x2="30" y2="76" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="56" x2="50" y2="76" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="70" y1="58" x2="70" y2="76" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="22" y1="70" x2="78" y2="70" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
    </>
  ),

  lineage: (c: MotifColors) => (
    <>
      <Line x1="50" y1="29" x2="50" y2="41" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M30 55 C30 47 50 47 50 41 C50 47 70 47 70 55" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="22" r="7.5" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="30" cy="62" r="6.5" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="70" cy="62" r="6.5" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Circle cx="70" cy="62" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  'linked-rings': (c: MotifColors) => (
    <>
      <Circle cx="41" cy="42" r="17" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="59" cy="58" r="17" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Path d={sparkle(50, 50, 4)} fill={c.warm} stroke="none" />
    </>
  ),

  kintsugi: (c: MotifColors) => (
    <>
      <Path d="M26 44 C26 67 40 77 50 77 C60 77 74 67 74 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M26 44 C36 38 64 38 74 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 38 L45 51 L55 61 L49 77" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M45 51 L36 55 M55 61 L64 58" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
