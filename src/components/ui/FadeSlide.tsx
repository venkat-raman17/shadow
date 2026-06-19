import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeInDown, ReduceMotion } from 'react-native-reanimated';

import { motion } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  /** Slight upward rise on entrance (default) vs. a plain cross-fade. */
  rise?: boolean;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gentle entrance wrapper driven by the shared motion tokens — the calm
 * cross-fade/rise used for flow steps, completion screens, and onboarding
 * panels. Declarative reanimated entering animations degrade gracefully on web.
 */
export function FadeSlide({
  children,
  rise = true,
  delay = 0,
  duration = motion.duration.base,
  style,
}: Props) {
  const entering = rise
    ? FadeInDown.duration(duration).delay(delay).reduceMotion(ReduceMotion.System)
    : FadeIn.duration(duration).delay(delay).reduceMotion(ReduceMotion.System);

  return (
    <Animated.View entering={entering} style={style}>
      {children}
    </Animated.View>
  );
}
