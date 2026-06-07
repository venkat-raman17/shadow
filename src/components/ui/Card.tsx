import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, Spacing, radii } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  /** When provided the card becomes pressable with subtle feedback. */
  onPress?: () => void;
  /** Dim the card (e.g. closed experiments). */
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The surface + radius + border container used everywhere (practice cards,
 * part cards, entry rows, the carry-forward CTA). Optionally pressable.
 */
export function Card({ children, onPress, muted, style }: Props) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
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

const styles = StyleSheet.create({
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
