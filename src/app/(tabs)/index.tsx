import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Screen, TextField, Button, Card, AmbientBackground } from '@/components/ui';
import { getItem, setItem } from '@/lib/kv';
import { routeFromText, suggestFlow } from '@/lib/threshold';
import { useResurfacing } from '@/hooks/useEntries';
import {
  useParts,
  useSurfacingPatterns,
  useExperiments,
  useReturnInvitation,
} from '@/hooks/useIntegration';
import { useHasPriorWork, useDaysSinceLastVisit } from '@/hooks/useProgress';
import { useUserProfile } from '@/hooks/useUserProfile';
import type { EntryDetail, ExperimentItem, ReturnablePart } from '@/lib/db';

const DAY_MS = 24 * 60 * 60 * 1000;
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

// A one-step warmth for the ambient wash — the page reads cooler by day and a
// touch warmer late, like a lamp coming up. One step, never a gradient (a smooth
// shift would look like the theme is drifting).
function timeWarmth(): number {
  const h = new Date().getHours();
  if (h < 5 || h >= 21) return 1.3; // late night / pre-dawn — warmest
  if (h >= 17) return 1.15; // evening
  if (h < 9) return 0.85; // early morning — coolest
  return 1; // daytime
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

function relativeWhen(ms: number): string {
  const days = Math.floor((Date.now() - ms) / DAY_MS);
  if (days < 14) return 'last week';
  if (days < 40) return 'a few weeks ago';
  if (days < 75) return 'last month';
  if (days < 200) return 'a few months ago';
  return 'a while ago';
}

const REFLECT_AGE_MS = 3 * DAY_MS;
const LONG_GAP_DAYS = 14;

// The single thread to pick back up, chosen from existing gentle signals in a
// fixed priority. After a long time away we don't open deep work — we offer an
// easy way back in (titration, mirroring the threshold's "settle before depth").
type PickBackUp =
  | { kind: 'ease' }
  | { kind: 'reflect'; experiment: ExperimentItem }
  | { kind: 'return'; part: ReturnablePart }
  | { kind: 'pattern'; quality: string }
  | { kind: 'resurface'; entry: EntryDetail };

function choosePickBackUp(args: {
  gapDays: number | null;
  experiments: ExperimentItem[];
  returnPart: ReturnablePart | null;
  patterns: { quality: string; count: number }[];
  resurfaced: EntryDetail | null;
}): PickBackUp | null {
  const { gapDays, experiments, returnPart, patterns, resurfaced } = args;

  // Back after a long gap: lead with low-friction re-entry, not depth.
  if (gapDays !== null && gapDays >= LONG_GAP_DAYS) return { kind: 'ease' };

  const reflectable = experiments.find(
    (e) => e.status === 'open' && Date.now() - e.created_at > REFLECT_AGE_MS,
  );
  if (reflectable) return { kind: 'reflect', experiment: reflectable };

  if (returnPart) return { kind: 'return', part: returnPart };

  const top = patterns.find((p) => p.count >= 2);
  if (top) return { kind: 'pattern', quality: top.quality };

  if (resurfaced) return { kind: 'resurface', entry: resurfaced };

  return null;
}

// The copy + destination for each kind. Calm, first-person, never a demand.
function pickDisplay(pick: PickBackUp): {
  label: string;
  body: string;
  cta: string;
  go: () => void;
} {
  switch (pick.kind) {
    case 'ease':
      return {
        label: 'Welcome back',
        body: 'No need to catch up. Take a slow minute to settle, then start wherever you are.',
        cta: 'Settle for a moment →',
        go: () => router.push('/flow/grounding.settle.v1'),
      };
    case 'reflect':
      return {
        label: 'Something you’re carrying',
        body: `You set out to: ${pick.experiment.description}. How has that been going?`,
        cta: 'Reflect on this →',
        go: () => router.push({ pathname: '/reflect/[id]', params: { id: pick.experiment.id } }),
      };
    case 'return':
      return {
        label: 'A thread to pick back up',
        body: `It’s been a while since you sat with ${pick.part.name ?? 'this part'}. Return — what’s here now?`,
        cta: 'Return →',
        go: () => router.push({ pathname: '/part/[id]', params: { id: pick.part.id } }),
      };
    case 'pattern':
      return {
        label: 'What keeps surfacing',
        body: `“${pick.quality}” has come up more than once. Sit with the part that carries it?`,
        cta: 'Sit with it →',
        go: () =>
          router.push({
            pathname: '/flow/[id]',
            params: { id: 'meeting.active_imagination.v1', seedQuality: pick.quality },
          }),
      };
    case 'resurface': {
      const text =
        (pick.entry.reclaim && pick.entry.reclaim.trim()) ||
        (pick.entry.subject && pick.entry.subject.trim()) ||
        '';
      return {
        label: 'Something you sat with before',
        body: text,
        cta: `From ${relativeWhen(pick.entry.created_at)} · revisit →`,
        go: () => router.push({ pathname: '/entry/[id]', params: { id: pick.entry.id } }),
      };
    }
  }
}

// One calm, dismissible card so a returning user lands on a thread to pick back
// up, not a blank threshold. Pull-only, never a notification, never persisted.
function PickBackUpCard({ pick, onDismiss }: { pick: PickBackUp; onDismiss: () => void }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { label, body, cta, go } = pickDisplay(pick);
  if (!body) return null;
  return (
    <View style={styles.pickCard}>
      <View style={styles.nudgeHeader}>
        <Text style={styles.nudgeLabel}>{label}</Text>
        <Pressable onPress={onDismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SymbolView name={{ ios: 'xmark', web: 'close' }} size={13} tintColor={colors.textFaint} />
        </Pressable>
      </View>
      <Pressable onPress={go}>
        <Text style={styles.pickText} numberOfLines={3}>
          {body}
        </Text>
        <Text style={styles.pickCta}>{cta}</Text>
      </Pressable>
    </View>
  );
}

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

  // Gentle continuation signals — all pull-only, all already in the app.
  const { experiments } = useExperiments();
  const returnPart = useReturnInvitation();
  const patterns = useSurfacingPatterns(1);
  const { entry: resurfaced, dismiss: dismissResurfaced } = useResurfacing();

  const [pickDismissed, setPickDismissed] = useState(false);
  const pick = pickDismissed
    ? null
    : choosePickBackUp({ gapDays, experiments, returnPart, patterns, resurfaced });

  function dismissPick() {
    // If the thread was a resurfaced entry, advance its pool too so the same one
    // doesn't reappear this session.
    if (pick?.kind === 'resurface') dismissResurfaced();
    setPickDismissed(true);
  }

  // A soft welcome after a moderate gap; longer gaps get the 'ease' card instead.
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
    <Screen withTabBar backdrop={<AmbientBackground intensity={timeWarmth()} />}>
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

      {/* A single thread to pick back up, above the threshold — continuity for a
          returning user, invisible to a newcomer (no signals yet). */}
      {pick && <PickBackUpCard pick={pick} onDismiss={dismissPick} />}

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

  // Pick-back-up card (and the shared header used by the depths map)
  pickCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: Spacing.three,
    gap: Spacing.two,
  },
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
  pickText: { ...typography.serifBody, color: colors.textPrimary },
  pickCta: { ...typography.caption, color: colors.accentWarm, marginTop: Spacing.one },

  // Quick "catch it now" link
  quickRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },

  footer: { marginTop: Spacing.two, paddingTop: Spacing.three },
  footerText: { ...typography.caption, textAlign: 'center', lineHeight: 20 },
});
