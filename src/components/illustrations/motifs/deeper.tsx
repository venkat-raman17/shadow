import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, figure, type Motif, type MotifColors } from './kit';

export const deeperMotifs = {
  // ── Going deeper ───────────────────────────────────────────────────────────
  compass: (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="31" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="25" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} />
      <Line x1="50" y1="19" x2="50" y2="26" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="74" x2="50" y2="81" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="19" y1="50" x2="26" y2="50" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="74" y1="50" x2="81" y2="50" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 31 L56 50 L50 47 L44 50 Z" fill={c.warm} stroke="none" />
      <Path d="M50 69 L44 50 L50 53 L56 50 Z" fill={c.secondary} stroke="none" />
      <Circle cx="50" cy="50" r="2.4" fill={c.primary} stroke="none" />
    </>
  ),

  'two-circles-meeting': (c: MotifColors) => (
    <>
      <Circle cx="36" cy="55" r="20" fill="none" stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="64" cy="55" r="20" fill="none" stroke={c.secondary} strokeWidth={c.sw} />
      <Line x1="50" y1="49" x2="50" y2="28" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d={sparkle(50, 24, 4)} fill={c.primary} stroke="none" />
      <Circle cx="50" cy="55" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  mandala: (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="33" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="24" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Circle cx="50" cy="50" r="13" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.85} />
      <Path d="M50 17 C54 24 54 32 50 37 C46 32 46 24 50 17 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M83 50 C76 54 68 54 63 50 C68 46 76 46 83 50 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M50 83 C46 76 46 68 50 63 C54 68 54 76 50 83 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M17 50 C24 46 32 46 37 50 C32 54 24 54 17 50 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Circle cx="50" cy="50" r="4.5" fill={c.warm} stroke="none" />
    </>
  ),

  lantern: (c: MotifColors) => (
    <>
      <Path d="M50 11 C46 11 46 16 50 16 C54 16 54 11 50 11 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="50" y1="16" x2="50" y2="22" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M39 24 L61 24 L57 30 L43 30 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M41 30 L41 64 L59 64 L59 30 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 41 C46 46 46 52 50 56 C54 52 54 46 50 41 Z" fill={c.warm} stroke="none" />
      <Line x1="41" y1="47" x2="59" y2="47" stroke={c.secondary} strokeWidth={c.sw * 0.5} {...cap} />
      <Path d="M37 64 L63 64 L60 70 L40 70 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'trickster-mask': (c: MotifColors) => (
    <>
      <Path d="M30 16 L36 26 M50 13 L50 24 M70 16 L64 26" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M27 32 C50 23 73 32 72 51 C71 71 57 82 50 82 C43 82 29 70 28 50 C28 43 27 36 27 32 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M35 43 C38 38 45 38 48 44" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="53" y1="45" x2="65" y2="42" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M38 61 C46 70 58 67 63 56" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="42" cy="55" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  'road-mountain': (c: MotifColors) => (
    <>
      <Line x1="14" y1="85" x2="86" y2="85" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M20 70 L48 26 L62 47 L70 36 L84 70 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M48 26 L43 40 L52 38 Z" fill={c.warm} stroke="none" />
      <Path d={sparkle(48, 22, 4)} fill={c.warm} stroke="none" />
      <Path d="M40 85 C52 80 50 73 46 70 C42 67 50 62 52 58" fill="none" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="3 3" {...cap} />
    </>
  ),

  'vessel-cup': (c: MotifColors) => (
    <>
      <Path d="M27 42 C27 64 38 75 50 75 C62 75 73 64 73 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M23 42 C36 35 64 35 77 42" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M27 47 C16 47 16 61 27 61" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M73 47 C84 47 84 61 73 61" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="75" x2="50" y2="83" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 83 L60 83" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 52 C47 55 53 55 56 52" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="50" cy="56" r="3.5" fill={c.warm} stroke="none" />
    </>
  ),

  'inner-child': (c: MotifColors) => (
    <>
      <Line x1="22" y1="76" x2="62" y2="76" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      {figure(42, 42, 76, 8.5, c, c.primary, true)}
      <Path d="M36 60 L48 60" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="51" y1="50" x2="71" y2="28" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="74" cy="24" r="6.5" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Circle cx="74" cy="24" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  'standing-stones': (c: MotifColors) => (
    <>
      <Line x1="16" y1="82" x2="84" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d={sparkle(50, 40, 5)} fill={c.warm} stroke="none" />
      <Path d="M28 82 L30 40 C30 33 41 33 41 40 L42 82 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M58 82 L59 34 C59 27 71 27 71 34 L72 82 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M33 50 L37 50 M64 44 L68 44" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.5} {...cap} />
    </>
  ),

  scales: (c: MotifColors) => (
    <>
      <Line x1="50" y1="20" x2="50" y2="62" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M39 67 C44 61 56 61 61 67 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="20" r="2.6" fill={c.primary} stroke="none" />
      <Line x1="24" y1="33" x2="76" y2="25" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="24" y1="33" x2="18" y2="45" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="24" y1="33" x2="30" y2="45" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M15 45 C15 52 33 52 33 45 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="76" y1="25" x2="70" y2="37" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="76" y1="25" x2="82" y2="37" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M67 37 C67 44 85 44 85 37 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="76" cy="33" r="2.4" fill={c.warm} stroke="none" />
    </>
  ),

  key: (c: MotifColors) => (
    <>
      <Circle cx="33" cy="43" r="14" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="33" cy="43" r="5.5" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} />
      <Line x1="46" y1="46" x2="82" y2="58" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="74" y1="55.4" x2="71" y2="63" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="82" y1="58" x2="79" y2="66" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="27" cy="36" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  alembic: (c: MotifColors) => (
    <>
      <Circle cx="50" cy="18" r="3" fill={c.warm} stroke="none" />
      <Path d="M42 41 L42 28 L58 28 L58 41 C71 51 72 76 50 80 C28 76 29 51 42 41 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="42" y1="28" x2="58" y2="28" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M33 62 C40 66 60 66 67 62" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="46" cy="69" r="2.4" fill={c.warm} stroke="none" />
      <Circle cx="55" cy="66" r="1.8" fill={c.warm} stroke="none" />
      <Circle cx="52" cy="73" r="1.4" fill={c.secondary} stroke="none" />
    </>
  ),

  eclipse: (c: MotifColors) => (
    <>
      <Path d="M50 13 L50 22 M50 74 L50 83 M13 48 L22 48 M74 48 L83 48 M24 22 L31 29 M76 22 L69 29 M24 74 L31 67 M76 74 L69 67" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="48" r="21" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="48" r="13" fill={c.primary} stroke="none" />
      <Path d="M33 55 C40 65 60 65 67 55" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

} satisfies Record<string, Motif>;
