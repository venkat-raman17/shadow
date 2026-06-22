import { Circle, Line, Path } from 'react-native-svg';
import { cap, type Motif, type MotifColors } from './kit';

export const steadyMotifs = {
  // ── The body & staying steady ──────────────────────────────────────────────
  pendulum: (c: MotifColors) => (
    <>
      <Path d="M22 62 C36 78 64 78 78 62" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="1 5" {...cap} />
      <Line x1="50" y1="18" x2="34" y2="68" stroke={c.secondary} strokeWidth={c.sw * 0.8} strokeDasharray="2 3" {...cap} />
      <Path d="M44 16 L56 16 L53 21 L47 21 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="18" r="2.4" fill={c.primary} stroke="none" />
      <Line x1="50" y1="20" x2="66" y2="68" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="66" cy="72" r="6.5" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} />
    </>
  ),

  'roots-mountain': (c: MotifColors) => (
    <>
      <Line x1="14" y1="58" x2="86" y2="58" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M22 58 L44 26 L55 41 L64 30 L82 58 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 26 L40 38 L47 36 Z" fill={c.warm} stroke="none" />
      <Path d="M50 58 L50 72 M50 64 L41 76 M50 64 L59 76 M50 72 L44 85 M50 72 L56 85 M41 76 L38 84" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
