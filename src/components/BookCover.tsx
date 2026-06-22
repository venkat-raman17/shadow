import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';

import { Spacing, radii, makeElevation, type Palette, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Illustration } from '@/components/illustrations';
import { usePressScale } from '@/hooks/usePressScale';
import { type Book, type BookSpine } from '@/lib/readings';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Portrait, like a real book on the shelf. Shared by the Library and Home. */
export const COVER_RATIO = 1.5;

/** Resolve a book's spine accent to a live palette colour. */
export function spineColor(colors: Palette, spine: BookSpine): string {
  switch (spine) {
    case 'warm':
      return colors.accentWarm;
    case 'muted':
      return colors.accentMuted;
    case 'clay':
      return colors.danger;
    case 'sage':
    default:
      return colors.accent;
  }
}

/** A single portrait book cover that opens its detail page. */
export function BookCover({ book, width, height }: { book: Book; width: number; height: number }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const press = usePressScale();
  const illoH = Math.round(height * 0.4);

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/book/[id]', params: { id: book.id } })}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      accessibilityRole="button"
      accessibilityLabel={book.title}
      style={[styles.coverShadow, { width, height }, press.animatedStyle]}>
      <View style={styles.coverClip}>
        <View style={[styles.spine, { backgroundColor: spineColor(colors, book.spine) }]} />
        <View style={styles.coverInner}>
          <View style={[styles.illoWrap, { height: illoH }]}>
            <Illustration name={book.cover} tone="duo" width={Math.min(width - 48, illoH * 1.4)} height={illoH} />
          </View>
          <Text style={styles.coverTitle} numberOfLines={2}>
            {book.title}
          </Text>
          {book.subtitle ? (
            <Text style={styles.coverSubtitle} numberOfLines={2}>
              {book.subtitle}
            </Text>
          ) : null}
          <Text style={styles.coverCount}>
            {book.chapters.length} {book.chapters.length === 1 ? 'chapter' : 'chapters'}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const makeStyles = ({ colors, typography }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
    // Two layers: the shadow rides an un-clipped wrapper, the inner view clips the
    // cover art and spine to the rounded corners (iOS drops shadows on overflow:hidden).
    coverShadow: { borderRadius: radii.lg, backgroundColor: colors.surface, ...e.subtle },
    coverClip: {
      flex: 1,
      borderRadius: radii.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    spine: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 7,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: 'rgba(255,255,255,0.18)',
    },
    coverInner: {
      flex: 1,
      paddingVertical: Spacing.three,
      paddingLeft: Spacing.three + 7,
      paddingRight: Spacing.three,
      gap: Spacing.half,
    },
    illoWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.one },
    coverTitle: { ...typography.displaySmall, fontSize: 18, lineHeight: 23 },
    coverSubtitle: { ...typography.caption, color: colors.textSecondary, lineHeight: 18 },
    coverCount: { ...typography.caption, color: colors.textFaint, marginTop: 'auto' },
  });
};
