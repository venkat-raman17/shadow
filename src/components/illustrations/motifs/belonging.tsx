import { Circle, Line, Path } from 'react-native-svg';
import { cap, figure, type Motif, type MotifColors } from './kit';

export const belongingMotifs = {
  // ── Wave 3: belonging & loneliness ─────────────────────────────────────────
  'circle-of-figures': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="52" r="26" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} strokeDasharray="2 4" />
      <Circle cx="50" cy="26" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="74" cy="44" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="65" cy="72" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="35" cy="72" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="26" cy="44" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="52" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  flock: (c: MotifColors) => (
    <>
      <Path d="M22 36 C26 32 30 32 34 36 C38 32 42 32 46 36" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M54 36 C58 32 62 32 66 36 C70 32 74 32 78 36" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M30 54 C34 50 38 50 42 54 C46 50 50 50 54 54 C58 50 62 50 66 54" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 72 C40 66 46 66 50 72 C54 66 60 66 66 72" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 72 C46 66 46 60 50 58 M50 72 C54 66 54 60 50 58" fill={c.warm} stroke={c.primary} strokeWidth={c.sw * 0.6} {...cap} />
    </>
  ),

  'lone-figure': (c: MotifColors) => (
    <>
      <Line x1="16" y1="82" x2="84" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 60 L60 60 M44 68 L56 68 M48 74 L52 74" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.5} strokeDasharray="1 4" {...cap} />
      {figure(50, 32, 82, 9, c, c.primary, true)}
      <Path d="M44 70 C47 73 53 73 56 70" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.5} {...cap} />
    </>
  ),

  'solitude-tree': (c: MotifColors) => (
    <>
      <Line x1="16" y1="84" x2="84" y2="84" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M68 84 L68 50" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M68 56 C62 52 60 46 60 42 M68 52 C74 49 78 44 78 40 M68 46 L68 38" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      {figure(36, 50, 84, 8, c, c.primary, true)}
      <Circle cx="36" cy="64" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  'one-apart': (c: MotifColors) => (
    <>
      <Circle cx="30" cy="40" r="6" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="46" cy="40" r="6" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="62" cy="40" r="6" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Line x1="24" y1="52" x2="68" y2="52" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="76" cy="68" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="76" cy="68" r="2" fill={c.warm} stroke="none" />
      <Line x1="68" y1="76" x2="84" y2="76" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
