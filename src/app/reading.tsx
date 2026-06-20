import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';

import {
  Spacing,
  radii,
  makeElevation,
  MaxContentWidth,
  BottomTabInset,
  type Palette,
  type Theme,
} from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { SectionHeader, AmbientBackground, FadeSlide } from '@/components/ui';
import { Illustration } from '@/components/illustrations';
import { usePressScale } from '@/hooks/usePressScale';
import { useSurfacingPatterns, useUsedFlowIds } from '@/hooks/useIntegration';
import { rankBooks, type Book, type BookSpine } from '@/lib/readings';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const GAP = Spacing.three;
const PAD = Spacing.four;
/** Portrait, like a real book on the shelf. */
const COVER_RATIO = 1.5;
const RAIL_W = 150;

function spineColor(colors: Palette, spine: BookSpine): string {
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

function BookCover({ book, width, height }: { book: Book; width: number; height: number }) {
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

export default function LibraryScreen() {
  const patterns = useSurfacingPatterns(8);
  const flowIds = useUsedFlowIds();
  const styles = useThemedStyles(makeStyles);
  const [listW, setListW] = useState(Math.min(Dimensions.get('window').width, MaxContentWidth));

  const shelf = rankBooks({ qualityFamilies: patterns.map((p) => p.quality), flowIds });
  // The whole library is the wall; books surfaced for "now" are lifted into the
  // featured rail, so nothing is shown twice.
  const grid = [...shelf.evergreen, ...shelf.rest];

  // Subtract the content padding so two covers + the gutter fit the row exactly.
  const colW = Math.max(120, Math.floor((listW - PAD * 2 - GAP) / 2));
  const colH = Math.round(colW * COVER_RATIO);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - listW) > 1) setListW(w);
  };

  const header = (
    <View style={styles.headerWrap}>
      <Text style={styles.heading}>Library</Text>
      <Text style={styles.tagline}>
        A small library on the ideas behind the practices. Take a book off the shelf when
        you&apos;re curious — no order, no rush.
      </Text>

      {shelf.suggested.length > 0 && (
        <View style={styles.section}>
          <SectionHeader>For where you are now</SectionHeader>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rail}>
            {shelf.suggested.map(({ book, reason }, i) => (
              <FadeSlide key={book.id} delay={Math.min(i * 60, 180)} style={styles.railItem}>
                <BookCover book={book} width={RAIL_W} height={Math.round(RAIL_W * COVER_RATIO)} />
                {reason ? (
                  <Text style={styles.reason} numberOfLines={2}>
                    because “{reason}” keeps surfacing
                  </Text>
                ) : null}
              </FadeSlide>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.shelfHeader}>
        <SectionHeader>{shelf.suggested.length > 0 ? 'On the shelf' : 'The library'}</SectionHeader>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <AmbientBackground />
      <FlatList
        data={grid}
        keyExtractor={(b) => b.id}
        numColumns={2}
        onLayout={onLayout}
        style={styles.list}
        ListHeaderComponent={header}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <FadeSlide rise delay={Math.min(index * 40, 240)}>
            <BookCover book={item} width={colW} height={colH} />
          </FadeSlide>
        )}
      />
    </SafeAreaView>
  );
}

const makeStyles = ({ colors, typography }: Theme) => {
  const e = makeElevation(colors);
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    list: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
    listContent: {
      padding: PAD,
      paddingTop: Spacing.five,
      paddingBottom: BottomTabInset + Spacing.four,
      gap: GAP,
    },
    row: { gap: GAP },
    headerWrap: { gap: Spacing.four, marginBottom: GAP },
    heading: { ...typography.display },
    tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
    section: { gap: Spacing.two },
    shelfHeader: { marginBottom: -Spacing.one },

    rail: { gap: GAP, paddingRight: Spacing.two, paddingBottom: Spacing.one },
    railItem: { width: RAIL_W, gap: Spacing.two },
    reason: { ...typography.caption, color: colors.accentWarm, fontStyle: 'italic' },

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
