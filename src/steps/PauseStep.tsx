import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Button, AmbientBackground } from '@/components/ui';
import { resolveTokens } from '@/engine/tokens';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { PauseStep as PauseStepType } from '@/types/flow';
import type { StepProps } from './types';

const BREATH_MS = 4000;

export default function PauseStep({ step, inputs, onNext }: StepProps<PauseStepType>) {
  const [remaining, setRemaining] = useState(step.seconds);
  const done = remaining <= 0; // derived — no setState in the effect below

  const body = resolveTokens(step.body, inputs);
  const styles = useThemedStyles(makeStyles);

  // Countdown gates the Skip → Continue transition (no visible number).
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  // Breathing animation — reanimated runs on web too, so it animates everywhere.
  // Held still only when the OS "Reduce Motion" setting is on (vestibular safety).
  const scale = useSharedValue(1);
  const reducedMotion = useReducedMotion();
  const stillCircle = reducedMotion;

  useEffect(() => {
    if (stillCircle) {
      scale.value = 1;
      return;
    }
    scale.value = withRepeat(
      withTiming(1.22, { duration: BREATH_MS, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(scale);
  }, [stillCircle, scale]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={styles.block}>
      <AmbientBackground placement="center" intensity={1.1} />
      {body ? <Text style={styles.body}>{body}</Text> : null}

      <View style={styles.circleWrap} accessible={false} importantForAccessibility="no-hide-descendants">
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

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
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
