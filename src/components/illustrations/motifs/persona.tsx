import { Circle, Line, Path, Rect } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const personaMotifs = {
  // ── Wave 3: the persona & the world ────────────────────────────────────────
  'desk-mask': (c: MotifColors) => (
    <>
      <Line x1="16" y1="62" x2="84" y2="62" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="24" y1="62" x2="24" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="76" y1="62" x2="76" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 28 C49 23 61 28 60 42 C59 54 52 60 49 60 C46 60 39 54 38 42 C37 36 37 32 37 28 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M42 40 C44 37 47 37 49 40 M50 40 C52 37 55 37 57 40" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M44 50 C47 53 52 53 55 50" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  coins: (c: MotifColors) => (
    <>
      <Circle cx="40" cy="40" r="17" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="40" cy="40" r="11" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} />
      <Line x1="40" y1="33" x2="40" y2="47" stroke={c.primary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M37 36 C40 34 43 36 41 39 C39 41 41 43 44 42" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M58 66 m-15 0 a15 9 0 1 0 30 0 a15 9 0 1 0 -30 0" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Path d="M43 66 C43 72 73 72 73 66" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="62" cy="64" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  'screen-face': (c: MotifColors) => (
    <>
      <Rect x="32" y="16" width="36" height="62" rx="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="45" y1="71" x2="55" y2="71" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="40" r="7" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.85} />
      <Path d="M40 56 C40 48 60 48 60 56" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d={sparkle(64, 24, 3.4)} fill={c.warm} stroke="none" />
    </>
  ),

  ladder: (c: MotifColors) => (
    <>
      <Line x1="38" y1="84" x2="46" y2="20" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="62" y1="84" x2="54" y2="20" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="70" x2="60" y2="70" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="42" y1="56" x2="58" y2="56" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="43" y1="42" x2="57" y2="42" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="45" y1="29" x2="55" y2="29" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d={sparkle(50, 16, 4.5)} fill={c.warm} stroke="none" />
    </>
  ),

  'cracked-mask': (c: MotifColors) => (
    <>
      <Path d="M28 26 C42 19 58 19 72 26 C70 40 69 56 64 72 C60 84 54 88 50 88 C46 88 40 84 36 72 C31 56 30 40 28 26 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 44 C40 40 46 40 49 45 M51 45 C54 40 60 40 63 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 20 L46 34 L54 46 L47 60 L52 74" fill="none" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="2 2" {...cap} />
      <Circle cx="46" cy="34" r="1.4" fill={c.warm} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
