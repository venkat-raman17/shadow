import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors, typography, Spacing } from '@/constants/theme';
import type { PauseStep as PauseStepType } from '@/types/flow';

interface Props {
  step: PauseStepType;
  onNext: () => void;
  onExit: () => void;
}

export default function PauseStep({ step, onNext }: Props) {
  const [remaining, setRemaining] = useState(step.seconds);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (remaining <= 0) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  return (
    <View style={styles.container}>
      {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

      <View style={styles.timerWrapper}>
        {done ? (
          <Text style={styles.doneText}>Ready when you are.</Text>
        ) : (
          <Text style={styles.timer}>{remaining}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.nextBtn, !done && styles.nextBtnSkip]}
        onPress={() => onNext()}>
        <Text style={[styles.nextBtnText, !done && styles.nextBtnTextSkip]}>
          {done ? 'Continue' : 'Skip'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  timerWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.four,
  },
  timer: {
    ...typography.heading,
    fontSize: 40,
    color: colors.accent,
  },
  doneText: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  nextBtnSkip: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextBtnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
  nextBtnTextSkip: {
    color: colors.textSecondary,
  },
});
