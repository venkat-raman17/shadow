import React from 'react';
import type { ColorValue } from 'react-native';
import Svg from 'react-native-svg';

import { useTheme } from '@/constants/theme-context';
import type { Palette } from '@/constants/theme';
import { MOTIFS, type IllustrationKey, type MotifColors } from './motifs';

/**
 * How an illustration is coloured against the page:
 *  - `line` — quiet stroke only, no fills (chapter TOC icons, inline figures).
 *  - `soft` — accent stroke with soft translucent fills (reading-page headers).
 *  - `duo` — two-tone (accent + warm) for the richer book covers.
 *  - `ui`  — flat monochrome stroke in a single colour, for functional icons
 *            (tab bar, buttons). Pair with `color` to drive an active/inactive
 *            tint; defaults to `textSecondary` when no `color` is given.
 */
export type IllustrationTone = 'line' | 'soft' | 'duo' | 'ui';

interface Props {
  name: IllustrationKey;
  /** Square side in px (ignored if width/height are given). */
  size?: number;
  width?: number;
  height?: number;
  tone?: IllustrationTone;
  /**
   * Monochrome override for functional icons: every slot draws in this colour
   * with no fill. Takes precedence over `tone` (passing `color` implies `ui`),
   * so a tab/button can hand its active/inactive tint straight through. Accepts
   * the navigator's `ColorValue` as well as a plain hex string.
   */
  color?: ColorValue;
  /**
   * Clamp the auto stroke so tiny glyphs (13–16px) don't bloat. The base stroke
   * targets ~1.6px on-screen; at small sizes that maps to a very thick viewBox
   * stroke, so UI call sites cap it (≈8–9).
   */
  maxStroke?: number;
  /** Decorative by default — hidden from screen readers. Set false + label otherwise. */
  decorative?: boolean;
  label?: string;
}

function tonePalette(tone: IllustrationTone, c: Palette, sw: number, color?: ColorValue): MotifColors {
  // `color` (or tone 'ui') → flat monochrome: one colour, no fill. Wins over tone.
  if (color || tone === 'ui') {
    // SVG accepts ColorValue; MotifColors is nominally string at the boundary.
    const k = (color ?? c.textSecondary) as string;
    return { primary: k, secondary: k, fill: 'none', warm: k, sw };
  }
  switch (tone) {
    case 'soft':
      return { primary: c.accent, secondary: c.accentMuted, fill: c.accentSoft, warm: c.accentWarm, sw };
    case 'duo':
      return { primary: c.accent, secondary: c.accentWarm, fill: c.accentSoft, warm: c.accentWarm, sw };
    case 'line':
    default:
      return { primary: c.textSecondary, secondary: c.accentMuted, fill: 'none', warm: c.accent, sw };
  }
}

/**
 * A themed line-art motif drawn from the {@link MOTIFS} registry. Colours follow
 * the live palette so every drawing reads on dark/light/sepia, and the stroke is
 * sized so its on-screen weight stays even across sizes (a chapter icon and a
 * cover read with the same hand). Decorative by default.
 */
function IllustrationBase({
  name,
  size = 48,
  width,
  height,
  tone = 'line',
  color,
  maxStroke,
  decorative = true,
  label,
}: Props) {
  const { colors } = useTheme();
  const motif = MOTIFS[name];
  if (!motif) return null;

  const w = width ?? size;
  const h = height ?? size;
  // Keep the rendered line ~1.6px regardless of draw size, but clamp so tiny
  // glyphs don't render as a slab.
  const raw = (1.6 / Math.max(w, h)) * 100;
  const sw = Number(Math.min(raw, maxStroke ?? Infinity).toFixed(2));
  // Use aria-*/role rather than RN-only a11y props: react-native-svg forwards
  // unknown props to the DOM <svg> on web, and the RN camelCase ones warn there.
  // RN maps these to native accessibility; the web <svg> uses them directly.
  const a11y: Record<string, unknown> = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label };

  return (
    <Svg width={w} height={h} viewBox="0 0 100 100" {...a11y}>
      {motif(tonePalette(tone, colors, sw, color))}
    </Svg>
  );
}

export const Illustration = React.memo(IllustrationBase);
