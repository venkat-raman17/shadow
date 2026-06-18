import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import type { Flow } from '@/types/flow';
import FlowEngine from '@/engine/FlowEngine';
import { FLOWS } from '@/lib/practices';

export default function FlowScreen() {
  const { id, partId, priorFelt, partName, seedQuality } = useLocalSearchParams<{
    id: string;
    partId?: string;
    priorFelt?: string;
    partName?: string;
    seedQuality?: string;
  }>();

  const flow = useMemo<Flow | null>(() => {
    if (!id || typeof id !== 'string') return null;
    return FLOWS[id] ?? null;
  }, [id]);

  // Echo values carried in from a return (a part you're sitting with again) or
  // a personified recurring quality.
  const seedInputs = useMemo(() => {
    const s: Record<string, string> = {};
    if (typeof priorFelt === 'string' && priorFelt) s.priorFelt = priorFelt;
    if (typeof partName === 'string' && partName) s.partName = partName;
    if (typeof seedQuality === 'string' && seedQuality) s.seedQuality = seedQuality;
    return s;
  }, [priorFelt, partName, seedQuality]);

  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  if (!flow) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Flow not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: flow.title,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textSecondary,
          headerBackTitle: '',
        }}
      />
      <FlowEngine
        flow={flow}
        existingPartId={partId}
        seedInputs={seedInputs}
        onComplete={() => router.back()}
      />
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  error: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  errorText: { ...typography.body, color: colors.textSecondary },
});
