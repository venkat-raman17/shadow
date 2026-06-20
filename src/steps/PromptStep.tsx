import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { TextField, Chip, Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { PromptStep as PromptStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function PromptStep({ step, inputs, onNext, onExit }: StepProps<PromptStepType>) {
  const [value, setValue] = useState('');
  const styles = useThemedStyles(makeStyles);
  const inputRef = useRef<TextInput>(null);

  // Focus after the parent scroll animation has settled (scroll fires at ~60ms,
  // animation takes ~300ms) so the keyboard opens onto a fully visible question.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 450);
    return () => clearTimeout(t);
  }, []);

  const canAdvance = step.optional || value.trim().length > 0;
  const title = resolveTokens(step.title, inputs);
  const body = resolveTokens(step.body, inputs);
  const placeholder = resolveTokens(step.placeholder, inputs) || 'Write freely…';

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <TextField
        ref={inputRef}
        multiline={step.multiline}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
      />

      {step.assistChips && step.assistChips.length > 0 ? (
        <View style={styles.chips}>
          {step.assistChips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              onPress={() => setValue((prev) => (prev.trim() ? `${prev.trim()}, ${chip}` : chip))}
            />
          ))}
        </View>
      ) : null}

      <Button
        label="Continue"
        onPress={() => onNext(value.trim() || undefined)}
        disabled={!canAdvance}
      />

      {step.exitOffer ? (
        <Button label="You can stop here. That’s enough." variant="ghost" onPress={onExit} />
      ) : null}
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  block: { gap: Spacing.three },
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
});
