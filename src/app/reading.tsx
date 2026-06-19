import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Spacing, radii, type Palette, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader } from '@/components/ui';
import { useSurfacingPatterns, useUsedFlowIds } from '@/hooks/useIntegration';
import { rankBooks, type Book, type BookSpine } from '@/lib/readings';

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

function BookCover({ book, reason }: { book: Book; reason?: string | null }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/book/[id]', params: { id: book.id } })}
      accessibilityRole="button"
      accessibilityLabel={book.title}
      style={({ pressed }) => [styles.cover, pressed && styles.pressed]}>
      <View style={[styles.spine, { backgroundColor: spineColor(colors, book.spine) }]} />
      <View style={styles.coverBody}>
        <Text style={styles.coverTitle}>{book.title}</Text>
        <Text style={styles.coverBlurb} numberOfLines={2}>
          {book.blurb}
        </Text>
        {reason ? (
          <Text style={styles.coverReason}>because “{reason}” keeps surfacing</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function ReadShelfScreen() {
  const patterns = useSurfacingPatterns(8);
  const flowIds = useUsedFlowIds();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [showAll, setShowAll] = useState(false);

  const shelf = rankBooks({ qualityFamilies: patterns.map((p) => p.quality), flowIds });

  return (
    <Screen withTabBar>
      <Text style={styles.heading}>Read</Text>
      <Text style={styles.tagline}>
        A small library on the ideas behind the practices. Take a book off the shelf when you&apos;re
        curious — no order, no rush.
      </Text>

      {shelf.suggested.length > 0 && (
        <View style={styles.section}>
          <SectionHeader>For where you are now</SectionHeader>
          {shelf.suggested.map(({ book, reason }) => (
            <BookCover key={book.id} book={book} reason={reason} />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <SectionHeader>Always here</SectionHeader>
        {shelf.evergreen.map((b) => (
          <BookCover key={b.id} book={b} />
        ))}
      </View>

      {shelf.rest.length > 0 &&
        (showAll ? (
          <View style={styles.section}>
            <SectionHeader>More books</SectionHeader>
            {shelf.rest.map((b) => (
              <BookCover key={b.id} book={b} />
            ))}
          </View>
        ) : (
          <Pressable
            onPress={() => setShowAll(true)}
            accessibilityRole="button"
            accessibilityLabel="Browse all books"
            style={styles.browseRow}>
            <SymbolView
              name={{ ios: 'books.vertical', web: 'auto_stories' }}
              size={15}
              tintColor={colors.textSecondary}
            />
            <Text style={styles.browseText}>Browse all books →</Text>
          </Pressable>
        ))}
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    heading: { ...typography.display },
    tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
    section: { gap: Spacing.two },

    cover: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    pressed: { opacity: 0.7, borderColor: colors.borderStrong },
    spine: { width: 6 },
    coverBody: { flex: 1, padding: Spacing.three, gap: Spacing.half },
    coverTitle: { ...typography.body, fontWeight: '500' },
    coverBlurb: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
    coverReason: {
      ...typography.caption,
      color: colors.accentWarm,
      fontStyle: 'italic',
      marginTop: Spacing.half,
    },

    browseRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one, marginTop: Spacing.two },
    browseText: { ...typography.body, color: colors.textSecondary },
  });
