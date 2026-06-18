import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Spacing, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader } from '@/components/ui';
import { PracticeCard } from '@/components/PracticeCard';
import { practicesByDepth, getPractice, type Depth, type Practice } from '@/lib/practices';
import { useRecentEntries } from '@/hooks/useEntries';
import { useParts, useExperiments } from '@/hooks/useIntegration';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFavorites } from '@/hooks/useFavorites';

const GROUPS: { depth: Depth; label: string }[] = [
  { depth: 'notice', label: 'Notice' },
  { depth: 'sit', label: 'Go deeper' },
  { depth: 'carry', label: 'Carry forward' },
  { depth: 'ground', label: 'Steady yourself' },
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
  const { favorites, isFavorite, toggle } = useFavorites();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  // Deeper work (sit / carry) opens once there's something to build on — the
  // same progressive-disclosure gate Home uses.
  const hasPriorWork = entries.length > 0 || parts.length > 0 || experiments.length > 0;

  // The "Yours" shelf: pinned practices the user chose, resolved through the
  // catalogue so removed/renamed flows simply drop out. Shown only once there's
  // prior work — never on a newcomer's first visit.
  const pinned = favorites
    .map((id) => getPractice(id))
    .filter((p): p is Practice => !!p && genderAllowed(p));
  const showShelf = hasPriorWork && pinned.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <Screen>
        <Text style={styles.heading}>Ways to notice</Text>
        <Text style={styles.tagline}>
          Start anywhere. Each one is a few quiet minutes &mdash; there&apos;s no order to follow.
        </Text>

        {showShelf && (
          <View style={styles.section}>
            <SectionHeader>Yours</SectionHeader>
            {pinned.map((p) => (
              <PracticeCard
                key={p.id}
                practice={p}
                isFavorite
                onToggleFavorite={toggle}
              />
            ))}
            <Text style={styles.shelfNote}>No pressure to use these — return when one calls you.</Text>
          </View>
        )}

        {GROUPS.map(({ depth, label }) => {
          const practices = practicesByDepth(depth).filter(genderAllowed);
          if (practices.length === 0) return null;

          // Notice and the grounding toolkit are always open; deeper work
          // (sit / carry) waits until there's something to build on.
          const locked = (depth === 'sit' || depth === 'carry') && !hasPriorWork;

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
                practices.map((p) => (
                  <PracticeCard
                    key={p.id}
                    practice={p}
                    isFavorite={isFavorite(p.id)}
                    onToggleFavorite={toggle}
                  />
                ))
              )}
            </View>
          );
        })}

        <Pressable style={styles.readingLink} onPress={() => router.push('/reading')}>
          <SymbolView
            name={{ ios: 'book.closed', web: 'menu_book' }}
            size={15}
            tintColor={colors.textSecondary}
          />
          <Text style={styles.readingLinkText}>Read about the work →</Text>
        </Pressable>
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary },
  section: { gap: Spacing.two },
  lockedHint: {
    ...typography.bodySmall,
    color: colors.textFaint,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  shelfNote: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },
  readingLink: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one, marginTop: Spacing.two },
  readingLinkText: { ...typography.body, color: colors.textSecondary },
});
