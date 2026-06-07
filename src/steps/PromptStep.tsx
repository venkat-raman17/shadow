import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { TextField, Chip, Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { PromptStep as PromptStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function PromptStep({ step, inputs, onNext, onExit }: StepProps<PromptStepType>) {
  const [value, setValue] = useState('');

  const canAdvance = step.optional || value.trim().length > 0;
  const title = resolveTokens(step.title, inputs);
  const body = resolveTokens(step.body, inputs);
  const placeholder = resolveTokens(step.placeholder, inputs) || 'Write freely…';

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <TextField
        multiline={step.multiline}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        autoFocus
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

const styles = StyleSheet.create({
  block: { gap: Spacing.three },
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
});
