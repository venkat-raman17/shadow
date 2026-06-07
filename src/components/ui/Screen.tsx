import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, Spacing, BottomTabInset, MaxContentWidth } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  /** Wrap content in a ScrollView (default true). Set false for fixed layouts. */
  scroll?: boolean;
  /** Add bottom padding to clear the bottom tab bar. */
  withTabBar?: boolean;
  /** Vertically center content (e.g. completion / pause screens). */
  center?: boolean;
  /** SafeArea edges to apply. Defaults to all. */
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  /** Passed through to ScrollView for inputs that should keep focus on tap. */
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}

/**
 * The shared screen shell: safe-area background, standard padding, optional
 * scroll, max-width centering for large screens, and tab-bar clearance.
 * Replaces the duplicated `safe` / `container` StyleSheets in every screen.
 */
export function Screen({
  children,
  scroll = true,
  withTabBar = false,
  center = false,
  edges,
  contentStyle,
  keyboardShouldPersistTaps = 'handled',
}: Props) {
  const padding = [
    styles.content,
    withTabBar && { paddingBottom: BottomTabInset + Spacing.four },
    center && styles.centered,
    contentStyle,
  ];

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={padding}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={false}>
          <View style={styles.inner}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding]}>
          <View style={[styles.inner, center && styles.flex]}>{children}</View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
    flexGrow: 1,
  },
  centered: { justifyContent: 'center' },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.four,
  },
});
