import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextInputProps,
  type TextInput as TextInputType,
} from 'react-native';
import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Illustration } from '@/components/illustrations';

interface Props extends TextInputProps {
  /** Style for the bordered row wrapper (the field's own `style` styles the input). */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * The shared search input: a leading magnifying-glass, a field, and a clear
 * button that appears once there's text. Reuses TextField's visual tokens
 * (surface fill, warm focus border) so it reads as the same input family.
 * Used by the Notebook search screen and the Workshop, and meant for the Read
 * page next — keeping the look (and any icon change) in one place.
 */
export const SearchField = React.forwardRef<TextInputType, Props>(
  function SearchField({ value, onChangeText, style, containerStyle, placeholder = 'Search…', ...rest }, ref) {
    const [focused, setFocused] = useState(false);
    const { colors } = useTheme();
    const styles = useThemedStyles(makeStyles);

    return (
      <View style={[styles.row, focused && styles.focused, containerStyle]}>
        <Illustration name="ui-search" size={20} maxStroke={9} color={colors.textFaint} decorative />
        <TextInput
          ref={ref}
          {...rest}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
        />
        {!!value && (
          <Pressable
            onPress={() => onChangeText?.('')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="Clear search">
            <Illustration name="ui-close-circle" size={20} maxStroke={9} color={colors.textFaint} decorative />
          </Pressable>
        )}
      </View>
    );
  },
);

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.two,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: Spacing.three,
      minHeight: 52,
    },
    focused: { borderColor: colors.accentMuted },
    input: { flex: 1, fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.textPrimary, paddingVertical: Spacing.two },
  });
