import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, TextField, Chip, Button } from '@/components/ui';
import type { PromptStep as PromptStepType } from '@/types/flow';

interface Props {
  step: PromptStepType;
  onNext: (value?: string) => void;
  onExit: () => void;
}

export default function PromptStep({ step, onNext, onExit }: Props) {
  const [value, setValue] = useState('');

  const canAdvance = step.optional || value.trim().length > 0;

  return (
    <Screen>
      <Text style={styles.title}>{step.title}</Text>
      {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

      <TextField
        multiline={step.multiline}
        value={value}
        onChangeText={setValue}
        placeholder={step.placeholder ?? 'Write freely…'}
        autoFocus
      />

      {step.assistChips && step.assistChips.length > 0 ? (
        <View style={styles.chips}>
          {step.assistChips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              onPress={() =>
                setValue((prev) => (prev.trim() ? `${prev.trim()}, ${chip}` : chip))
              }
            />
          ))}
        </View>
      ) : null}

      <Button label="Continue" onPress={() => onNext(value.trim() || undefined)} disabled={!canAdvance} />

      {step.exitOffer ? (
        <Button label="You can stop here. That’s enough." variant="ghost" onPress={onExit} />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.serifPrompt },
  body: { ...typography.body, color: colors.textSecondary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
});
