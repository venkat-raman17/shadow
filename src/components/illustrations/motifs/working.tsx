import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, type Motif, type MotifColors } from './kit';

export const workingMotifs = {
  // ── Ways of working ────────────────────────────────────────────────────────
  'empty-chair': (c: MotifColors) => (
    <>
      <Line x1="24" y1="81" x2="76" y2="81" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 22 L35 81" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 56 L65 56 L65 81" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M37 56 C37 58 65 58 65 56" fill={c.fill} stroke="none" />
      <Line x1="37" y1="33" x2="46" y2="35" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Line x1="37" y1="44" x2="46" y2="46" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="51" cy="45" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  'rain-cloud': (c: MotifColors) => (
    <>
      <Path d="M33 45 C25 45 24 35 33 33 C34 25 47 23 50 31 C58 25 70 31 65 42 C74 42 74 53 63 53 L35 53 C29 53 28 49 33 45 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="37" y1="60" x2="34" y2="70" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="60" x2="47" y2="72" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="63" y1="60" x2="60" y2="70" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="44" y1="62" x2="42" y2="69" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="57" y1="62" x2="55" y2="69" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  'felt-sense': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="23" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M33 82 C33 50 38 40 50 40 C62 40 67 50 67 82 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="60" r="13" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} />
      <Circle cx="50" cy="60" r="8" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} />
      <Circle cx="50" cy="60" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  constellation: (c: MotifColors) => (
    <>
      <Path d="M27 33 L50 47 L64 27 M50 47 L38 66 L66 62 L50 47" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Path d={sparkle(27, 33, 3.4)} fill={c.primary} stroke="none" />
      <Path d={sparkle(64, 27, 3)} fill={c.primary} stroke="none" />
      <Path d={sparkle(38, 66, 3)} fill={c.primary} stroke="none" />
      <Path d={sparkle(66, 62, 3)} fill={c.primary} stroke="none" />
      <Path d={sparkle(50, 47, 5)} fill={c.warm} stroke="none" />
    </>
  ),

  'carry-bundle': (c: MotifColors) => (
    <>
      <Path d="M25 54 C28 70 44 75 50 75 C56 75 72 70 75 54" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M25 54 C22 52 22 48 26 48 M75 54 C78 52 78 48 74 48" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="50" cy="52" r="10" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="50" cy="52" r="3" fill={c.warm} stroke="none" />
      <Line x1="50" y1="39" x2="50" y2="33" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="40" y1="43" x2="36" y2="38" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="60" y1="43" x2="64" y2="38" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),

  'jagged-voice': (c: MotifColors) => (
    <>
      <Path d="M27 26 L73 26 C79 26 79 50 73 50 L54 50 L45 61 L45 50 L27 50 C21 50 21 26 27 26 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 34 L48 41 L43 41 L47 47" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="56" y1="34" x2="56" y2="41" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="56" cy="45" r="1.7" fill={c.primary} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
