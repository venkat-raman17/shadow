import { Circle, Line, Path } from 'react-native-svg';
import { cap, sparkle, figure, type Motif, type MotifColors } from './kit';

/**
 * One dedicated motif per practice (the things you *do*). Kept distinct from
 * every chapter/book/path so a user relates a single mark to its workflow
 * wherever it appears (catalogue, flow exit, notebook, history).
 */
export const practiceMotifs = {
  // 321 — turning a reaction around (them → you → I): a charge leaving, looping back.
  'charge-uturn': (c: MotifColors) => (
    <>
      <Path d="M28 44 C28 30 70 28 74 48 C77 64 62 72 50 70" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 64 L49 70 L57 75" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="28" cy="44" r="4.5" fill={c.warm} stroke="none" />
    </>
  ),

  // active_imagination — two chairs angled to meet, a warm spark between them.
  'facing-chairs': (c: MotifColors) => (
    <>
      <Path d="M28 36 L28 66 L42 66" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="31" y1="66" x2="31" y2="78" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M72 36 L72 66 L58 66" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="69" y1="66" x2="69" y2="78" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d={sparkle(50, 52, 5.5)} fill={c.warm} stroke="none" />
    </>
  ),

  // facing_shame — a bowed figure, the chest opening, a small warmth lifting.
  'unclench-shame': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="32" r="9" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M38 80 C38 54 62 54 62 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M42 58 C46 62 54 62 58 58" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="50" cy="49" r="2.6" fill={c.warm} stroke="none" />
    </>
  ),

  // tensions — a level beam with two open pans and a warm seed on the fulcrum.
  'two-pans': (c: MotifColors) => (
    <>
      <Line x1="50" y1="22" x2="50" y2="34" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="34" x2="80" y2="34" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M14 38 C14 50 26 50 26 38" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M74 38 C74 50 86 50 86 38" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="20" y1="34" x2="20" y2="38" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="80" y1="34" x2="80" y2="38" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Circle cx="50" cy="22" r="3.4" fill={c.warm} stroke="none" />
    </>
  ),

  // rain practice — a small cloud over four graded drops, the middle one warm.
  'four-drops': (c: MotifColors) => (
    <>
      <Path d="M28 42 C28 32 44 30 47 38 C58 33 70 42 62 50 L34 50 C28 50 28 46 28 42 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 58 C34 62 30 62 30 58 C30 55 32 55 34 58 Z" fill={c.secondary} stroke="none" />
      <Path d="M46 62 C46 66 42 66 42 62 C42 59 44 59 46 62 Z" fill={c.warm} stroke="none" />
      <Path d="M58 58 C58 62 54 62 54 58 C54 55 56 55 58 58 Z" fill={c.secondary} stroke="none" />
      <Path d="M70 64 C70 68 66 68 66 64 C66 61 68 61 70 64 Z" fill={c.secondary} stroke="none" />
    </>
  ),

  // draw_whats_here — a hand with charcoal mid-stroke, a loose warm scribble.
  'hand-finding-shape': (c: MotifColors) => (
    <>
      <Path d="M30 28 C36 40 46 50 56 58 C60 61 60 66 56 68 C50 71 40 64 34 54 C30 47 28 38 30 28 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 58 L70 72" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M58 24 C70 26 66 36 56 34 C62 42 52 46 48 38" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  // somatic — a seated torso, concentric rings over the belly, warm centre.
  'body-held': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="26" r="9" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M34 80 C34 50 66 50 66 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="62" r="9" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} />
      <Circle cx="50" cy="62" r="4.5" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} />
      <Circle cx="50" cy="62" r="1.8" fill={c.warm} stroke="none" />
    </>
  ),

  // settle — one long out-breath curving down into a settling pool.
  'slow-exhale': (c: MotifColors) => (
    <>
      <Path d="M30 26 C56 26 56 50 40 56 C30 60 30 70 44 70" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M18 78 C30 73 40 73 50 78 C60 83 70 83 82 78" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="44" cy="70" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  // body_scan — a standing body crossed by one moving scan band, a warm tick.
  'scan-sweep': (c: MotifColors) => (
    <>
      {figure(50, 24, 84, 9, c, c.primary, true)}
      <Line x1="22" y1="56" x2="78" y2="56" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="3 4" {...cap} />
      <Circle cx="78" cy="56" r="3" fill={c.warm} stroke="none" />
    </>
  ),

  // dream_figure — a dark doorway with a faint figure standing in it, two stars.
  'night-visitor': (c: MotifColors) => (
    <>
      <Path d="M34 84 L34 28 C34 22 66 22 66 28 L66 84 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      {figure(50, 42, 78, 6, c, c.secondary, false)}
      <Path d={sparkle(76, 30, 4)} fill={c.warm} stroke="none" />
      <Path d={sparkle(26, 40, 3)} fill={c.secondary} stroke="none" />
    </>
  ),

  // anima_projection — a figure leaning toward a tethered luminous orb.
  captivation: (c: MotifColors) => (
    <>
      {figure(30, 34, 82, 8, c, c.primary, true)}
      <Line x1="40" y1="44" x2="64" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="2 3" {...cap} />
      <Circle cx="72" cy="44" r="9" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Path d={sparkle(72, 44, 3.4)} fill={c.warm} stroke="none" />
    </>
  ),

  // animus_projection — a speech burst with a hollow echo behind it.
  'borrowed-voice': (c: MotifColors) => (
    <>
      <Path d="M30 30 C30 22 58 22 58 32 C58 40 48 43 48 43 L42 49 L44 42 C34 41 30 37 30 30 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M42 38 C42 30 70 30 70 40 C70 48 60 51 60 51 L54 57 L56 50 C46 49 42 45 42 38 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 38 L58 38 M50 43 L62 43" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  // persona — a mask lifted slightly off a face, a warm gap between.
  'mask-gap': (c: MotifColors) => (
    <>
      <Path d="M40 22 C52 19 60 26 60 40 C60 56 52 66 46 66 C40 66 32 56 32 40 C32 30 34 24 40 22 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 26 C68 23 76 30 76 44 C76 60 68 70 62 70 C56 70 48 60 48 44 C48 34 50 28 56 26 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 40 C58 38 62 38 64 40 M58 52 C61 55 67 55 70 52" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="50" cy="46" r="2.4" fill={c.warm} stroke="none" />
    </>
  ),

  // golden_shadow — a figure reaching to a bright star, a faint line back to chest.
  'admire-star': (c: MotifColors) => (
    <>
      {figure(34, 40, 84, 8, c, c.primary, true)}
      <Line x1="40" y1="50" x2="66" y2="34" stroke={c.secondary} strokeWidth={c.sw * 0.7} strokeDasharray="2 3" {...cap} />
      <Path d={sparkle(72, 30, 8)} fill={c.warm} stroke="none" />
      <Circle cx="34" cy="52" r="1.8" fill={c.warm} stroke="none" />
    </>
  ),

  // projection_recall — a face + its mirrored twin across a seam, a hook on the seam.
  'reflected-other': (c: MotifColors) => (
    <>
      <Line x1="50" y1="16" x2="50" y2="84" stroke={c.secondary} strokeWidth={c.sw} strokeDasharray="1 5" {...cap} />
      <Path d="M44 24 C30 26 24 44 30 60 C34 72 42 78 44 78" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 24 C70 26 76 44 70 60 C66 72 58 78 56 78" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 46 C50 52 55 52 55 47" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  // unlived_expression — a curled shoot breaking soil, a leaf opening, warm tip.
  'unfurling-sprout': (c: MotifColors) => (
    <>
      <Line x1="20" y1="76" x2="80" y2="76" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 76 C50 58 48 46 52 34 C53 30 56 28 58 30" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 56 C40 54 34 46 36 38 C46 39 52 47 50 56 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="58" cy="30" r="2.6" fill={c.warm} stroke="none" />
    </>
  ),

  // nightmare — a dark cloud whose lower edge is being re-drawn into a gentler curve.
  'reshaped-dream': (c: MotifColors) => (
    <>
      <Path d="M28 40 C26 30 44 26 48 34 C58 28 72 36 68 46 C76 48 74 60 64 58 L34 58 C26 58 26 46 28 40 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 64 C44 58 56 58 66 64" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Path d="M62 60 C68 60 70 64 68 70" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  // reclaim_ritual — open upturned hands letting two birds lift, a warm one leading.
  'release-birds': (c: MotifColors) => (
    <>
      <Path d="M30 70 C36 78 64 78 70 70" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M30 70 C28 64 30 60 34 60 M70 70 C72 64 70 60 66 60" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 46 C44 42 48 42 50 46 C52 42 56 42 60 46" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M48 30 C52 26 56 26 58 30 C60 26 64 26 68 30" fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
    </>
  ),

  // boundaries — a firm line a hand draws, a small flame guarding one end.
  'drawn-line': (c: MotifColors) => (
    <>
      <Line x1="18" y1="60" x2="74" y2="60" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M74 60 C70 52 73 46 72 40 C75 44 77 48 76 53 C79 50 80 45 78 40 C82 46 82 56 74 60 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw * 0.85} {...cap} />
      <Path d="M22 60 C26 64 32 64 36 60" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M26 58 L26 66 M32 57 L32 66" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  // urge_surf — a single wave to a crest with a tiny rider at the top.
  'cresting-wave': (c: MotifColors) => (
    <>
      <Path d="M16 76 C30 76 36 40 56 40 C72 40 72 58 84 58" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M56 40 C64 40 70 46 72 54 C64 52 58 54 52 58 C52 50 53 44 56 40 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.85} {...cap} />
      <Circle cx="56" cy="34" r="3.4" fill={c.warm} stroke="none" />
    </>
  ),

  // self_compassion — two cupped hands turning inward to a warm heart.
  'turn-toward': (c: MotifColors) => (
    <>
      <Path d="M22 50 C30 44 40 46 46 56 C40 62 28 62 22 56 C20 54 20 52 22 50 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M78 50 C70 44 60 46 54 56 C60 62 72 62 78 56 C80 54 80 52 78 50 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 40 C46 34 38 35 38 42 C38 48 50 56 50 56 C50 56 62 48 62 42 C62 35 54 34 50 40 Z" fill={c.warm} stroke="none" />
    </>
  ),

  // archetypal_encounter — a still standing stone half-sunk in ground, steady warm core.
  'deep-knowing': (c: MotifColors) => (
    <>
      <Line x1="18" y1="70" x2="82" y2="70" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M38 70 C36 44 40 22 50 20 C60 22 64 44 62 70 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="3.4" fill={c.warm} stroke="none" />
    </>
  ),

  // inner_child — a tall figure crouching level with a small one, a warm link.
  'crouch-to-child': (c: MotifColors) => (
    <>
      <Circle cx="34" cy="34" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M22 76 C22 56 34 50 40 56 C46 62 44 70 46 76 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="66" cy="50" r="6" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M58 76 C58 64 74 64 74 76 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="52" cy="58" r="2.4" fill={c.warm} stroke="none" />
    </>
  ),

  // after_meeting — a foot stepping over a low sill carrying a small warm bundle.
  'carry-step': (c: MotifColors) => (
    <>
      <Line x1="50" y1="74" x2="86" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="60" x2="50" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M20 78 C24 60 34 52 44 50 L52 48 C54 54 50 60 42 64 C34 68 30 74 30 78 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="40" cy="40" r="7" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="40" cy="40" r="2.2" fill={c.warm} stroke="none" />
    </>
  ),

  // grief_letting_go — an open hand releasing one leaf, a budding branch above.
  'open-hand-leaf': (c: MotifColors) => (
    <>
      <Path d="M24 36 C40 34 60 34 76 36" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M40 36 C40 30 44 28 46 30 M56 36 C56 30 60 28 62 30" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M28 74 C34 70 42 70 48 74" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M32 72 L32 80 M38 71 L38 80 M44 72 L44 80" fill="none" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M62 50 C54 50 50 58 54 66 C62 66 66 58 62 50 Z" fill={c.warm} stroke={c.primary} strokeWidth={c.sw * 0.85} {...cap} />
    </>
  ),

  // values_vocation — a compass needle inside a chest, pointing to a warm star.
  'inner-heading': (c: MotifColors) => (
    <>
      {figure(44, 30, 84, 9, c, c.primary, true)}
      <Path d="M44 58 L52 50 L48 60 L40 64 Z" fill={c.secondary} stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d={sparkle(76, 36, 6)} fill={c.warm} stroke="none" />
      <Line x1="50" y1="54" x2="70" y2="40" stroke={c.secondary} strokeWidth={c.sw * 0.6} strokeDasharray="2 3" {...cap} />
    </>
  ),

  // defusion — a snapping fish-hook, a thought-cloud drifting free.
  'unhook-thought': (c: MotifColors) => (
    <>
      <Path d="M40 22 L40 50 C40 60 52 60 52 50" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="34" y1="26" x2="46" y2="26" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 40 L48 36 M48 40 L44 36" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M54 64 C52 56 66 54 70 62 C80 60 82 72 72 74 L60 74 C54 74 54 68 54 64 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
    </>
  ),
} satisfies Record<string, Motif>;
