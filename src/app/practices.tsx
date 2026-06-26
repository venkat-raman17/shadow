import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { Screen, SectionHeader, Chip, Card, SearchField } from '@/components/ui';
import { Illustration } from '@/components/illustrations';
import { PracticeCard } from '@/components/PracticeCard';
import {
  practicesByDepth,
  practicesByGroup,
  getPractice,
  isQuick,
  DEPTHS,
  THEME_GROUPS,
  type Depth,
  type Practice,
  type ThemeGroup,
} from '@/lib/practices';
import { searchPractices } from '@/lib/practiceSearch';
import { PATHS, pathSteps } from '@/lib/paths';
import { useHasPriorWork } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSuggestedFlow } from '@/hooks/useSuggestedFlow';
import { useSurfacingPatterns } from '@/hooks/useIntegration';
import { useFavorites } from '@/hooks/useFavorites';

type TimeFilter = 'all' | 'quick' | 'long';

const FRONT_TAGLINE =
  'A few ways in, depending on where you are. Pick a door — or browse everything. Enter anywhere, stop anywhere.';

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
  const profile = useUserProfile();

  // Deeper work (sit / carry) opens once there's something to build on — the
  // same progressive-disclosure gate Home uses.
  const hasPriorWork = useHasPriorWork();

  // The Workshop opens as a question-first front door (selectedTheme === null):
  // a few themed "doors." Picking one shows just that door's practices; the rest
  // stays a step behind a quiet "Browse everything" ('all'). Search always wins.
  const [selectedTheme, setSelectedTheme] = useState<ThemeGroup | 'all' | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;
  const isFrontDoor = selectedTheme === null && !searching;

  const suggested = getPractice(useSuggestedFlow());

  // What's been surfacing lately, in family form — floats the matching door to
  // the top of the front door, already open. Words only; the count is never shown.
  const topFamily = useSurfacingPatterns(1)[0]?.quality;

  const timeAllowed = (p: Practice) =>
    timeFilter === 'all' ? true : timeFilter === 'quick' ? isQuick(p) : !isQuick(p);
  // Gender + time gating, shared by the theme and browse-all lists. Search has its
  // own ranked path (renderSearch → searchPractices), so it isn't folded in here.
  const show = (p: Practice) => genderAllowed(p) && timeAllowed(p);

  // A depth (and so its doors) stays gated until there's prior work.
  const depthLocked = (depth: Depth) =>
    !!DEPTHS.find((d) => d.depth === depth)?.lockedHint && !hasPriorWork;

  // The doors offered on the front door: an unlocked depth with at least one
  // practice this user can see. The one matching the top surfacing quality floats
  // first, already open.
  const visibleDoors = THEME_GROUPS.filter(
    (t) => !depthLocked(t.depth) && practicesByGroup(t.group).some(genderAllowed),
  );
  const featured = topFamily
    ? visibleDoors.find((t) => t.match?.qualities?.includes(topFamily))
    : undefined;
  const orderedDoors = featured
    ? [featured, ...visibleDoors.filter((t) => t !== featured)]
    : visibleDoors;

  // The "Yours" shelf: pinned practices the user chose, resolved through the
  // catalogue so removed/renamed flows simply drop out. Shown on the front door
  // once there's prior work.
  const pinned = favorites
    .map((id) => getPractice(id))
    .filter((p): p is Practice => !!p && genderAllowed(p));
  const showShelf = hasPriorWork && pinned.length > 0;

  // A depth's practices, broken into its theme sub-headers when it holds more
  // than one door; single-door depths render flat (the depth header already
  // names them). Any practice without a recognized door falls to a flat tail.
  function renderThemes(depth: Depth, items: Practice[]) {
    const doors = THEME_GROUPS.filter((t) => t.depth === depth);
    if (doors.length <= 1) {
      return items.map((p) => (
        <PracticeCard key={p.id} practice={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggle} />
      ));
    }
    const ungrouped = items.filter((p) => !doors.some((d) => d.group === p.group));
    return (
      <>
        {doors.map((door) => {
          const inGroup = items.filter((p) => p.group === door.group);
          if (inGroup.length === 0) return null;
          return (
            <View key={door.group} style={styles.cluster}>
              <Text style={styles.clusterLabel}>{door.label}</Text>
              <Text style={styles.clusterIntro}>{door.intro}</Text>
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
          <PracticeCard key={p.id} practice={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggle} />
        ))}
      </>
    );
  }

  function renderFrontDoor() {
    return (
      <>
        <Text style={styles.question}>Where would you like to begin?</Text>

        <View style={styles.doors}>
          {orderedDoors.map((door) => {
            const isFeatured = door === featured;
            return (
              <View key={door.group} style={styles.doorWrap}>
                {isFeatured ? (
                  <Text style={styles.featuredCaption}>Lately this keeps surfacing —</Text>
                ) : null}
                <Card
                  onPress={() => setSelectedTheme(door.group)}
                  accessibilityLabel={`${door.label}. ${door.intro}`}
                  style={styles.doorCard}>
                  <Illustration name={door.icon} tone="soft" size={36} decorative />
                  <View style={styles.doorBody}>
                    <Text style={styles.doorLabel}>{door.label}</Text>
                    <Text style={styles.doorIntro}>{door.intro}</Text>
                  </View>
                </Card>
              </View>
            );
          })}
        </View>

        {showShelf && (
          <View style={styles.section}>
            <SectionHeader>Yours</SectionHeader>
            {pinned.map((p) => (
              <PracticeCard key={p.id} practice={p} isFavorite onToggleFavorite={toggle} />
            ))}
            <Text style={styles.shelfNote}>No pressure to use these — return when one calls you.</Text>
          </View>
        )}

        {suggested && (
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

        <Pressable
          onPress={() => setSelectedTheme('all')}
          accessibilityRole="button"
          style={styles.browseLink}>
          <Text style={styles.browseLinkText}>Browse everything →</Text>
        </Pressable>
      </>
    );
  }

  function renderThemeView(group: ThemeGroup) {
    const door = THEME_GROUPS.find((t) => t.group === group);
    const items = practicesByGroup(group).filter(show);
    return (
      <>
        <Pressable
          onPress={() => setSelectedTheme(null)}
          accessibilityRole="button"
          style={styles.backLink}>
          <Text style={styles.backLinkText}>← All ways in</Text>
        </Pressable>
        <View style={styles.section}>
          <SectionHeader>{door?.label ?? 'Practices'}</SectionHeader>
          {door?.intro ? <Text style={styles.themeIntro}>{door.intro}</Text> : null}
          {items.length > 0 ? (
            items.map((p) => (
              <PracticeCard
                key={p.id}
                practice={p}
                isFavorite={isFavorite(p.id)}
                onToggleFavorite={toggle}
              />
            ))
          ) : (
            <Text style={styles.emptyNote}>Nothing here fits that filter — try clearing it.</Text>
          )}
        </View>
      </>
    );
  }

  function renderBrowseAll() {
    const totalCards = DEPTHS.filter((d) => !depthLocked(d.depth)).reduce(
      (n, d) => n + practicesByDepth(d.depth).filter(show).length,
      0,
    );
    const anyLockedShown = DEPTHS.some((d) => depthLocked(d.depth));
    const showEmpty = totalCards === 0 && !anyLockedShown;
    return (
      <>
        <Pressable
          onPress={() => setSelectedTheme(null)}
          accessibilityRole="button"
          style={styles.backLink}>
          <Text style={styles.backLinkText}>← Ways in</Text>
        </Pressable>

        {DEPTHS.map((group) => {
          // Notice and the grounding toolkit are always open; deeper work
          // (sit / carry) waits until there's something to build on.
          if (depthLocked(group.depth)) {
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
              {renderThemes(group.depth, items)}
            </View>
          );
        })}

        {showEmpty && (
          <Text style={styles.emptyNote}>Nothing matches that filter — try clearing it.</Text>
        )}
      </>
    );
  }

  function renderSearch() {
    // Ranked matches across title / keywords / blurb+subtitle / theme + chips,
    // then the same gender / time / depth-lock gating the lists use — so locked
    // deeper work stays out of results until there's prior work, and the ranked
    // order is preserved.
    const results = searchPractices(q).filter(
      (p) => genderAllowed(p) && timeAllowed(p) && !depthLocked(p.depth),
    );
    if (results.length === 0) {
      return <Text style={styles.emptyNote}>Nothing here matches “{query.trim()}”.</Text>;
    }
    return results.map((p) => (
      <PracticeCard key={p.id} practice={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggle} />
    ));
  }

  return (
    <Screen>
      <Text style={styles.heading}>The Workshop</Text>
      {isFrontDoor && <Text style={styles.tagline}>{FRONT_TAGLINE}</Text>}

      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder="Search practices…"
        accessibilityLabel="Search practices"
      />

      {/* The time filter narrows a list of cards; it's hidden on the calm front door. */}
      {!isFrontDoor && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}>
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
      )}

      {searching
        ? renderSearch()
        : selectedTheme === null
          ? renderFrontDoor()
          : selectedTheme === 'all'
            ? renderBrowseAll()
            : renderThemeView(selectedTheme)}
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    heading: { ...typography.display },
    tagline: { ...typography.body, color: colors.textSecondary },
    filterRow: { gap: Spacing.two, alignItems: 'center', paddingVertical: Spacing.half },
    section: { gap: Spacing.two },

    // Front door
    question: { ...typography.serifPrompt },
    doors: { gap: Spacing.two },
    doorWrap: { gap: Spacing.one },
    featuredCaption: { ...typography.caption, color: colors.textFaint, fontStyle: 'italic' },
    doorCard: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
    doorBody: { flex: 1, gap: Spacing.half },
    doorLabel: { ...typography.body, fontWeight: '500' },
    doorIntro: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 18 },

    browseLink: { alignSelf: 'flex-start', paddingVertical: Spacing.two },
    browseLinkText: { ...typography.body, color: colors.accent },
    backLink: { alignSelf: 'flex-start', paddingVertical: Spacing.one },
    backLinkText: { ...typography.bodySmall, color: colors.textSecondary },

    suggestLabel: { ...typography.caption, color: colors.textFaint },
    suggestNote: { ...typography.caption, color: colors.textFaint, fontStyle: 'italic' },

    waysIntro: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: Spacing.one,
    },
    pathCard: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
    pathBody: { flex: 1, gap: Spacing.half },
    pathTitle: { ...typography.body, fontWeight: '500' },
    pathStepList: { ...typography.caption, color: colors.textFaint, lineHeight: 18 },

    // Theme view + browse-all sub-headers
    themeIntro: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
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
