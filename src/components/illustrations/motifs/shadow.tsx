import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, figure, type Motif, type MotifColors } from './kit';

export const shadowMotifs = {
  // ── The shadow itself ──────────────────────────────────────────────────────
  'figure-and-shadow': (c: MotifColors) => (
    <>
      <Path d="M50 81 C64 80 80 82 92 89 C84 90 74 88 64 86 C58 85 53 83 50 81 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="14" y1="81" x2="84" y2="81" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      {figure(38, 30, 81, 9, c, c.primary, true)}
      <Path d="M30 56 C35 60 41 60 46 56" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  mask: (c: MotifColors) => (
    <>
      <Path d="M58 24 C70 28 75 42 73 56 C71 72 62 82 56 80 C53 79 53 73 52 70 C51 73 51 79 48 80 C42 82 33 72 31 56 C29 42 34 28 46 24 C50 22.5 54 22.5 58 24 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M28 24 C42 17 58 17 72 24 C70 38 69 56 64 72 C60 84 54 88 50 88 C46 88 40 84 36 72 C31 56 30 38 28 24 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 44 C40 40 46 40 49 45" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M51 45 C54 40 60 40 63 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="52" x2="50" y2="62" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'two-shadows': (c: MotifColors) => (
    <>
      <Path d="M50 72 L18 87 L30 78 L44 74 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 72 L82 87 L70 78 L56 74 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      {figure(50, 28, 72, 9, c, c.primary, true)}
    </>
  ),


  // ── Meeting what's in others ───────────────────────────────────────────────
  mirror: (c: MotifColors) => (
    <>
      <Line x1="50" y1="13" x2="50" y2="87" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="1 5" {...cap} />
      {figure(31, 33, 82, 8, c, c.primary, true)}
      {figure(69, 33, 82, 8, c, c.secondary, false)}
      <Path d="M44 50 L50 47 L56 50" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  mandorla: (c: MotifColors) => (
    <>
      <Path d="M50 25 A27 27 0 0 1 50 75 A27 27 0 0 1 50 25 Z" fill={c.fill} stroke="none" />
      <Circle cx="39" cy="50" r="27" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="61" cy="50" r="27" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Path d={sparkle(50, 50, 6)} fill={c.warm} stroke="none" />
    </>
  ),

  'turning-arrow': (c: MotifColors) => (
    <>
      <Circle cx="75" cy="67" r="6" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M75 60 C72 30 36 28 28 54" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M20 49 L28 55 L36 50" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="27" cy="67" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  'inner-figure': (c: MotifColors) => (
    <>
      {figure(50, 24, 86, 10, c, c.primary, true)}
      <Circle cx="50" cy="54" r="5.5" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Path d="M43 82 C43 67 57 67 57 82" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="50" cy="54" r="1.6" fill={c.warm} stroke="none" />
    </>
  ),

  // The app's brand mark (matches the app icon): a figure with a cast shadow.
  // Use tone="duo" so the figure reads sage (primary) and the shadow reads warm (secondary).
  'brand-mark': (c: MotifColors) => (
    <>
      <Path d="M42 82 C58 80 78 82 88 89 C80 91 64 88 52 86 Z"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="14" y1="82" x2="84" y2="82" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      {figure(36, 22, 82, 10, c, c.primary, true)}
    </>
  ),

} satisfies Record<string, Motif>;
