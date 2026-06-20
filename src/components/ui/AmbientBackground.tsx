import React, { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '@/constants/theme-context';

interface Props {
  /** Scales the wash opacity (e.g. a touch warmer at night). Default 1. */
  intensity?: number;
  /** Where the light pools: from the top of the page, or its centre. */
  placement?: 'top' | 'center';
}

/**
 * A barely-there warm vignette — "lamplight on the page" — sitting behind the
 * signature screens (Home, a flow's close). Pure SVG (no native module, no
 * animation), absolutely filled and non-interactive, so it's safe under
 * Reduce-Motion and costs nothing to scroll over. The wash colour is a per-theme
 * `ambientWarm` token; keep it near-imperceptible.
 */
export function AmbientBackground({ intensity = 1, placement = 'top' }: Props) {
  const { colors } = useTheme();
  const gid = useId().replace(/:/g, '');
  const op = Math.max(0, Math.min(1, intensity));
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient
            id={gid}
            cx="50%"
            cy={placement === 'center' ? '45%' : '0%'}
            r="120%">
            <Stop offset="0" stopColor={colors.ambientWarm} stopOpacity={op} />
            <Stop offset="1" stopColor={colors.ambientWarm} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gid})`} />
      </Svg>
    </View>
  );
}
