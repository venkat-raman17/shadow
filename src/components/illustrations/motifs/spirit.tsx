import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const spiritMotifs = {
  // ── Wave 3: spirit & meaning ───────────────────────────────────────────────
  radiance: (c: MotifColors) => (
    <>
      <Path d="M50 12 L50 26 M50 74 L50 88 M12 50 L26 50 M74 50 L88 50 M24 24 L33 33 M76 24 L67 33 M24 76 L33 67 M76 76 L67 67" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="18" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="10" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} />
      <Circle cx="50" cy="50" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  'altar-flame': (c: MotifColors) => (
    <>
      <Path d="M50 24 C44 32 46 40 45 47 C50 45 52 40 52 36 C56 41 57 48 53 54 C60 51 62 40 56 30 C54 27 51 26 50 24 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 60 L66 60 L62 70 L38 70 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="32" y1="78" x2="68" y2="78" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="70" x2="36" y2="78" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="62" y1="70" x2="64" y2="78" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  synchronicity: (c: MotifColors) => (
    <>
      <Path d="M30 22 C16 36 16 64 30 78" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M70 22 C84 36 84 64 70 78" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="35" cy="50" r="4" fill={c.fill} stroke={c.primary} strokeWidth={c.sw * 0.85} />
      <Circle cx="65" cy="50" r="4" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Line x1="39" y1="50" x2="61" y2="50" stroke={c.secondary} strokeWidth={c.sw * 0.6} strokeDasharray="2 3" {...cap} />
      <Path d={sparkle(50, 50, 4.5)} fill={c.warm} stroke="none" />
    </>
  ),

  'bypass-cloud': (c: MotifColors) => (
    <>
      <Path d="M32 38 C24 38 23 28 32 26 C33 18 46 16 49 24 C57 18 69 24 64 35 C73 35 73 46 62 46 L34 46 C28 46 27 42 32 38 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M36 58 C42 56 44 60 50 60 C56 60 58 56 64 58" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 74 C44 66 44 60 46 56 M50 74 C56 66 56 60 54 56" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="2 3" {...cap} />
      <Path d="M44 50 C47 53 53 53 56 50" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'symbol-eye': (c: MotifColors) => (
    <>
      <Path d="M20 50 C34 34 66 34 80 50 C66 66 34 66 20 50 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="9" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Path d={sparkle(50, 50, 5)} fill={c.warm} stroke="none" />
      <Path d="M50 18 L50 30 M50 70 L50 80 M26 30 L33 37 M74 30 L67 37" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
