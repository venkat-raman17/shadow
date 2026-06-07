import React, { useState } from 'react';
import { TextInput, StyleSheet, type TextInputProps } from 'react-native';

import { colors, typography, Spacing, radii } from '@/constants/theme';

interface Props extends TextInputProps {
  /** Taller input for long-form writing (dialogue, reflections). */
  large?: boolean;
}

/**
 * The consistent text input: surface fill, border that warms on focus, generous
 * padding. Replaces the input StyleSheets in Prompt/Dialogue steps and the
 * experiment seed.
 */
export function TextField({ large, multiline, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
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
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: Spacing.three,
    ...typography.body,
    color: colors.textPrimary,
    minHeight: 52,
  },
  multiline: { minHeight: 140 },
  large: { minHeight: 200 },
  focused: { borderColor: colors.accentMuted },
});
