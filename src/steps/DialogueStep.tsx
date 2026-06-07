import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors, typography } from '@/constants/theme';
import { Screen, TextField, Button } from '@/components/ui';
import type { DialogueStep as DialogueStepType } from '@/types/flow';

interface Props {
  step: DialogueStepType;
  onNext: (value?: string) => void;
  onExit: () => void;
}

export default function DialogueStep({ step, onNext, onExit }: Props) {
  const [value, setValue] = useState('');

  const speakerLabel = step.speaker === 'you' ? 'You' : 'The part';

  return (
    <Screen>
      <Text style={styles.speakerLabel}>{speakerLabel}</Text>
      <Text style={styles.prompt}>{step.prompt}</Text>
      {step.hint ? <Text style={styles.hint}>{step.hint}</Text> : null}

      <TextField
        large
        multiline
        value={value}
        onChangeText={setValue}
        placeholder="Write as this voice…"
        autoFocus
      />

      <Button label="Continue" onPress={() => onNext(value.trim() || undefined)} />
      <Button label="Stop here" variant="ghost" onPress={onExit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  speakerLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.accent,
  },
  prompt: { ...typography.serifPrompt },
  hint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
