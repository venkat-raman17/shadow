import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader, Chip, Card, SearchField } from '@/components/ui';
import { Illustration } from '@/components/illustrations';
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
import { situationsFor } from '@/lib/threshold';
import { PATHS, pathSteps } from '@/lib/paths';
import { getItem, setItem } from '@/lib/kv';
import { useHasPriorWork } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSuggestedFlow } from '@/hooks/useSuggestedFlow';
import { useFavorites } from '@/hooks/useFavorites';

const WORKSHOP_INTRO_KEY = 'shadow.workshop_intro_seen';

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
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const profile = useUserProfile();

  // Deeper work (sit / carry) opens once there's something to build on — the
  // same progressive-disclosure gate Home uses.
  const hasPriorWork = useHasPriorWork();

  const [depthFilter, setDepthFilter] = useState<DepthFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;
  const filtersActive = depthFilter !== 'all' || timeFilter !== 'all';
  // An active search narrows the view just like the chips do — both stand the
  // "way in" sections aside so the screen is just results.
  const narrowing = filtersActive || searching;

  // The "way in" above the catalogue, shown only when nothing is being filtered.
  // The situation picker is dismissible (returning browsers needn't be nudged);
  // the suggestion and the Ways-through trails are always offered, never forced.
  const [introDismissed, setIntroDismissed] = useState<boolean | null>(null);
  useEffect(() => {
    getItem(WORKSHOP_INTRO_KEY).then((v) => setIntroDismissed(v === '1'));
  }, []);
  function dismissIntro() {
    setIntroDismissed(true);
    setItem(WORKSHOP_INTRO_KEY, '1');
  }
  const situations = situationsFor(profile?.gender);
  const suggested = getPractice(useSuggestedFlow());
  const showIntro = introDismissed === false;
  const showWayIn = !narrowing;

  // Only offer depth chips for depths a user can actually reach — a locked depth
  // would just filter to its hint.
  const unlockedDepths = DEPTHS.filter((d) => !d.lockedHint || hasPriorWork);

  const timeAllowed = (p: Practice) =>
    timeFilter === 'all' ? true : timeFilter === 'quick' ? isQuick(p) : !isQuick(p);
  // Search matches the plain-language title/blurb — the only user-facing text a
  // practice carries. Case-insensitive substring; empty query matches all.
  const matchesSearch = (p: Practice) =>
    !searching || p.title.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q);
  const show = (p: Practice) => genderAllowed(p) && timeAllowed(p) && matchesSearch(p);

  // The "Yours" shelf: pinned practices the user chose, resolved through the
  // catalogue so removed/renamed flows simply drop out. Shown only once there's
  // prior work, and never while a filter is narrowing the view.
  const pinned = favorites
    .map((id) => getPractice(id))
    .filter((p): p is Practice => !!p && genderAllowed(p));
  const showShelf = !narrowing && hasPriorWork && pinned.length > 0;

  // Decide whether the filters left anything to show (so we can offer a gentle
  // nudge instead of a blank screen). Locked depths still show their hint, so a
  // view that contains one is never "empty".
  const renderedDepths = DEPTHS.filter((d) => depthFilter === 'all' || depthFilter === d.depth);
  // While searching the locked hints are suppressed (a hint isn't a match), so
  // they no longer keep the view from being "empty".
  const anyLockedShown = !searching && renderedDepths.some((d) => !!d.lockedHint && !hasPriorWork);
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
        {NOTICE_GROUPS.map(({ group, label, intro }) => {
          const inGroup = items.filter((p) => p.group === group);
          if (inGroup.length === 0) return null;
          return (
            <View key={group} style={styles.cluster}>
              <Text style={styles.clusterLabel}>{label}</Text>
              <Text style={styles.clusterIntro}>{intro}</Text>
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

      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder="Search practices…"
        accessibilityLabel="Search practices"
      />

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

      {showWayIn && showIntro && (
        <View style={styles.intro}>
          <View style={styles.introHead}>
            <Text style={styles.introTitle}>Not sure where to begin?</Text>
            <Pressable
              onPress={dismissIntro}
              accessibilityLabel="Dismiss"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Illustration name="ui-close" size={16} maxStroke={9} color={colors.textFaint} decorative />
            </Pressable>
          </View>
          <Text style={styles.introSub}>Start from what&apos;s happening — pick the one that fits.</Text>
          <View style={styles.situations}>
            {situations.map((s) => (
              <Chip key={s.flowId} label={s.label} onPress={() => router.push(`/flow/${s.flowId}`)} />
            ))}
          </View>
        </View>
      )}

      {showWayIn && suggested && (
        <View style={styles.section}>
          <Text style={styles.suggestLabel}>If you&apos;d like a place to start</Text>
          <PracticeCard
            practice={suggested}
            isFavorite={isFavorite(suggested.id)}
            onToggleFavorite={toggle}
          />
          <Text style={styles.suggestNote}>
            Only a suggestion — anything here is a fine place to begin.
          </Text>
        </View>
      )}

      {showWayIn && (
        <View style={styles.section}>
          <SectionHeader>Ways through</SectionHeader>
          <Text style={styles.waysIntro}>
            A few worn trails for common moments. None is required — enter anywhere, stop anywhere.
          </Text>
          {PATHS.map((p) => {
            const titles = pathSteps(p, profile?.gender)
              .map((s) => getPractice(s.flowId)?.title)
              .filter(Boolean)
              .join('  ·  ');
            return (
              <Card
                key={p.id}
                onPress={() => router.push({ pathname: '/path/[id]', params: { id: p.id } })}
                accessibilityLabel={p.title}
                style={styles.pathCard}>
                <Illustration name={p.icon ?? 'turning-arrow'} tone="soft" size={36} />
                <View style={styles.pathBody}>
                  <Text style={styles.pathTitle}>{p.title}</Text>
                  <Text style={styles.pathStepList} numberOfLines={2}>
                    {titles}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      )}

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
          // A hint isn't a search result, and locked deeper work stays gated —
          // so while searching, a locked depth contributes nothing.
          if (searching) return null;
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
        <Text style={styles.emptyNote}>
          {searching
            ? `Nothing here matches “${query.trim()}”.`
            : 'Nothing matches those filters — try clearing one.'}
        </Text>
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

  // The "way in" above the catalogue
  intro: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.accentMuted,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  introHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  introTitle: { ...typography.body, fontWeight: '500', color: colors.textPrimary },
  introSub: { ...typography.bodySmall, color: colors.textSecondary },
  situations: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },

  suggestLabel: { ...typography.caption, color: colors.textFaint },
  suggestNote: { ...typography.caption, color: colors.textFaint, fontStyle: 'italic' },

  waysIntro: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20, marginBottom: Spacing.one },
  pathCard: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
  pathBody: { flex: 1, gap: Spacing.half },
  pathTitle: { ...typography.body, fontWeight: '500' },
  pathStepList: { ...typography.caption, color: colors.textFaint, lineHeight: 18 },

  cluster: { gap: Spacing.two, marginTop: Spacing.one },
  clusterLabel: { ...typography.bodySmall, fontWeight: '500', color: colors.textSecondary },
  clusterIntro: { ...typography.caption, color: colors.textFaint, marginTop: -Spacing.one },
  lockedHint: {
    ...typography.bodySmall,
    color: colors.textFaint,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  shelfNote: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.half },
  emptyNote: { ...typography.body, color: colors.textSecondary },
});
