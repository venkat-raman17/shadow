import { Circle, Line, Path } from 'react-native-svg';
import { cap, type Motif, type MotifColors } from './kit';

export const bodyMotifs = {
  // ── Wave 3: the body ───────────────────────────────────────────────────────
  'listening-body': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="22" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M34 82 C34 50 39 40 50 40 C61 40 66 50 66 82 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 58 C47 61 53 61 56 58" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M40 60 C44 70 56 70 60 60" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="50" cy="58" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  lungs: (c: MotifColors) => (
    <>
      <Line x1="50" y1="20" x2="50" y2="40" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 34 C44 34 40 38 40 44 M50 34 C56 34 60 38 60 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 42 C30 46 28 60 33 72 C37 80 46 78 46 70 L46 48 C46 44 43 41 40 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M60 42 C70 46 72 60 67 72 C63 80 54 78 54 70 L54 48 C54 44 57 41 60 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M41 52 C43 53 44 55 44 58 M59 52 C57 53 56 55 56 58" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="50" cy="42" r="2.4" fill={c.warm} stroke="none" />
    </>
  ),

  'nerve-branch': (c: MotifColors) => (
    <>
      <Path d="M50 84 L50 30" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 68 C40 64 34 56 32 47 M50 60 C60 56 66 48 68 39 M50 50 C42 46 38 40 37 33 M50 44 C58 40 62 35 63 28" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="50" cy="26" r="6" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="26" r="2" fill={c.warm} stroke="none" />
      <Circle cx="32" cy="47" r="2" fill={c.secondary} stroke="none" />
      <Circle cx="68" cy="39" r="2" fill={c.secondary} stroke="none" />
      <Circle cx="37" cy="33" r="2" fill={c.secondary} stroke="none" />
      <Circle cx="63" cy="28" r="2" fill={c.secondary} stroke="none" />
    </>
  ),

  'body-imprint': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="24" r="8" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M35 80 C35 50 40 40 50 40 C60 40 65 50 65 80 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 56 C46 52 54 52 56 56 C58 60 54 66 50 66 C46 66 42 60 44 56 Z" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M48 58 C49 60 51 60 52 58" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.6} {...cap} />
    </>
  ),

  knot: (c: MotifColors) => (
    <>
      <Path d="M22 50 C36 50 40 38 50 38 C60 38 64 62 50 62 C40 62 36 50 22 50 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M78 50 C64 50 60 62 50 62 C40 62 36 38 50 38 C60 38 64 50 78 50 Z" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="78" y1="50" x2="90" y2="50" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="22" y1="50" x2="12" y2="50" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="2.2" fill={c.warm} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
