import { Circle, Line, Path } from 'react-native-svg';
import { cap, type Motif, type MotifColors } from './kit';

export const shameMotifs = {
  // ── Shame & self-compassion ────────────────────────────────────────────────
  'hand-on-heart': (c: MotifColors) => (
    <>
      <Path d="M50 42 C43 31 27 33 27 48 C27 62 50 76 50 76 C50 76 73 62 73 48 C73 33 57 31 50 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="52" r="3" fill={c.warm} stroke="none" />
      <Path d="M24 60 C30 56 36 56 41 60 C44 62 46 64 48 66" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M30 56 L30 64 M36 55 L36 64 M42 57 L42 65" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  seed: (c: MotifColors) => (
    <>
      <Path d="M26 66 C38 86 62 86 74 66 L74 70 C62 88 38 88 26 70 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="72" x2="50" y2="36" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 52 C39 51 32 42 34 33 C44 34 51 43 50 52 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 44 C61 42 68 33 66 25 C56 26 49 36 50 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 48 C46 48 42 45 40 41 M50 42 C54 41 58 38 60 34" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="50" cy="74" r="2.6" fill={c.warm} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
