import { Line, Path } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const figuresMotifs = {
  // ── Meeting your figures ───────────────────────────────────────────────────
  'quill-two-voices': (c: MotifColors) => (
    <>
      <Path d="M19 33 C19 23 41 23 41 33 C41 41 31 44 31 44 L25 49 L27 42 C22 41 19 38 19 33 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M59 50 C59 41 81 41 81 50 C81 58 71 61 71 61 L77 66 L73 60 C64 60 59 56 59 50 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="80" x2="68" y2="48" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M64 48 C68 47 71 50 70 54 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M36 82 L42 76 L44 78 Z" fill={c.warm} stroke="none" />
    </>
  ),

  'moon-stars': (c: MotifColors) => (
    <>
      <Path d="M62 20 C46 22 35 38 39 56 C43 73 60 81 75 74 C61 79 47 68 44 53 C41 38 50 25 62 20 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M48 38 C50 36 52 36 53 38" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Path d={sparkle(76, 32, 4.5)} fill={c.warm} stroke="none" />
      <Path d={sparkle(82, 54, 3)} fill={c.secondary} stroke="none" />
      <Path d={sparkle(67, 68, 3.2)} fill={c.secondary} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
