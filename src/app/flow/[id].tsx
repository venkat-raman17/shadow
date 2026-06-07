import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import type { Flow } from '@/types/flow';
import FlowEngine from '@/engine/FlowEngine';
import { FLOWS } from '@/lib/practices';

export default function FlowScreen() {
  const { id, partId } = useLocalSearchParams<{ id: string; partId?: string }>();

  const flow = useMemo<Flow | null>(() => {
    if (!id || typeof id !== 'string') return null;
    return FLOWS[id] ?? null;
  }, [id]);

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
        onComplete={() => router.back()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  errorText: { ...typography.body, color: colors.textSecondary },
});
