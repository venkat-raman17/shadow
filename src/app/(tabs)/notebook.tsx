import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Spacing, BottomTabInset, MaxContentWidth, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Illustration } from '@/components/illustrations';
import { FlipBookPager, type FlipBookPagerHandle } from '@/components/notebook/FlipBookPager';
import { TimelinePage } from '@/components/notebook/TimelinePage';
import { NotebookLockScreen } from '@/components/notebook/NotebookLockScreen';
import { useNotebookTimeline } from '@/hooks/useNotebookTimeline';
import { useNotebookLock } from '@/hooks/useNotebookLock';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { groupByMonth, SMALL_RECORD } from '@/lib/notebookTimeline';

const NOTEBOOK_CAP = 200;

function PageIndicator({
  count,
  index,
  labels,
  onDot,
}: {
  count: number;
  index: number;
  labels: string[];
  onDot: (i: number) => void;
}) {
  const styles = useThemedStyles(makeStyles);
  // Dots up to a point; past that, a quiet "n of m" — orientation, not a score.
  if (count > 10) {
    return (
      <Text style={styles.pageCount}>
        {index + 1} of {count}
      </Text>
    );
  }
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }, (_, i) => (
        <Pressable
          key={i}
          onPress={() => onDot(i)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={labels[i] ?? `Page ${i}`}>
          <View style={[styles.dot, i === index && styles.dotActive]} />
        </Pressable>
      ))}
    </View>
  );
}

// The notebook: a horizontal flip-book of ruled leaves, one per month (or a
// single leaf for a light record). Most-recent month is always the first leaf.
function NotebookContent() {
  const { items, setExperimentStatus } = useNotebookTimeline(NOTEBOOK_CAP);
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const reduced = useReducedMotion();
  const { width: winW } = useWindowDimensions();
  const pagerRef = useRef<FlipBookPagerHandle>(null);
  const [page, setPage] = useState(0);
  const [pagerHeight, setPagerHeight] = useState(0);

  const pageWidth = Math.min(winW, MaxContentWidth) - Spacing.four * 2;

  // One leaf per month; for a light record, a single un-chunked leaf so a
  // newcomer sees one tidy page rather than many near-empty months.
  const months = groupByMonth(items);
  const single = items.length <= SMALL_RECORD || months.length <= 1;

  const labels: string[] = [];
  const pages: React.ReactNode[] = [];

  if (items.length === 0 || single) {
    const lbl = months.length === 1 ? months[0].label : undefined;
    pages.push(
      <TimelinePage
        key="all"
        headerLabel={lbl}
        items={items}
        pageWidth={pageWidth}
        pageHeight={pagerHeight}
        onExperimentStatus={setExperimentStatus}
      />,
    );
    labels.push(lbl ?? 'Your history');
  } else {
    for (const m of months) {
      pages.push(
        <TimelinePage
          key={m.key}
          headerLabel={m.label}
          items={m.items}
          pageWidth={pageWidth}
          pageHeight={pagerHeight}
          onExperimentStatus={setExperimentStatus}
        />,
      );
      labels.push(m.label);
    }
  }

  const pageCount = pages.length;
  const safePage = Math.min(page, pageCount - 1);

  function goToPage(i: number) {
    pagerRef.current?.scrollToPage(i);
    setPage(i);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <Text style={styles.heading}>The Mirror</Text>
          <Pressable
            onPress={() => router.push('/search')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Search your reflections">
            <Illustration name="ui-search" size={22} maxStroke={9} color={colors.textSecondary} decorative />
          </Pressable>
        </View>

        <View
          style={styles.pagerWrap}
          onLayout={(e) => setPagerHeight(e.nativeEvent.layout.height)}>
          <FlipBookPager
            ref={pagerRef}
            pages={pages}
            pageWidth={pageWidth}
            pageHeight={pagerHeight}
            reduced={reduced}
            onPageChange={setPage}
          />
        </View>

        {pageCount > 1 ? (
          <PageIndicator count={pageCount} index={safePage} labels={labels} onDot={goToPage} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default function NotebookScreen() {
  const { enabled, locked, biometricAvailable, unlockWithPin, unlockWithBiometric } =
    useNotebookLock();
  const styles = useThemedStyles(makeStyles);

  // While the lock flag loads, show a plain ground rather than flashing content.
  if (enabled === null) return <View style={styles.safe} />;

  if (enabled && locked) {
    return (
      <View style={styles.safe}>
        <NotebookLockScreen
          onSubmitPin={unlockWithPin}
          onUseBiometric={unlockWithBiometric}
          biometricAvailable={biometricAvailable}
        />
      </View>
    );
  }

  // No entrance animation here: any opacity-0 entering frame (which React
  // Navigation can replay when the tab scene is detached/remounted on returning
  // from a pushed screen) would flash the bare window through. A plainly
  // backgrounded View paints the page colour immediately — never white.
  return (
    <View style={styles.safe}>
      <NotebookContent />
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    inner: {
      flex: 1,
      width: '100%',
      maxWidth: MaxContentWidth,
      alignSelf: 'center',
      paddingHorizontal: Spacing.four,
      paddingTop: Spacing.five,
      paddingBottom: BottomTabInset + Spacing.three,
      gap: Spacing.four,
    },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heading: { ...typography.display },

    pagerWrap: { flex: 1 },

    dots: { flexDirection: 'row', gap: Spacing.two, justifyContent: 'center', alignItems: 'center' },
    dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.border },
    dotActive: { backgroundColor: colors.accent },
    pageCount: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  });
