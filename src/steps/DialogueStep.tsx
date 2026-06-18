import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { TextField, Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { DialogueStep as DialogueStepType } from '@/types/flow';
import type { StepProps } from './types';

export default function DialogueStep({ step, inputs, onNext, onExit }: StepProps<DialogueStepType>) {
  const [value, setValue] = useState('');
  const styles = useThemedStyles(makeStyles);

  const speakerLabel = step.speaker === 'you' ? 'You' : 'The part';
  const prompt = resolveTokens(step.prompt, inputs);
  const hint = resolveTokens(step.hint, inputs);

  return (
    <View style={styles.block}>
      <Text style={styles.speakerLabel}>{speakerLabel}</Text>
      <Text style={styles.prompt}>{prompt}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}

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
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  block: { gap: Spacing.three },
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
