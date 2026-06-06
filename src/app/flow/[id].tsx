import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import type { Flow } from '@/types/flow';
import FlowEngine from '@/engine/FlowEngine';

// All bundled flows — add new files here as they're authored
const FLOWS: Record<string, Flow> = {
  'noticing.projection_recall.v1': require('@/assets/flows/noticing.projection_recall.v1.json'),
  'grounding.settle.v1': require('@/assets/flows/grounding.settle.v1.json'),
  'meeting.active_imagination.v1': require('@/assets/flows/meeting.active_imagination.v1.json'),
};

export default function FlowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
