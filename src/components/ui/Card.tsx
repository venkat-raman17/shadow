import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';

interface Props {
  children: React.ReactNode;
  /** When provided the card becomes pressable with subtle feedback. */
  onPress?: () => void;
  /** Dim the card (e.g. closed experiments). */
  muted?: boolean;
  /** Screen-reader label for a pressable card; falls back to its text content. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The surface + radius + border container used everywhere (practice cards,
 * part cards, entry rows, the carry-forward CTA). Optionally pressable.
 */
export function Card({ children, onPress, muted, accessibilityLabel, style }: Props) {
  const styles = useThemedStyles(makeStyles);
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.card,
          muted && styles.muted,
          pressed && styles.pressed,
          style,
        ]}>
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, muted && styles.muted, style]}>{children}</View>;
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: colors.border,
    gap: Spacing.one,
  },
  muted: { opacity: 0.55 },
  pressed: { opacity: 0.7, borderColor: colors.borderStrong },
});
