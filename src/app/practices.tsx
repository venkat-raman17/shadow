import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader } from '@/components/ui';
import { PracticeCard } from '@/components/PracticeCard';
import { practicesByDepth, getPractice, DEPTHS, type Practice } from '@/lib/practices';
import { useHasPriorWork } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFavorites } from '@/hooks/useFavorites';

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
  const genderAllowed = useGenderFilter();
  const { favorites, isFavorite, toggle } = useFavorites();
  const styles = useThemedStyles(makeStyles);

  // Deeper work (sit / carry) opens once there's something to build on — the
  // same progressive-disclosure gate Home uses.
  const hasPriorWork = useHasPriorWork();

  // The "Yours" shelf: pinned practices the user chose, resolved through the
  // catalogue so removed/renamed flows simply drop out. Shown only once there's
  // prior work — never on a newcomer's first visit.
  const pinned = favorites
    .map((id) => getPractice(id))
    .filter((p): p is Practice => !!p && genderAllowed(p));
  const showShelf = hasPriorWork && pinned.length > 0;

  return (
    <>
      <Screen>
        <Text style={styles.heading}>The library</Text>
        <Text style={styles.tagline}>
          Every practice in one place. Home offers a few ways in; here you can wander the rest
          &mdash; there&apos;s no order to follow.
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

        {DEPTHS.map(({ depth, label, lockedHint }) => {
          const practices = practicesByDepth(depth).filter(genderAllowed);
          if (practices.length === 0) return null;

          // Notice and the grounding toolkit are always open; deeper work
          // (sit / carry) waits until there's something to build on.
          const locked = !!lockedHint && !hasPriorWork;

          return (
            <View key={depth} style={styles.section}>
              <SectionHeader>{label}</SectionHeader>
              {locked ? (
                <Text style={styles.lockedHint}>{lockedHint}</Text>
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
});
