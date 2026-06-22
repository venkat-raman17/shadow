import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { Spacing, radii, type Palette, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Card } from '@/components/ui';
import { Illustration } from '@/components/illustrations';
import { getBook, getReading, readTimeOf, type BookSpine } from '@/lib/readings';

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

export default function BookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = id ? getBook(id) : undefined;
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: 'Library',
        }}
      />
      <Screen>
        {book ? (
          <>
            <View style={styles.coverHead}>
              <View style={[styles.coverBadge, { borderColor: spineColor(colors, book.spine) }]}>
                <Illustration name={book.cover} tone="duo" width={88} height={104} />
              </View>
              <View style={styles.coverText}>
                <Text style={styles.title}>{book.title}</Text>
                {book.subtitle ? <Text style={styles.subtitle}>{book.subtitle}</Text> : null}
                <Text style={styles.count}>
                  {book.chapters.length} {book.chapters.length === 1 ? 'chapter' : 'chapters'}
                </Text>
              </View>
            </View>

            {book.chapters.map((cid) => {
              const r = getReading(cid);
              if (!r) return null;
              return (
                <Card
                  key={cid}
                  onPress={() => router.push({ pathname: '/reading/[id]', params: { id: cid } })}
                  accessibilityLabel={r.title}
                  style={styles.chapter}>
                  <View style={styles.chapterIcon}>
                    <Illustration name={r.icon ?? book.cover} tone="soft" size={36} />
                  </View>
                  <View style={styles.chapterBody}>
                    <Text style={styles.chapterTitle}>{r.title}</Text>
                    <Text style={styles.chapterBlurb}>{r.blurb}</Text>
                    <Text style={styles.chapterMeta}>{readTimeOf(r)}</Text>
                  </View>
                </Card>
              );
            })}
          </>
        ) : (
          <Text style={styles.missing}>That book isn&apos;t here.</Text>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    coverHead: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
    coverBadge: {
      borderRadius: radii.md,
      borderLeftWidth: 4,
      backgroundColor: colors.surface,
      paddingVertical: Spacing.two,
      paddingHorizontal: Spacing.three,
    },
    coverText: { flex: 1, gap: Spacing.half },
    title: { ...typography.display, fontSize: 26, lineHeight: 33 },
    subtitle: { ...typography.body, color: colors.textSecondary, lineHeight: 23 },
    count: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },

    chapter: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
    chapterIcon: { width: 40, alignItems: 'center' },
    chapterBody: { flex: 1, gap: Spacing.half },
    chapterTitle: { ...typography.body, fontWeight: '500' },
    chapterBlurb: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
    chapterMeta: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },

    missing: {
      ...typography.serifBody,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.six,
    },
  });
