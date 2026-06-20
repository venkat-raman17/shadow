import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { Spacing, radii, makeElevation, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { usePressScale } from '@/hooks/usePressScale';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  children: React.ReactNode;
  /** When provided the card becomes pressable with a warm press-depress. */
  onPress?: () => void;
  /** Dim the card (e.g. closed experiments). */
  muted?: boolean;
  /** Soft lamplit depth. Defaults to 'subtle' so cards lift off the page. */
  elevation?: 'none' | 'subtle' | 'raised';
  /** Screen-reader label for a pressable card; falls back to its text content. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The surface + radius + border container used everywhere (practice cards,
 * part cards, entry rows, the carry-forward CTA). Optionally pressable, and
 * lifted off the page with a soft warm shadow by default.
 */
export function Card({
  children,
  onPress,
  muted,
  elevation = 'subtle',
  accessibilityLabel,
  style,
}: Props) {
  const styles = useThemedStyles(makeStyles);
  const press = usePressScale();
  const depth =
    elevation === 'raised' ? styles.raised : elevation === 'subtle' ? styles.subtle : null;

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={[styles.card, depth, muted && styles.muted, press.animatedStyle, style]}>
        {children}
      </AnimatedPressable>
    );
  }

  return <View style={[styles.card, depth, muted && styles.muted, style]}>{children}</View>;
}

const makeStyles = ({ colors }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: Spacing.three,
      borderWidth: 1,
      borderColor: colors.border,
      gap: Spacing.one,
    },
    subtle: e.subtle,
    raised: e.raised,
    muted: { opacity: 0.55 },
  });
};
