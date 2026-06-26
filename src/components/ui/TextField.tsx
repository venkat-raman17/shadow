import React, { useState } from 'react';
import { TextInput, StyleSheet, type TextInputProps, type TextInput as TextInputType } from 'react-native';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';

interface Props extends TextInputProps {
  /** Taller input for long-form writing (dialogue, reflections). */
  large?: boolean;
}

/**
 * The consistent text input: surface fill, border that warms on focus, generous
 * padding. Replaces the input StyleSheets in Prompt/Dialogue steps and the
 * experiment seed.
 */
export const TextField = React.forwardRef<TextInputType, Props>(
  function TextField({ large, multiline, style, ...rest }, ref) {
    const [focused, setFocused] = useState(false);
    const { colors } = useTheme();
    const styles = useThemedStyles(makeStyles);

    return (
      <TextInput
        ref={ref}
        {...rest}
        multiline={multiline}
        placeholderTextColor={colors.textFaint}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        style={[
          styles.input,
          multiline && styles.multiline,
          large && styles.large,
          focused && styles.focused,
          style,
        ]}
      />
    );
  },
);

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: Spacing.three,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    minHeight: 52,
  },
  multiline: { minHeight: 140 },
  large: { minHeight: 200 },
  focused: { borderColor: colors.accentMuted },
});
