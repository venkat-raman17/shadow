import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import { colors, typography, Spacing } from '@/constants/theme';
import { Button } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import type { PauseStep as PauseStepType } from '@/types/flow';
import type { StepProps } from './types';

const BREATH_MS = 4000;

export default function PauseStep({ step, inputs, onNext }: StepProps<PauseStepType>) {
  const [remaining, setRemaining] = useState(step.seconds);
  const [done, setDone] = useState(false);

  const body = resolveTokens(step.body, inputs);

  // Countdown gates the Skip → Continue transition (no visible number).
  useEffect(() => {
    if (remaining <= 0) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  // Breathing animation. reanimated runs on web, but we keep a static circle
  // there to avoid any worklet edge cases in the static web output.
  const scale = useSharedValue(1);
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (isWeb) return;
    scale.value = withRepeat(
      withTiming(1.22, { duration: BREATH_MS, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(scale);
  }, [isWeb, scale]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={styles.block}>
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <View style={styles.circleWrap}>
        <Animated.View style={[styles.circle, animatedStyle]} />
      </View>

      <Text style={styles.hint}>{done ? 'Ready when you are.' : 'Breathe…'}</Text>

      <Button
        label={done ? 'Continue' : 'Skip'}
        variant={done ? 'primary' : 'secondary'}
        onPress={() => onNext()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: Spacing.three, alignItems: 'center' },
  body: {
    ...typography.serifBody,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  circleWrap: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.two,
  },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentMuted,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
