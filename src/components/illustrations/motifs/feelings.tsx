import { Circle, Line, Path, Rect } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const feelingsMotifs = {
  // ── Wave 3: feelings, one by one ───────────────────────────────────────────
  'covet-eye': (c: MotifColors) => (
    <>
      <Path d="M22 50 C34 36 66 36 78 50 C66 64 34 64 22 50 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="8" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="3" fill={c.warm} stroke="none" />
      <Path d="M70 36 L78 30 M74 44 L83 41" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'triangle-three': (c: MotifColors) => (
    <>
      <Path d="M50 30 L30 68 M50 30 L70 68" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="2 3" {...cap} />
      <Circle cx="50" cy="24" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="28" cy="72" r="7" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="72" cy="72" r="7" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M44 70 C48 67 52 67 56 70" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'downturned-face': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="48" r="30" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M36 40 L46 43" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M64 40 L54 43" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 64 C45 59 55 59 60 64" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="48" x2="50" y2="53" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'stopped-clock': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="52" r="29" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="50" y1="26" x2="50" y2="31" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="73" x2="50" y2="78" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="24" y1="52" x2="29" y2="52" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="71" y1="52" x2="76" y2="52" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="52" x2="50" y2="36" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="52" x2="62" y2="52" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="52" r="2.4" fill={c.warm} stroke="none" />
    </>
  ),

  gift: (c: MotifColors) => (
    <>
      <Rect x="28" y="44" width="44" height="34" rx="2" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="28" y1="56" x2="72" y2="56" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="50" y1="44" x2="50" y2="78" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 44 C44 44 38 40 40 34 C46 33 50 39 50 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 44 C56 44 62 40 60 34 C54 33 50 39 50 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d={sparkle(50, 24, 4.5)} fill={c.warm} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
