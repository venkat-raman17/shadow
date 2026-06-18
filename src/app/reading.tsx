import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, Card } from '@/components/ui';
import { READINGS } from '@/lib/readings';

export default function ReadingListScreen() {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: 'Back',
        }}
      />
      <Screen>
        <Text style={styles.heading}>Reading room</Text>
        <Text style={styles.tagline}>
          A few short pieces on the ideas behind the practices. No rush — read one when you&apos;re
          curious.
        </Text>

        {READINGS.map((r) => (
          <Card
            key={r.id}
            onPress={() => router.push({ pathname: '/reading/[id]', params: { id: r.id } })}
            accessibilityLabel={r.title}
            style={styles.card}>
            <Text style={styles.title}>{r.title}</Text>
            <Text style={styles.blurb}>{r.blurb}</Text>
          </Card>
        ))}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  card: { gap: Spacing.half },
  title: { ...typography.body, fontWeight: '500' },
  blurb: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
});
