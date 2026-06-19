import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Card } from '@/components/ui';
import { getBook, getReading } from '@/lib/readings';

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
          headerBackTitle: 'Read',
        }}
      />
      <Screen>
        {book ? (
          <>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.blurb}>{book.blurb}</Text>
            {book.chapters.map((cid) => {
              const r = getReading(cid);
              if (!r) return null;
              return (
                <Card
                  key={cid}
                  onPress={() => router.push({ pathname: '/reading/[id]', params: { id: cid } })}
                  accessibilityLabel={r.title}
                  style={styles.chapter}>
                  <Text style={styles.chapterTitle}>{r.title}</Text>
                  <Text style={styles.chapterBlurb}>{r.blurb}</Text>
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
    title: { ...typography.display, fontSize: 28, lineHeight: 36 },
    blurb: { ...typography.body, color: colors.textSecondary, lineHeight: 26, marginTop: -Spacing.two },
    chapter: { gap: Spacing.half },
    chapterTitle: { ...typography.body, fontWeight: '500' },
    chapterBlurb: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
    missing: {
      ...typography.serifBody,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.six,
    },
  });
