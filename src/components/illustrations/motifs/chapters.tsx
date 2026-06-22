import { Circle, Line, Path } from 'react-native-svg';
import { cap, figure, sparkle, type Motif, type MotifColors } from './kit';

// Chapter-specific motifs — one unique key per chapter term (no sharing with
// practices, paths, entryways, or other chapters). Strict-uniqueness invariant
// is enforced by scripts/check-motifs.ts.
export const chapterMotifs = {

  // ── foundations: what-the-shadow-is ──────────────────────────────────────────
  // Standing figure, long cast shadow trailing to the right.
  'shadow-cast': (c: MotifColors) => (
    <>
      <Path d="M40 80 C56 78 76 80 88 87 C80 89 66 86 54 84 Z"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="14" y1="80" x2="86" y2="80" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      {figure(34, 24, 80, 9, c, c.primary, true)}
    </>
  ),

  // ── others: projection ────────────────────────────────────────────────────────
  // Face profile with a hook-barb at the cheek — the quality that snags us.
  'face-maddens': (c: MotifColors) => (
    <>
      <Path d="M44 22 C30 28 22 44 26 60 C30 76 44 84 56 80 C68 76 72 62 68 46 C64 30 56 18 44 22 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M58 44 C64 40 72 42 70 50" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="70" cy="52" r="3" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  // ── ways-of-working: expressive-writing ──────────────────────────────────────
  // Pen in continuous motion, warm trail, no full stop — writing that doesn't stop.
  'unstopped-pen': (c: MotifColors) => (
    <>
      <Path d="M22 76 C32 62 46 52 60 44 C70 38 78 32 82 22"
        fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M76 14 L84 22 L74 26 Z" fill={c.primary} stroke={c.primary} strokeWidth={c.sw * 0.5} {...cap} />
      <Path d="M76 14 C78 18 80 22 76 26 C74 22 72 16 76 14 Z" fill={c.warm} stroke="none" />
      <Circle cx="22" cy="78" r="2.5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── ways-of-working: the-empty-chair ─────────────────────────────────────────
  // Figure speaking toward an empty chair, warm speech-arc crossing the gap.
  'say-it-to-chair': (c: MotifColors) => (
    <>
      {figure(26, 26, 80, 8, c, c.primary, true)}
      <Line x1="58" y1="28" x2="58" y2="56" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="58" y1="56" x2="80" y2="56" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="58" y1="56" x2="52" y2="80" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="80" y1="56" x2="76" y2="80" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M36 42 C44 32 52 34 56 42" fill="none" stroke={c.warm} strokeWidth={c.sw * 0.8}
        strokeDasharray="2 3" {...cap} />
    </>
  ),

  // ── steady: titration-and-the-window ─────────────────────────────────────────
  // A dropper releasing one drop into calm water — small, unhurried increments.
  'little-at-a-time': (c: MotifColors) => (
    <>
      <Path d="M42 18 L58 18 L62 38 L50 44 L38 38 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="44" x2="50" y2="60" stroke={c.secondary} strokeWidth={c.sw * 0.7}
        strokeDasharray="1 4" {...cap} />
      <Circle cx="50" cy="68" r="5.5" fill={c.warm} stroke="none" />
      <Path d="M16 82 C28 78 40 82 50 80 C60 78 72 82 84 80"
        fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  // ── steady: when-something-spikes ────────────────────────────────────────────
  // Gauge needle dropping from the danger (warm) zone back to calm.
  'dial-drop': (c: MotifColors) => (
    <>
      <Path d="M18 70 A36 36 0 0 1 82 70" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M60 34 A36 36 0 0 1 82 70" fill="none" stroke={c.warm} strokeWidth={c.sw * 1.2} {...cap} />
      <Circle cx="50" cy="70" r="4" fill={c.primary} stroke="none" />
      <Line x1="50" y1="70" x2="32" y2="44" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="70" x2="68" y2="38" stroke={c.secondary} strokeWidth={c.sw * 0.6}
        strokeDasharray="2 3" {...cap} />
    </>
  ),

  // ── dreams-alchemy: remembering-dreams ───────────────────────────────────────
  // Notebook and pen on a bedside surface, crescent overhead.
  'bedside-note': (c: MotifColors) => (
    <>
      <Path d="M62 18 C58 14 50 14 46 20 C42 28 44 38 50 40 C42 40 30 34 30 24 C30 14 38 8 48 10 C56 10 64 14 62 18 Z"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M22 52 L22 80 L66 80 L66 52 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="28" y1="62" x2="60" y2="62" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Line x1="28" y1="70" x2="52" y2="70" stroke={c.warm} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M70 56 C74 54 78 56 76 62 C76 66 72 68 70 64"
        fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="70" cy="66" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  // ── dreams-alchemy: dreams-as-compensation ───────────────────────────────────
  // A balance scale: warm day-disc on one side, crescent night on the other.
  'night-counterweight': (c: MotifColors) => (
    <>
      <Line x1="50" y1="18" x2="50" y2="32" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="24" y1="32" x2="76" y2="32" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="24" y1="32" x2="24" y2="48" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="76" y1="32" x2="76" y2="50" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Circle cx="24" cy="60" r="12" fill={c.warm} stroke={c.primary} strokeWidth={c.sw * 0.8} />
      <Path d="M70 50 C74 48 82 50 80 60 C78 70 70 72 66 64 C72 64 76 60 74 54 C72 50 70 50 70 50 Z"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  // ── shame: self-compassion ────────────────────────────────────────────────────
  // Two cupped hands, a warm heart-glow between them — warmth comes first.
  'warmth-first': (c: MotifColors) => (
    <>
      <Path d="M28 58 C22 50 22 40 28 34 C34 28 42 30 46 36"
        fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M72 58 C78 50 78 40 72 34 C66 28 58 30 54 36"
        fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M28 58 C36 68 64 68 72 58 C60 76 40 76 28 58 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="46" r="8" fill={c.fill} stroke="none" />
      <Circle cx="50" cy="46" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  // ── figures: active-imagination ───────────────────────────────────────────────
  // A page split by a centre rule — two voices, each with its own ink.
  'two-voices-page': (c: MotifColors) => (
    <>
      <Path d="M22 16 L78 16 L78 84 L22 84 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="16" x2="50" y2="84" stroke={c.secondary} strokeWidth={c.sw * 0.6}
        strokeDasharray="1 4" {...cap} />
      <Line x1="28" y1="32" x2="46" y2="32" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="28" y1="44" x2="46" y2="44" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="28" y1="56" x2="44" y2="56" stroke={c.primary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="54" y1="32" x2="72" y2="32" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="54" y1="44" x2="72" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="54" y1="56" x2="68" y2="56" stroke={c.warm} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  // ── figures: dreams-and-nightmares ───────────────────────────────────────────
  // Crescent over a dream-frame being gently redrawn — the night edits the day.
  'night-edit': (c: MotifColors) => (
    <>
      <Path d="M44 24 C36 28 28 38 28 50 C28 64 38 74 50 74 C36 72 22 62 22 48 C22 34 32 22 46 20 C48 20 46 22 44 24 Z"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M48 38 L48 70 L80 70 L80 38 Z" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M80 42 C84 38 86 30 80 26"
        fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M80 58 C86 54 90 46 84 42"
        fill="none" stroke={c.warm} strokeWidth={c.sw} {...cap} />
      <Circle cx="84" cy="44" r="2.5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── living-it: integration ────────────────────────────────────────────────────
  // Small figure on a shore, facing an even and open sea.
  'live-beside-sea': (c: MotifColors) => (
    <>
      {figure(30, 32, 68, 8, c, c.primary, true)}
      <Line x1="14" y1="68" x2="86" y2="68" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Path d="M14 76 C28 72 44 76 60 74 C72 72 80 74 86 76"
        fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M14 84 C30 80 48 84 66 82 C74 80 82 82 86 84"
        fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.5} {...cap} />
    </>
  ),

  // ── using: a-walk-through-a-session ──────────────────────────────────────────
  // Footprints before and after a low sill — a small, complete crossing.
  'small-crossing': (c: MotifColors) => (
    <>
      <Line x1="14" y1="72" x2="86" y2="72" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Path d="M38 72 L42 58 L60 58 L64 72" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="24" cy="76" r="3.5" fill={c.secondary} stroke="none" />
      <Circle cx="32" cy="65" r="3.5" fill={c.secondary} stroke="none" />
      <Circle cx="74" cy="76" r="3.5" fill={c.warm} stroke="none" />
      <Circle cx="80" cy="65" r="3.5" fill={c.primary} stroke="none" />
    </>
  ),

  // ── persona-and-world: the-mask-at-work ───────────────────────────────────────
  // Mask on a handle, held aside — worn, but at a distance from the face.
  'held-mask': (c: MotifColors) => (
    <>
      <Path d="M38 22 C24 28 18 46 24 62 C30 78 48 84 60 76 C72 68 72 48 64 34 C58 22 50 18 38 22 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M34 40 C38 36 46 36 50 40" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M50 46 C54 42 60 42 64 46" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="62" y1="72" x2="74" y2="88" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Circle cx="74" cy="88" r="2.5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── the-body: the-talking-body ────────────────────────────────────────────────
  // Torso with a speech-mark rising from the gut — the body narrates.
  'second-narrator': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="28" r="10" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Path d="M36 38 C32 50 32 62 36 72 C40 82 60 82 64 72 C68 62 68 50 64 38 C60 32 40 32 36 38 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M44 62 C42 56 48 52 54 56 C58 60 56 68 50 70 C48 70 46 68 46 64 L46 72"
        fill="none" stroke={c.warm} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="46" cy="74" r="2" fill={c.warm} stroke="none" />
    </>
  ),

  // ── spirit-and-meaning: the-numinous ─────────────────────────────────────────
  // Tiny figure dwarfed by a vast, soft arc — dwarfed by something larger.
  'hush-of-awe': (c: MotifColors) => (
    <>
      <Path d="M14 64 A50 50 0 0 1 86 64" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M24 62 A38 38 0 0 1 76 62" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.4}
        strokeDasharray="1 6" {...cap} />
      {figure(50, 74, 88, 5, c, c.primary, true)}
    </>
  ),

  // ── spirit-and-meaning: the-symbolic-life ────────────────────────────────────
  // A plain cup with a soft radiant ring — the ordinary, seen as part of something larger.
  'seen-ordinary': (c: MotifColors) => (
    <>
      <Path d="M34 36 L28 78 L72 78 L66 36 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M66 44 C72 42 78 48 76 56 C74 62 68 64 66 60"
        fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="22" y1="82" x2="78" y2="82" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="50" cy="58" r="14" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.4}
        strokeDasharray="1 5" {...cap} />
      <Circle cx="50" cy="58" r="22" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.3}
        strokeDasharray="1 7" {...cap} />
    </>
  ),

  // ── thresholds-change: the-threshold ─────────────────────────────────────────
  // Doorway with a hatched liminal band; figure mid-step in the between-space.
  'liminal-band': (c: MotifColors) => (
    <>
      <Line x1="22" y1="18" x2="22" y2="82" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="78" y1="18" x2="78" y2="82" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="22" y1="18" x2="78" y2="18" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="18" x2="38" y2="82" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="46" y1="18" x2="46" y2="82" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="54" y1="18" x2="54" y2="82" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="62" y1="18" x2="62" y2="82" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      {figure(50, 30, 80, 8, c, c.primary, true)}
    </>
  ),

  // ── thresholds-change: rites-of-passage ──────────────────────────────────────
  // Three stages on a line: leave (hollow circle), cross (arch), arrive (warm dot).
  'leave-cross-arrive': (c: MotifColors) => (
    <>
      <Line x1="14" y1="68" x2="86" y2="68" stroke={c.secondary} strokeWidth={c.sw * 0.5} {...cap} />
      <Circle cx="22" cy="62" r="8" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Path d="M30 62 C36 32 64 32 70 62" fill="none" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="78" cy="62" r="8" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} />
      <Circle cx="78" cy="62" r="3.5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── using: finding-your-way-around ───────────────────────────────────────────
  // 2×2 floor plan — four rooms, one warm room to orient from.
  'four-rooms': (c: MotifColors) => (
    <>
      <Path d="M16 18 L84 18 L84 84 L16 84 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="50" y1="18" x2="50" y2="84" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="16" y1="51" x2="84" y2="51" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="67" cy="68" r="6" fill={c.warm} stroke="none" />
    </>
  ),

  // ── using: what-these-practices-are ──────────────────────────────────────────
  // Three arched doorways into one room — the middle one is lit.
  'many-doors': (c: MotifColors) => (
    <>
      <Line x1="12" y1="80" x2="88" y2="80" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Path d="M14 80 L14 56 A10 10 0 0 1 34 56 L34 80"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M38 80 L38 52 A12 12 0 0 1 62 52 L62 80"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M66 80 L66 56 A10 10 0 0 1 86 56 L86 80"
        fill={c.fill} stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="50" cy="64" r="5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── using: how-to-use-partwise ────────────────────────────────────────────────
  // A single lit lamp — the quiet, unhurried hour.
  'quiet-hour': (c: MotifColors) => (
    <>
      <Path d="M34 42 C34 26 66 26 66 42 C66 56 60 66 54 68 L46 68 C40 66 34 56 34 42 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="40" r="5" fill={c.warm} stroke="none" />
      <Line x1="46" y1="68" x2="46" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="54" y1="68" x2="54" y2="74" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="38" y1="74" x2="62" y2="74" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="34" y1="78" x2="66" y2="78" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
    </>
  ),

  // ── using: ways-through ───────────────────────────────────────────────────────
  // Several worn paths diverging from one point — one warm, one chosen.
  'trail-fork': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="78" r="4.5" fill={c.primary} stroke="none" />
      <Path d="M50 74 C48 62 40 50 28 34" fill="none" stroke={c.secondary} strokeWidth={c.sw}
        strokeDasharray="3 5" {...cap} />
      <Path d="M50 74 C50 62 50 50 50 30" fill="none" stroke={c.secondary} strokeWidth={c.sw}
        strokeDasharray="3 5" {...cap} />
      <Path d="M50 74 C52 62 62 50 76 34" fill="none" stroke={c.warm} strokeWidth={c.sw}
        strokeDasharray="3 5" {...cap} />
      <Circle cx="76" cy="30" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  // ── using: what-partwise-isnt ─────────────────────────────────────────────────
  // A ladder with a gentle warm loop crossing over it — not this kind of climbing.
  'not-a-ladder': (c: MotifColors) => (
    <>
      <Line x1="34" y1="16" x2="34" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="66" y1="16" x2="66" y2="82" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Line x1="34" y1="32" x2="66" y2="32" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="34" y1="50" x2="66" y2="50" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="34" y1="68" x2="66" y2="68" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Path d="M20 50 C20 24 80 24 80 50 C80 72 20 72 20 50 Z"
        fill="none" stroke={c.warm} strokeWidth={c.sw * 1.2} {...cap} />
    </>
  ),

  // ── second-half: the-midlife-passage ─────────────────────────────────────────
  // Sun at the apex of its arc, rays beginning to turn inward.
  'sun-arc-turn': (c: MotifColors) => (
    <>
      <Path d="M16 72 A46 46 0 0 1 84 72" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.6} {...cap} />
      <Circle cx="50" cy="24" r="11" fill={c.fill} stroke={c.warm} strokeWidth={c.sw} />
      <Circle cx="50" cy="24" r="5" fill={c.warm} stroke="none" />
      <Line x1="50" y1="10" x2="50" y2="6" stroke={c.warm} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="64" y1="14" x2="66" y2="10" stroke={c.warm} strokeWidth={c.sw * 0.7} {...cap} />
      <Line x1="36" y1="14" x2="34" y2="10" stroke={c.warm} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M62 28 C66 36 62 46 56 48 C52 50 50 40 50 24"
        fill="none" stroke={c.primary} strokeWidth={c.sw * 0.8} {...cap} />
    </>
  ),

  // ── second-half: meaning-and-vocation ────────────────────────────────────────
  // An ear leaning toward a distant warm call-mark on a dashed line.
  'vocation-pull': (c: MotifColors) => (
    <>
      <Path d="M34 22 C22 30 18 50 24 64 C30 78 46 80 54 70 C62 60 60 44 54 34 C48 24 40 18 34 22 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M38 38 C34 48 38 60 46 62" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="54" y1="48" x2="80" y2="44" stroke={c.secondary} strokeWidth={c.sw * 0.5}
        strokeDasharray="2 4" {...cap} />
      <Circle cx="84" cy="42" r="6" fill={c.fill} stroke={c.warm} strokeWidth={c.sw * 0.8} />
      <Circle cx="84" cy="42" r="2.5" fill={c.warm} stroke="none" />
    </>
  ),

  // ── going-deeper: complexes ───────────────────────────────────────────────────
  // A figure outline with a jagged shard splitting off — the complex grabs the wheel.
  'splinter-psyche': (c: MotifColors) => (
    <>
      {figure(40, 22, 84, 10, c, c.secondary, false)}
      <Path d="M52 36 L66 22 L76 40 L64 46 L72 60 L54 50 Z"
        fill={c.fill} stroke={c.warm} strokeWidth={c.sw * 0.9} {...cap} />
    </>
  ),

  // ── family-relationships: the-family-shadow ───────────────────────────────────
  // Three nested house outlines — what one generation can't hold, the next carries.
  'inherited-weather': (c: MotifColors) => (
    <>
      <Path d="M50 60 L20 80 L80 80 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="28" y1="80" x2="28" y2="90" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Line x1="72" y1="80" x2="72" y2="90" stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 46 L26 66 L74 66 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw} {...cap} />
      <Path d="M50 32 L32 50 L68 50 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M14 28 C22 20 36 20 44 28 C50 34 50 44 50 46"
        fill="none" stroke={c.warm} strokeWidth={c.sw * 0.7} strokeDasharray="2 3" {...cap} />
    </>
  ),

  // ── family-relationships: the-unlived-life-of-the-parents ────────────────────
  // A larger figure passing a glowing bundle to a smaller one — the handed dream.
  'handed-dream': (c: MotifColors) => (
    <>
      {figure(28, 20, 82, 11, c, c.secondary, false)}
      {figure(72, 44, 82, 7, c, c.primary, true)}
      <Circle cx="52" cy="56" r="9" fill={c.fill} stroke={c.warm} strokeWidth={c.sw * 0.9} />
      <Circle cx="52" cy="56" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  // ── belonging-loneliness: the-need-to-belong ──────────────────────────────────
  // Small figure at the centre, ringed by warm care-dots.
  'ring-of-care': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="52" r="28" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.5}
        strokeDasharray="1 7" {...cap} />
      {figure(50, 36, 68, 7, c, c.primary, true)}
      <Circle cx="50" cy="24" r="4" fill={c.warm} stroke={c.secondary} strokeWidth={c.sw * 0.5} />
      <Circle cx="74" cy="38" r="3.5" fill={c.secondary} stroke="none" />
      <Circle cx="74" cy="66" r="3.5" fill={c.secondary} stroke="none" />
      <Circle cx="50" cy="80" r="3.5" fill={c.secondary} stroke="none" />
      <Circle cx="26" cy="66" r="3.5" fill={c.secondary} stroke="none" />
      <Circle cx="26" cy="38" r="3.5" fill={c.secondary} stroke="none" />
    </>
  ),

  // ── inner-cast: the-self ──────────────────────────────────────────────────────
  // House outline, one warmly lit room — the lit room inside the whole house.
  'whole-house': (c: MotifColors) => (
    <>
      <Path d="M50 14 L14 44 L86 44 Z" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M18 44 L18 86 L82 86 L82 44" fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Path d="M28 52 L28 68 L46 68 L46 52 Z" fill={c.warm} stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Circle cx="37" cy="60" r="5" fill={c.warm} stroke="none" />
      <Path d="M54 52 L54 68 L72 68 L72 52 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
      <Path d="M38 68 L38 86 L62 86 L62 68 Z" fill="none" stroke={c.secondary} strokeWidth={c.sw * 0.7} {...cap} />
    </>
  ),

  // ── everyday-shadow: the-projection-inventory ─────────────────────────────────
  // A ruled list, one item underlined warm — the allergy you recognise.
  'allergy-list': (c: MotifColors) => (
    <>
      <Line x1="26" y1="26" x2="74" y2="26" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="26" y1="38" x2="74" y2="38" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="26" y1="50" x2="74" y2="50" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="26" y1="62" x2="74" y2="62" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="26" y1="74" x2="74" y2="74" stroke={c.secondary} strokeWidth={c.sw * 0.4} {...cap} />
      <Line x1="30" y1="32" x2="70" y2="32" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="30" y1="44" x2="70" y2="44" stroke={c.warm} strokeWidth={c.sw * 1.1} {...cap} />
      <Line x1="30" y1="56" x2="66" y2="56" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Line x1="30" y1="68" x2="60" y2="68" stroke={c.secondary} strokeWidth={c.sw * 0.8} {...cap} />
      <Circle cx="76" cy="44" r="4" fill={c.warm} stroke="none" />
    </>
  ),

  // ── going-deeper: individuation ──────────────────────────────────────────────
  // Dashed arc — almost a full circle — around a warm center: circumambulation.
  'slow-circling': (c: MotifColors) => (
    <>
      <Circle cx="50" cy="50" r="3.5" fill={c.warm} stroke="none" />
      <Path
        d="M50 18 A32 32 0 1 1 22 34"
        fill="none" stroke={c.primary} strokeWidth={c.sw}
        strokeDasharray="6 4"
        {...cap}
      />
    </>
  ),

  // ── feelings-one-by-one: envy ─────────────────────────────────────────────────
  // A wide eye with a small star caught in the pupil — what you can't stop seeing.
  'eye-caught': (c: MotifColors) => (
    <>
      <Path d="M14 50 C22 28 40 20 50 20 C60 20 78 28 86 50 C78 72 60 80 50 80 C40 80 22 72 14 50 Z"
        fill={c.fill} stroke={c.primary} strokeWidth={c.sw} {...cap} />
      <Circle cx="50" cy="50" r="14" fill={c.fill} stroke={c.secondary} strokeWidth={c.sw} />
      <Circle cx="50" cy="50" r="7" fill={c.secondary} stroke="none" />
      <Path d={sparkle(50, 50, 4)} fill={c.warm} stroke="none" />
    </>
  ),

} satisfies Record<string, Motif>;
