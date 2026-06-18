import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  /** Stretch to fill the available width (default true). */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * One button to replace the ~7 hand-rolled button StyleSheets across the app.
 * - primary: accent fill, dark text (the Continue / Keep going action)
 * - secondary: surface + border (Stop / Skip)
 * - ghost: borderless underlined link ("You can stop here")
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = true,
  style,
}: Props) {
  const styles = useThemedStyles(makeStyles);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        fullWidth && variant !== 'ghost' && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <View pointerEvents="none">
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.labelPrimary,
            variant === 'secondary' && styles.labelSecondary,
            variant === 'ghost' && styles.labelGhost,
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  base: {
    borderRadius: radii.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch' },
  primary: { backgroundColor: colors.accent },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    paddingVertical: Spacing.two,
    paddingHorizontal: 0,
  },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.35 },
  label: { ...typography.body, fontWeight: '500' },
  labelPrimary: { color: colors.onAccent },
  labelSecondary: { color: colors.textPrimary },
  labelGhost: {
    ...typography.caption,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
