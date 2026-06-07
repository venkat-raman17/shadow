import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import { colors, typography, Spacing } from '@/constants/theme';
import { Screen, SectionHeader } from '@/components/ui';
import { PracticeCard } from '@/components/PracticeCard';
import { practicesByDepth, type Depth, type Practice } from '@/lib/practices';
import { useRecentEntries } from '@/hooks/useEntries';
import { useParts, useExperiments } from '@/hooks/useIntegration';
import { useUserProfile } from '@/hooks/useUserProfile';

const GROUPS: { depth: Depth; label: string }[] = [
  { depth: 'notice', label: 'Notice' },
  { depth: 'sit', label: 'Go deeper' },
  { depth: 'carry', label: 'Carry forward' },
];

/** Exclude practices whose gender requirement doesn't match this user. */
function useGenderFilter(): (p: Practice) => boolean {
  const profile = useUserProfile();
  return (p: Practice) => {
    if (!p.requiresGender) return true;
    // Non-binary users see everything; unloaded profile falls back to showing all.
    if (!profile || profile.gender === 'nonbinary') return true;
    return p.requiresGender === profile.gender;
  };
}

export default function PracticesScreen() {
  const entries = useRecentEntries(1);
  const parts = useParts();
  const { experiments } = useExperiments();
  const genderAllowed = useGenderFilter();

  // Deeper work (sit / carry) opens once there's something to build on — the
  // same progressive-disclosure gate Home uses.
  const hasPriorWork = entries.length > 0 || parts.length > 0 || experiments.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <Screen>
        <Text style={styles.heading}>Ways to notice</Text>
        <Text style={styles.tagline}>
          Start anywhere. Each one is a few quiet minutes &mdash; there&apos;s no order to follow.
        </Text>

        {GROUPS.map(({ depth, label }) => {
          const practices = practicesByDepth(depth).filter(genderAllowed);
          if (practices.length === 0) return null;

          const locked = depth !== 'notice' && !hasPriorWork;

          return (
            <View key={depth} style={styles.section}>
              <SectionHeader>{label}</SectionHeader>
              {locked ? (
                <Text style={styles.lockedHint}>
                  {depth === 'sit'
                    ? "These open once you've noticed a few things."
                    : "This opens once you've met a part to carry forward."}
                </Text>
              ) : (
                practices.map((p) => <PracticeCard key={p.id} practice={p} />)
              )}
            </View>
          );
        })}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary },
  section: { gap: Spacing.two },
  lockedHint: {
    ...typography.bodySmall,
    color: colors.textFaint,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
