import { Line, Path } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const thresholdsMotifs = {
  // ── Wave 3: thresholds & change ────────────────────────────────────────────
  archway: (c: MotifColors) => (
    <>
      <Line x1="18" y1="84" x2="82" y2="84" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M30 84 L30 46 C30 24 70 24 70 46 L70 84" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 84 L40 50 C40 36 60 36 60 50 L60 84" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M47 60 L53 60 L53 84 L47 84" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d={sparkle(50, 48, 3.4)} fill={c.warm} stroke="none" />
    </>
  ),

  'setting-sun': (c: MotifColors) => (
    <>
      <Line x1="14" y1="64" x2="86" y2="64" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 64 C34 55 42 49 50 49 C58 49 66 55 66 64 Z" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="40" x2="50" y2="34" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="32" y1="46" x2="28" y2="42" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="68" y1="46" x2="72" y2="42" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M16 72 C26 69 32 75 42 72 M58 72 C68 69 74 75 84 72" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  bridge: (c: MotifColors) => (
    <>
      <Path d="M14 44 C36 44 64 44 86 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M20 44 C20 62 80 62 80 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="44" x2="20" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="80" y1="44" x2="80" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="35" y1="49.5" x2="35" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Line x1="50" y1="51" x2="50" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Line x1="65" y1="49.5" x2="65" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Line x1="14" y1="74" x2="86" y2="74" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="2 3" {...cap} />
      <Path d={sparkle(50, 30, 3.4)} fill={c.warm} stroke="none" />
    </>
  ),

  sunrise: (c: MotifColors) => (
    <>
      <Line x1="14" y1="66" x2="86" y2="66" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 66 C34 57 42 50 50 50 C58 50 66 57 66 66 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="42" x2="50" y2="34" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="30" y1="48" x2="25" y2="43" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="70" y1="48" x2="75" y2="43" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="22" y1="58" x2="16" y2="56" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="78" y1="58" x2="84" y2="56" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M16 74 C26 71 32 77 42 74 M58 74 C68 71 74 77 84 74" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
