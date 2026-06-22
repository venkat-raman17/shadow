import React from 'react';
import { View, ScrollView, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';

/** Width of the left date gutter — kept so JournalRow's layout stays aligned. */
export const MARGIN_W = 64;

/**
 * A sized page container for notebook leaves. Plain app background — no paper
 * wash, no ruled lines. The `ruled` prop is accepted but ignored.
 */
export function JournalPaper({
  width,
  height,
  scroll = true,
  ruled: _,
  contentStyle,
  children,
}: {
  width: number;
  height: number;
  scroll?: boolean;
  /** Accepted for backwards-compatibility; no longer draws rules. */
  ruled?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  const styles = useThemedStyles(makeStyles);
  const measured = height > 0;
  const size: StyleProp<ViewStyle> = measured ? { width, height } : { width, flex: 1 };

  return (
    <View style={[styles.page, size]}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    page: { backgroundColor: colors.background },
    content: { paddingVertical: Spacing.four },
  });
