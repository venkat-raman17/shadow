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
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{step.title}</Text>
      {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

      <TextInput
        style={[styles.input, step.multiline && styles.inputMultiline]}
        multiline={step.multiline}
        value={value}
        onChangeText={setValue}
        placeholder={step.placeholder ?? 'Write freely…'}
        placeholderTextColor={colors.textSecondary}
        textAlignVertical={step.multiline ? 'top' : 'center'}
        autoFocus
      />

      {step.assistChips && step.assistChips.length > 0 ? (
        <View style={styles.chips}>
          {step.assistChips.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={styles.chip}
              onPress={() => setValue((prev) => (prev.trim() ? `${prev.trim()}, ${chip}` : chip))}>
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      <TouchableOpacity
        style={[styles.nextBtn, !canAdvance && styles.nextBtnDisabled]}
        onPress={() => onNext(value.trim() || undefined)}
        disabled={!canAdvance}>
        <Text style={styles.nextBtnText}>Continue</Text>
      </TouchableOpacity>

      {step.exitOffer ? (
        <TouchableOpacity style={styles.stopLink} onPress={onExit}>
          <Text style={styles.stopLinkText}>You can stop here. That's enough.</Text>
        </TouchableOpacity>
      ) : null}
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
  title: { ...typography.heading },
  body: { ...typography.body, color: colors.textSecondary },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: Spacing.three,
    ...typography.body,
    minHeight: 52,
  },
  inputMultiline: {
    minHeight: 140,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    backgroundColor: colors.chip,
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + Spacing.half,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  nextBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  nextBtnDisabled: { opacity: 0.35 },
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
