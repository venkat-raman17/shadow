import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
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
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.speakerLabel}>{speakerLabel}</Text>
      <Text style={styles.prompt}>{step.prompt}</Text>
      {step.hint ? <Text style={styles.hint}>{step.hint}</Text> : null}

      <TextInput
        style={styles.input}
        multiline
        value={value}
        onChangeText={setValue}
        placeholder="Write as this voice…"
        placeholderTextColor={colors.textSecondary}
        textAlignVertical="top"
        autoFocus
      />

      <TouchableOpacity style={styles.nextBtn} onPress={() => onNext(value.trim() || undefined)}>
        <Text style={styles.nextBtnText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.stopLink} onPress={onExit}>
        <Text style={styles.stopLinkText}>Stop here</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.three,
    flexGrow: 1,
  },
  speakerLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.accent,
  },
  prompt: { ...typography.heading },
  hint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: Spacing.three,
    ...typography.body,
    minHeight: 160,
  },
  nextBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
  },
  nextBtnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
  stopLink: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  stopLinkText: {
    ...typography.caption,
    textDecorationLine: 'underline',
  },
});
