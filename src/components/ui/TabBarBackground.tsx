import React from 'react';
import { StyleSheet, View } from 'react-native';

import { makeElevation, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';

/**
 * The bottom tab bar as a soft "ledge": a faintly translucent surface with a
 * hairline top edge and an upward shadow lip, so the navigation reads as the
 * room the page sits in. Deliberately NOT glass — `expo-glass-effect`'s Liquid
 * Glass needs iOS 26+ and falls back to a plain View elsewhere; this themed View
 * gives the same calm ledge on every platform and in all three palettes.
 */
export function TabBarBackground() {
  const styles = useThemedStyles(makeStyles);
  return <View style={styles.ledge} />;
}

const makeStyles = ({ colors }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
    ledge: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.surfaceTranslucent,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      ...e.subtle,
      // Cast the soft shadow upward so the ledge has a lip above the content.
      shadowOffset: { width: 0, height: -3 },
    },
  });
};
