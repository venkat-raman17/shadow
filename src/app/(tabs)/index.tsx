import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, TextField, Button, Card } from '@/components/ui';
import { getItem, setItem } from '@/lib/kv';
import { routeFromText, suggestFlow } from '@/lib/threshold';
import {
  useParts,
  useSurfacingPatterns,
  useExperiments,
} from '@/hooks/useIntegration';
import { useHasPriorWork, useDaysSinceLastVisit } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';

const DEPTHS_SEEN_KEY = 'shadow.depths_seen';

// The few ways in (the spine). Each opens a short, branching entryway that
// re-routes from a couple of answers — not a flat menu of practices. The deeper
// 'sit' and 'carry' doors open once there's prior work, mirroring titration:
// notice and steady are always available, depth arrives when you're ready.
interface Entryway {
  id: string;
  title: string;
  sub: string;
  icon: SymbolViewProps['name'];
  gated: boolean;
}
const ENTRYWAYS: Entryway[] = [
  {
    id: 'entry.notice.v1',
    title: "Notice what's here",
    sub: 'A feeling, a person, a sensation',
    icon: { ios: 'eye', web: 'visibility' },
    gated: false,
  },
  {
    id: 'entry.sit.v1',
    title: 'Sit with a figure',
    sub: 'Meet a part of you, in writing',
    icon: { ios: 'bubble.left.and.bubble.right', web: 'forum' },
    gated: true,
  },
  {
    id: 'entry.carry.v1',
    title: 'Carry & return',
    sub: 'Bring it into your week',
    icon: { ios: 'arrow.forward.circle', web: 'arrow_forward' },
    gated: true,
  },
  {
    id: 'entry.steady.v1',
    title: 'Steady myself',
    sub: 'Come back when things speed up',
    icon: { ios: 'wind', web: 'air' },
    gated: false,
  },
];

function getGreeting(name: string | null): string {
  const suffix = name ? `, ${name}` : '';
  const h = new Date().getHours();
  if (h < 5) return `Still awake${suffix}.`;
  if (h < 12) return `Good morning${suffix}.`;
  if (h < 17) return `Good afternoon${suffix}.`;
  if (h < 21) return `Good evening${suffix}.`;
  return `Late night${suffix}.`;
}

// The flow to open when the user says "I'm not sure". Gathers the existing
// signals (no tracking, no new state) and hands the decision to suggestFlow in
// the threshold router, so "which flow comes next" lives in one place.
function useFallbackFlowId(firstRun: boolean): string {
  const patterns = useSurfacingPatterns(1);
  const parts = useParts();
  const { experiments } = useExperiments();
  const profile = useUserProfile();

  return suggestFlow({
    firstRun,
    topPatternCount: patterns[0]?.count ?? 0,
    hasParts: parts.length > 0,
    hasOpenExperiment: experiments.some((e) => e.status === 'open'),
    gender: profile?.gender,
    hour: new Date().getHours(),
  });
}

const LONG_GAP_DAYS = 14;

// A one-time, dismissible map of the three depths — shown only to a newcomer so
// the Notice → Sit → Carry spine isn't invisible. No ladder, no progress.
function DepthsCard({ onDismiss }: { onDismiss: () => void }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.depthsCard}>
      <View style={styles.nudgeHeader}>
        <Text style={styles.nudgeLabel}>How this works</Text>
        <Pressable onPress={onDismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SymbolView name={{ ios: 'xmark', web: 'close' }} size={13} tintColor={colors.textFaint} />
        </Pressable>
      </View>
      <Text style={styles.depthsBody}>
        A few ways in, no ladder. <Text style={styles.depthsWord}>Notice</Text> what&apos;s here ·{' '}
        <Text style={styles.depthsWord}>Sit</Text> with a figure ·{' '}
        <Text style={styles.depthsWord}>Carry</Text> one small thing ·{' '}
        <Text style={styles.depthsWord}>Steady</Text> yourself anytime.
      </Text>
      <Text style={styles.depthsSub}>
        No words for it? Just draw it. No streaks, no finishing — you return when you return.
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const profile = useUserProfile();
  const hasPriorWork = useHasPriorWork();
  const firstRun = !hasPriorWork;

  const fallbackFlowId = useFallbackFlowId(firstRun);
  const gapDays = useDaysSinceLastVisit();

  // A soft welcome after a moderate gap.
  const showWelcomeBack = gapDays !== null && gapDays >= 7 && gapDays < LONG_GAP_DAYS;

  const [text, setText] = useState('');
  // Deep doors (sit / carry) appear once there's prior work; notice & steady
  // are always open. Drawing and the open threshold sit above them all.
  const entryways = ENTRYWAYS.filter((e) => !e.gated || hasPriorWork);
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  // The first-run depths map: shown once to a newcomer, dismissible for good.
  const [depthsDismissed, setDepthsDismissed] = useState<boolean | null>(null);
  useEffect(() => {
    getItem(DEPTHS_SEEN_KEY).then((v) => setDepthsDismissed(v === '1'));
  }, []);
  function dismissDepths() {
    setDepthsDismissed(true);
    setItem(DEPTHS_SEEN_KEY, '1');
  }
  const showDepths = firstRun && depthsDismissed === false;

  function enter(flowId: string) {
    router.push(`/flow/${flowId}`);
  }

  function beginFromText() {
    const id = routeFromText(text, profile?.gender) ?? fallbackFlowId;
    enter(id);
  }

  return (
    <Screen withTabBar>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>{getGreeting(profile?.name ?? null)}</Text>
        <Pressable
          onPress={() => router.push('/settings')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <SymbolView
            name={{ ios: 'gearshape', web: 'settings' }}
            size={20}
            tintColor={colors.textSecondary}
          />
        </Pressable>
      </View>

      {showWelcomeBack && (
        <Text style={styles.welcomeBack}>Welcome back — no need to catch up.</Text>
      )}

      {/* The threshold: speak into it, or step through a doorway below. */}
      <View style={styles.threshold}>
        <Text style={styles.prompt}>What&apos;s here right now?</Text>
        <Text style={styles.promptSub}>
          A word or a sentence — whatever&apos;s present.
        </Text>

        <TextField
          value={text}
          onChangeText={setText}
          placeholder="Name it, however roughly…"
          multiline
          returnKeyType="go"
          onSubmitEditing={beginFromText}
        />

        <Button
          label={text.trim() ? 'Sit with this →' : 'Begin where I am →'}
          onPress={beginFromText}
        />

        <Button
          label="Or draw what's here →"
          variant="ghost"
          onPress={() => enter('noticing.draw_whats_here.v1')}
        />
      </View>

      {showDepths && <DepthsCard onDismiss={dismissDepths} />}

      <View style={styles.waysSection}>
        <Text style={styles.waysLabel}>Or choose a way in</Text>
        <View style={styles.tiles}>
          {entryways.map((e) => (
            <Card key={e.id} onPress={() => enter(e.id)} style={styles.tile}>
              <SymbolView name={e.icon} size={22} tintColor={colors.accent} />
              <View style={styles.tileText}>
                <Text style={styles.tileTitle}>{e.title}</Text>
                <Text style={styles.tileSub}>{e.sub}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <Pressable style={styles.quickRow} onPress={() => enter('noticing.in_the_moment.v1')}>
        <SymbolView name={{ ios: 'bolt.heart', web: 'bolt' }} size={15} tintColor={colors.accentWarm} />
        <Text style={styles.nowLinkText}>Something just happened — catch it now →</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Nothing you write here leaves this device. No account, no cloud, no AI.
        </Text>
      </View>
    </Screen>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { ...typography.display },
  welcomeBack: { ...typography.body, color: colors.textSecondary, marginTop: -Spacing.one },

  // Threshold
  threshold: { gap: Spacing.three },
  prompt: { ...typography.serifPrompt, fontSize: 28, lineHeight: 38 },
  promptSub: { ...typography.body, color: colors.textSecondary, marginTop: -Spacing.one },

  nowLinkText: { ...typography.body, color: colors.accentWarm },

  // Ways in (entry tiles)
  waysSection: { gap: Spacing.two },
  waysLabel: { ...typography.caption, color: colors.textFaint },
  tiles: { gap: Spacing.two },
  tile: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.three },
  tileText: { flex: 1, gap: 2 },
  tileTitle: { ...typography.body, color: colors.textPrimary },
  tileSub: { ...typography.bodySmall, color: colors.textSecondary },

  // Depths map (first-run)
  depthsCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.accentMuted,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  depthsBody: { ...typography.serifBody, color: colors.textPrimary },
  depthsWord: { color: colors.accent },
  depthsSub: { ...typography.bodySmall, color: colors.textSecondary },

  // Shared header used by the depths map
  nudgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nudgeLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },

  // Quick "catch it now" link
  quickRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },

  footer: { marginTop: Spacing.two, paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
