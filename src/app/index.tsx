import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, Spacing, BottomTabInset } from '@/constants/theme';
import { useRecentEntries } from '@/hooks/useEntries';
import type { EntryListItem } from '@/lib/db';

const HISTORY_HOME_LIMIT = 5;

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Still awake.';
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  if (h < 21) return 'Good evening.';
  return 'Late night.';
}

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));
}

function ChargeDots({ charge }: { charge: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: 10 }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i < charge ? styles.dotFilled : styles.dotEmpty]}
        />
      ))}
    </View>
  );
}

function EntryRow({ entry }: { entry: EntryListItem }) {
  return (
    <View style={styles.entryRow}>
      <View style={styles.entryMeta}>
        <Text style={styles.entryDate}>{formatDate(entry.created_at)}</Text>
        {entry.quality ? (
          <Text style={styles.entryQuality}>{entry.quality}</Text>
        ) : null}
      </View>
      {entry.charge !== null ? <ChargeDots charge={entry.charge} /> : null}
    </View>
  );
}

function NoticingHistory({ entries }: { entries: EntryListItem[] }) {
  if (entries.length === 0) return null;

  const shown = entries.slice(0, HISTORY_HOME_LIMIT);
  const hasMore = entries.length >= HISTORY_HOME_LIMIT;

  return (
    <View style={styles.historySection}>
      <Text style={styles.historyLabel}>What you've noticed</Text>
      {shown.map((entry) => (
        <EntryRow key={entry.id} entry={entry} />
      ))}
      {hasMore ? (
        <TouchableOpacity
          style={styles.seeAllLink}
          onPress={() => router.push('/history')}>
          <Text style={styles.seeAllText}>See all →</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const entries = useRecentEntries(HISTORY_HOME_LIMIT + 1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>{getGreeting()}</Text>

        <Text style={styles.tagline}>
          A quiet space to notice what your reactions are pointing at.
        </Text>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.practiceCard}
          onPress={() => router.push('/flow/noticing.projection_recall.v1')}>
          <Text style={styles.cardLabel}>Today's practice</Text>
          <Text style={styles.cardTitle}>Who got under your skin?</Text>
          <Text style={styles.cardBody}>
            A few minutes. Notice a reaction, name the quality, sit with what's underneath it.
          </Text>
          <Text style={styles.cardCta}>Begin →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.practiceCard}
          onPress={() => router.push('/flow/meeting.active_imagination.v1')}>
          <Text style={styles.cardLabel}>Meeting</Text>
          <Text style={styles.cardTitle}>Meet a part of you</Text>
          <Text style={styles.cardBody}>
            Sit with something difficult, or reclaim something you've admired from afar. You write both voices.
          </Text>
          <Text style={styles.cardCta}>Begin →</Text>
        </TouchableOpacity>

        <NoticingHistory entries={entries} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Nothing you write here leaves this device. No account, no cloud, no AI.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.four,
    flexGrow: 1,
  },
  greeting: { ...typography.heading, fontSize: 28, lineHeight: 36 },
  tagline: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  divider: { height: 1, backgroundColor: colors.border },
  practiceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: Spacing.four,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.accent,
  },
  cardTitle: { ...typography.heading, fontSize: 20 },
  cardBody: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  cardCta: { ...typography.body, color: colors.accentWarm, marginTop: Spacing.one },

  // History section
  historySection: { gap: Spacing.two },
  historyLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
    marginBottom: Spacing.one,
  },
  entryRow: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: Spacing.three,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryDate: { ...typography.caption, color: colors.textSecondary },
  entryQuality: { ...typography.bodySmall, fontStyle: 'italic' },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  dotFilled: { backgroundColor: colors.accentWarm },
  dotEmpty: { backgroundColor: colors.border },
  seeAllLink: { alignSelf: 'flex-end', paddingTop: Spacing.one },
  seeAllText: { ...typography.caption, color: colors.accent },

  footer: { marginTop: 'auto', paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
