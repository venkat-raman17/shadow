import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader, Chip } from '@/components/ui';
import { PracticeCard } from '@/components/PracticeCard';
import {
  practicesByDepth,
  getPractice,
  isQuick,
  DEPTHS,
  NOTICE_GROUPS,
  type Depth,
  type Practice,
} from '@/lib/practices';
import { useHasPriorWork } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFavorites } from '@/hooks/useFavorites';

type DepthFilter = Depth | 'all';
type TimeFilter = 'all' | 'quick' | 'long';

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
  const { isFavorite, toggle, favorites } = useFavorites();
  const styles = useThemedStyles(makeStyles);

  // Deeper work (sit / carry) opens once there's something to build on — the
  // same progressive-disclosure gate Home uses.
  const hasPriorWork = useHasPriorWork();

  const [depthFilter, setDepthFilter] = useState<DepthFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const filtersActive = depthFilter !== 'all' || timeFilter !== 'all';

  // Only offer depth chips for depths a user can actually reach — a locked depth
  // would just filter to its hint.
  const unlockedDepths = DEPTHS.filter((d) => !d.lockedHint || hasPriorWork);

  const timeAllowed = (p: Practice) =>
    timeFilter === 'all' ? true : timeFilter === 'quick' ? isQuick(p) : !isQuick(p);
  const show = (p: Practice) => genderAllowed(p) && timeAllowed(p);

  // The "Yours" shelf: pinned practices the user chose, resolved through the
  // catalogue so removed/renamed flows simply drop out. Shown only once there's
  // prior work, and never while a filter is narrowing the view.
  const pinned = favorites
    .map((id) => getPractice(id))
    .filter((p): p is Practice => !!p && genderAllowed(p));
  const showShelf = !filtersActive && hasPriorWork && pinned.length > 0;

  // Decide whether the filters left anything to show (so we can offer a gentle
  // nudge instead of a blank screen). Locked depths still show their hint, so a
  // view that contains one is never "empty".
  const renderedDepths = DEPTHS.filter((d) => depthFilter === 'all' || depthFilter === d.depth);
  const anyLockedShown = renderedDepths.some((d) => !!d.lockedHint && !hasPriorWork);
  const totalCards = renderedDepths
    .filter((d) => !(d.lockedHint && !hasPriorWork))
    .reduce((n, d) => n + practicesByDepth(d.depth).filter(show).length, 0);
  const showEmpty = totalCards === 0 && !anyLockedShown;

  // The Notice depth is large; break it into its themed clusters. Any practice
  // without a recognized group falls through to a flat list at the end.
  function renderNotice(items: Practice[]) {
    const ungrouped = items.filter((p) => !p.group);
    return (
      <>
        {NOTICE_GROUPS.map(({ group, label }) => {
          const inGroup = items.filter((p) => p.group === group);
          if (inGroup.length === 0) return null;
          return (
            <View key={group} style={styles.cluster}>
              <Text style={styles.clusterLabel}>{label}</Text>
              {inGroup.map((p) => (
                <PracticeCard
                  key={p.id}
                  practice={p}
                  isFavorite={isFavorite(p.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </View>
          );
        })}
        {ungrouped.map((p) => (
          <PracticeCard
            key={p.id}
            practice={p}
            isFavorite={isFavorite(p.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </>
    );
  }

  return (
    <Screen>
      <Text style={styles.heading}>The Workshop</Text>
      <Text style={styles.tagline}>
        Every practice in one place. Home offers a few ways in; here you can wander the rest
        &mdash; there&apos;s no order to follow.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}>
        <Chip label="All" selected={depthFilter === 'all'} onPress={() => setDepthFilter('all')} />
        {unlockedDepths.map((d) => (
          <Chip
            key={d.depth}
            label={d.label}
            selected={depthFilter === d.depth}
            onPress={() => setDepthFilter(d.depth)}
          />
        ))}
        <View style={styles.filterSep} />
        <Chip
          label="A few minutes"
          selected={timeFilter === 'quick'}
          onPress={() => setTimeFilter((t) => (t === 'quick' ? 'all' : 'quick'))}
        />
        <Chip
          label="A longer sit"
          selected={timeFilter === 'long'}
          onPress={() => setTimeFilter((t) => (t === 'long' ? 'all' : 'long'))}
        />
      </ScrollView>

      {showShelf && (
        <View style={styles.section}>
          <SectionHeader>Yours</SectionHeader>
          {pinned.map((p) => (
            <PracticeCard key={p.id} practice={p} isFavorite onToggleFavorite={toggle} />
          ))}
          <Text style={styles.shelfNote}>No pressure to use these — return when one calls you.</Text>
        </View>
      )}

      {DEPTHS.map((group) => {
        if (depthFilter !== 'all' && depthFilter !== group.depth) return null;

        // Notice and the grounding toolkit are always open; deeper work
        // (sit / carry) waits until there's something to build on.
        const locked = !!group.lockedHint && !hasPriorWork;
        if (locked) {
          return (
            <View key={group.depth} style={styles.section}>
              <SectionHeader>{group.label}</SectionHeader>
              <Text style={styles.lockedHint}>{group.lockedHint}</Text>
            </View>
          );
        }

        const items = practicesByDepth(group.depth).filter(show);
        if (items.length === 0) return null;

        return (
          <View key={group.depth} style={styles.section}>
            <SectionHeader>{group.label}</SectionHeader>
            {group.depth === 'notice'
              ? renderNotice(items)
              : items.map((p) => (
                  <PracticeCard
                    key={p.id}
                    practice={p}
                    isFavorite={isFavorite(p.id)}
                    onToggleFavorite={toggle}
                  />
                ))}
          </View>
        );
      })}

      {showEmpty && (
        <Text style={styles.emptyNote}>Nothing matches those filters — try clearing one.</Text>
      )}
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  tagline: { ...typography.body, color: colors.textSecondary },
  filterRow: { gap: Spacing.two, alignItems: 'center', paddingVertical: Spacing.half },
  filterSep: { width: 1, height: 20, backgroundColor: colors.border, marginHorizontal: Spacing.one },
  section: { gap: Spacing.two },
  cluster: { gap: Spacing.two, marginTop: Spacing.one },
  clusterLabel: { ...typography.bodySmall, fontWeight: '500', color: colors.textSecondary },
  lockedHint: {
    ...typography.bodySmall,
    color: colors.textFaint,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  shelfNote: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },
  emptyNote: { ...typography.body, color: colors.textSecondary },
});
