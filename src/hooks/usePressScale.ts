import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { motion } from '@/constants/theme';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The shared "warm press-depress" feedback: a tap gently scales the surface down
 * a hair and back (part of the app's small, calm motion vocabulary). Honours the
 * OS Reduce-Motion setting — when reduced, it falls back to a quiet opacity dip
 * with no movement. Apply `animatedStyle` to an Animated component and wire
 * `onPressIn`/`onPressOut` to its Pressable.
 */
export function usePressScale() {
  const reduced = useReducedMotion();
  // 0 = at rest, 1 = fully pressed. Mapped to scale (or opacity when reduced).
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    if (reduced) {
      return { opacity: 1 - pressed.value * 0.3 };
    }
    return { transform: [{ scale: 1 - pressed.value * (1 - motion.press) }] };
  });

  const onPressIn = () => {
    pressed.value = reduced ? 1 : withTiming(1, { duration: motion.pressDuration });
  };
  const onPressOut = () => {
    pressed.value = reduced ? 0 : withTiming(0, { duration: motion.pressDuration });
  };

  return { animatedStyle, onPressIn, onPressOut };
}
