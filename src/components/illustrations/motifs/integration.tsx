import { Circle, Line, Path, Rect } from 'react-native-svg';
import { cap, type Motif, type MotifColors } from './kit';

export const integrationMotifs = {
  // ── Integration & living it ────────────────────────────────────────────────
  'ocean-horizon': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="40" r="13" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Path d="M40 36 C44 33 56 33 60 36" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.6} {...cap} />
      <Line x1="14" y1="58" x2="86" y2="58" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M15 67 C23 63 29 71 37 67 C45 63 51 71 59 67 C67 63 73 71 85 67" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M15 77 C23 73 29 81 37 77 C45 73 51 81 59 77 C67 73 73 81 85 77" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  threshold: (c: MotifColors) => (
    <>
      <Line x1="22" y1="85" x2="78" y2="85" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M31 85 L31 19 L69 19 L69 85" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M31 85 L31 23 L54 29 L54 81 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="49" cy="54" r="1.8" fill={c.primary} stroke="none" />
      <Path d="M58 35 L72 41 M58 52 L74 56 M58 69 L72 71" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  'open-door': (c: MotifColors) => (
    <>
      <Line x1="14" y1="86" x2="86" y2="86" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M68 86 L68 20 L34 20 L34 86" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 86 L34 24 L56 30 L56 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="68" y1="55" x2="88" y2="55" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Circle cx="63" cy="58" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  'closed-door': (c: MotifColors) => (
    <>
      <Rect x="31" y="17" width="38" height="69" rx="2.5" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Rect x="37" y="23" width="26" height="23" rx="1.5" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Rect x="37" y="52" width="26" height="23" rx="1.5" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Circle cx="50" cy="49" r="3.4" fill={c.warm} stroke="none" />
      <Path d="M50 52 L48 60 L52 60 Z" fill={c.warm} stroke="none" />
    </>
  ),

  'open-book-lamp': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="33" r="11" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Path d="M50 26 C46 30 46 36 50 41 C54 36 54 30 50 26 Z" fill={c.warm} stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M14 60 C30 51 44 51 50 58 C56 51 70 51 86 60 L86 73 C70 64 56 64 50 71 C44 64 30 64 14 73 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="58" x2="50" y2="71" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M22 62 C31 58 42 58 48 62 M52 62 C58 58 69 58 78 62 M24 67 C32 64 42 64 48 67 M52 67 C58 64 68 64 76 67" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
