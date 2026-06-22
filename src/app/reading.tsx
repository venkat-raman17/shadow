import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing, MaxContentWidth, BottomTabInset, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { SectionHeader, FadeSlide } from '@/components/ui';
import { BookCover, COVER_RATIO } from '@/components/BookCover';
import { BOOKS } from '@/lib/readings';

const GAP = Spacing.three;
const PAD = Spacing.four;
const RAIL_W = 150;
const RAIL_H = Math.round(RAIL_W * COVER_RATIO);

interface BookGroup {
  label: string;
  ids: string[];
}

const BOOK_GROUPS: BookGroup[] = [
  {
    label: 'Start here',
    ids: ['foundations', 'using', 'steady'],
  },
  {
    label: 'Feelings & reactions',
    ids: ['shame', 'feelings-one-by-one', 'everyday-shadow', 'others', 'the-body'],
  },
  {
    label: 'Inner figures & dreams',
    ids: ['figures', 'inner-cast', 'dreams-alchemy'],
  },
  {
    label: 'Life & relationships',
    ids: ['family-relationships', 'belonging-loneliness', 'persona-and-world', 'second-half', 'thresholds-change', 'living-it'],
  },
  {
    label: 'Going deeper',
    ids: ['going-deeper', 'ways-of-working', 'spirit-and-meaning'],
  },
];

export default function LibraryScreen() {
  const styles = useThemedStyles(makeStyles);
  const bookById = Object.fromEntries(BOOKS.map((b) => [b.id, b]));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>The Study</Text>
        <Text style={styles.tagline}>
          A small library on the ideas behind the practices. Take a book off the shelf when
          you&apos;re curious — no order, no rush.
        </Text>

        {BOOK_GROUPS.map((group) => {
          const books = group.ids.map((id) => bookById[id]).filter(Boolean);
          if (books.length === 0) return null;
          return (
            <View key={group.label} style={styles.section}>
              <SectionHeader>{group.label}</SectionHeader>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rail}>
                {books.map((book, i) => (
                  <FadeSlide key={book.id} delay={Math.min(i * 60, 180)} style={styles.railItem}>
                    <BookCover book={book} width={RAIL_W} height={RAIL_H} />
                  </FadeSlide>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    scroll: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
    content: {
      padding: PAD,
      paddingTop: Spacing.five,
      paddingBottom: BottomTabInset + Spacing.four,
      gap: Spacing.five,
    },
    heading: { ...typography.display },
    tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
    section: { gap: Spacing.two },
    rail: { gap: GAP, paddingRight: Spacing.two, paddingBottom: Spacing.one },
    railItem: { width: RAIL_W },
  });
