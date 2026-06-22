import { Circle, Line, Path } from 'react-native-svg';
import { cap, type Motif, type MotifColors } from './kit';

export const lifeMotifs = {
  // ── The life arc ───────────────────────────────────────────────────────────
  'noon-sun': (c: MotifColors) => (
    <>
      <Path d="M15 70 C15 37 85 37 85 70" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="2 4" {...cap} />
      <Line x1="15" y1="72" x2="85" y2="72" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="38" r="11" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Line x1="50" y1="20" x2="50" y2="14" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="34" y1="26" x2="30" y2="22" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="66" y1="26" x2="70" y2="22" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="28" y1="40" x2="22" y2="40" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="72" y1="40" x2="78" y2="40" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  hourglass: (c: MotifColors) => (
    <>
      <Line x1="29" y1="20" x2="71" y2="20" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="29" y1="80" x2="71" y2="80" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 20 C34 40 50 47 50 50 C50 53 34 60 34 80" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M66 20 C66 40 50 47 50 50 C50 53 66 60 66 80" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 26 L60 26 L52 43 C50 45 50 45 48 43 Z" fill={c.fill} stroke="none" />
      <Line x1="50" y1="46" x2="50" y2="60" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M44 74 C46 63 54 63 56 74 Z" fill={c.warm} stroke="none" />
    </>
  ),

  'forked-road': (c: MotifColors) => (
    <>
      <Line x1="16" y1="33" x2="84" y2="33" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M44 84 L48 52 M56 84 L52 52" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 52 C46 45 36 41 25 38" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 52 C54 45 64 41 75 38" fill="none" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="3 4" {...cap} />
      <Line x1="47" y1="68" x2="53" y2="68" stroke={c.primary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="25" cy="38" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  'bare-tree': (c: MotifColors) => (
    <>
      <Line x1="30" y1="81" x2="70" y2="81" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 81 L50 46" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 56 C44 52 38 48 35 42 M50 56 C56 52 62 48 65 42 M50 48 C46 44 43 40 42 34 M50 48 C54 44 57 40 58 34 M50 40 L50 30" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M35 42 C33 39 31 38 29 38 M65 42 C67 39 69 38 71 38 M42 34 C41 31 40 30 38 29 M58 34 C59 31 60 30 62 29" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Path d="M68 54 C72 52 74 56 70 58 C68 59 67 56 68 54 Z" fill={c.warm} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
