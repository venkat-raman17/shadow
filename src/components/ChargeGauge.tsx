import React, { useId } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { feltSenseBand } from '@/lib/feltSense';

const GAUGE_W = 132;
const GAUGE_H = 10;

/**
 * The 0–10 charge as a felt-intensity gauge — a soft gradient *level*, not a row
 * of pips, and never a number on screen. Optionally pairs with the felt-sense
 * word ("a real charge"). The value stays a number everywhere else; this only
 * renders it, so reading an entry's intensity never feels like a star rating.
 */
export function ChargeGauge({
  charge,
  max = 10,
  word = true,
  width = GAUGE_W,
}: {
  charge: number;
  max?: number;
  word?: boolean;
  width?: number;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  // useId is colon-laden and not selector-safe; sanitize for the url(#…) ref.
  const gid = `cg-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const clamped = Math.max(0, Math.min(max, charge));
  const fillW = Math.round((clamped / max) * width);
  const band = feltSenseBand(charge);

  return (
    <View style={styles.wrap} accessibilityLabel={`How present it felt: ${band}`}>
      <Svg width={width} height={GAUGE_H}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.accentMuted} />
            <Stop offset="1" stopColor={colors.accentWarm} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={GAUGE_H} rx={GAUGE_H / 2} fill={colors.border} />
        {fillW > 0 ? (
          <Rect x={0} y={0} width={fillW} height={GAUGE_H} rx={GAUGE_H / 2} fill={`url(#${gid})`} />
        ) : null}
      </Svg>
      {word ? <Text style={styles.word}>{band}</Text> : null}
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    wrap: { gap: Spacing.one, alignItems: 'flex-start' },
    word: { ...typography.caption, color: colors.textSecondary, fontStyle: 'italic' },
  });
