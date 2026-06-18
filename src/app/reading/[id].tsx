import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen } from '@/components/ui';
import { getReading } from '@/lib/readings';

export default function ReadingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reading = id ? getReading(id) : undefined;
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: 'Reading',
        }}
      />
      <Screen>
        {reading ? (
          <>
            <Text style={styles.title}>{reading.title}</Text>
            {reading.body.split('\n\n').map((para, i) => (
              <Text key={i} style={styles.para}>
                {para}
              </Text>
            ))}
          </>
        ) : (
          <Text style={styles.missing}>That reading isn&apos;t here.</Text>
        )}
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  title: { ...typography.display, fontSize: 28, lineHeight: 36, marginBottom: Spacing.two },
  para: { ...typography.serifBody, color: colors.textPrimary, marginBottom: Spacing.three },
  missing: { ...typography.serifBody, color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.six },
});
