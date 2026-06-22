import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, figure, type Motif, type MotifColors } from './kit';

/**
 * One dedicated motif per Path (a worn trail through several practices). Kept
 * distinct from every practice and chapter so a path reads as its own thing.
 */
export const pathMotifs = {
  // under_skin — a large coat hanging on one small wall hook (what they carry is yours).
  'coat-hook': (c: MotifColors) => (
    <>
      <Path d="M50 16 L50 24 C50 28 46 28 46 25" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 28 C44 28 42 34 40 42 L34 76 C34 80 66 80 66 76 L60 42 C58 34 56 28 50 28 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="30" x2="50" y2="62" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="50" cy="24" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  // dazzled — a figure leaning hard toward a glowing orb across a taut tether.
  'aching-pull': (c: MotifColors) => (
    <>
      <Circle cx="36" cy="40" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M26 82 C28 60 34 50 44 48 C50 47 52 52 48 56 C40 62 38 72 40 82 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="48" y1="50" x2="66" y2="46" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Circle cx="74" cy="44" r="9" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Path d={sparkle(74, 44, 3.4)} fill={c.warm} stroke="none" />
    </>
  ),

  // shame_spiral — a tightening spiral down to a small figure, a warm hand reaching in.
  'spiral-inward': (c: MotifColors) => (
    <>
      <Path d="M50 50 C50 44 58 44 58 52 C58 64 42 64 42 50 C42 34 66 34 66 54 C66 78 30 78 30 50" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="3.4" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} />
      <Path d="M72 66 C64 61 58 56 53 52" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // circling — a closed loop returning to its own start, over a small figure.
  'return-loop': (c: MotifColors) => (
    <>
      {figure(50, 56, 84, 7, c, c.secondary, false)}
      <Path d="M38 36 C38 20 62 20 62 34 C62 46 44 46 44 36" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M48 32 L44 37 L50 41" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="22" r="2.4" fill={c.warm} stroke="none" />
    </>
  ),

  // dial_spike — a half-gauge with the needle pegged into the warm zone.
  'dial-gauge': (c: MotifColors) => (
    <>
      <Path d="M22 64 A28 28 0 0 1 78 64" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M64 40 A28 28 0 0 1 78 64" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="64" x2="70" y2="46" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="64" r="3.4" fill={c.secondary} stroke="none" />
      <Line x1="22" y1="64" x2="28" y2="64" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="72" y1="64" x2="78" y2="64" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),
} satisfies Record<string, Motif>;
