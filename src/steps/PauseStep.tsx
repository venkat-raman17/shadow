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
import { Screen, Button } from '@/components/ui';
import type { PauseStep as PauseStepType } from '@/types/flow';

interface Props {
  step: PauseStepType;
  onNext: () => void;
  onExit: () => void;
}

const BREATH_MS = 4000;

export default function PauseStep({ step, onNext }: Props) {
  const [remaining, setRemaining] = useState(step.seconds);
  const [done, setDone] = useState(false);

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
    <Screen scroll={false} center>
      <View style={styles.inner}>
        {step.body ? <Text style={styles.body}>{step.body}</Text> : null}

        <View style={styles.circleWrap}>
          <Animated.View style={[styles.circle, animatedStyle]} />
        </View>

        <Text style={styles.hint}>{done ? 'Ready when you are.' : 'Breathe…'}</Text>
      </View>

      <Button
        label={done ? 'Continue' : 'Skip'}
        variant={done ? 'primary' : 'secondary'}
        onPress={() => onNext()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.five },
  body: {
    ...typography.serifBody,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  circleWrap: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
