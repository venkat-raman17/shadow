import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Spacing, radii, BottomTabInset, MaxContentWidth, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Card } from '@/components/ui';
import { ChargeGauge } from '@/components/ChargeGauge';
import { SketchView, parseSketch } from '@/components/Sketch';
import { FlipBookPager, type FlipBookPagerHandle } from '@/components/notebook/FlipBookPager';
import { ReflectionsPage } from '@/components/notebook/ReflectionsPage';
import { NotebookLockScreen } from '@/components/notebook/NotebookLockScreen';
import { useRecentEntries } from '@/hooks/useEntries';
import { useNotebookLock } from '@/hooks/useNotebookLock';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { EntryListItem } from '@/lib/db';

const NOTEBOOK_CAP = 200;
const PAGE_SIZE = 6; // entries per page (a 2-column grid)
const COL_GAP = Spacing.two;

function formatDate(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));
}

function monthLabel(ms: number): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(ms));
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function EntryCard({ entry, width }: { entry: EntryListItem; width: number }) {
  const styles = useThemedStyles(makeStyles);
  const sketch = parseSketch(entry.sketch);
  const inner = width - Spacing.three * 2;
  const thumbH = Math.round(inner * 0.62);

  return (
    <Card
      onPress={() => router.push({ pathname: '/entry/[id]', params: { id: entry.id } })}
      style={[styles.card, { width }]}>
      {sketch ? (
        <View style={[styles.thumb, { width: inner, height: thumbH }]}>
          <SketchView data={sketch} width={inner} height={thumbH} />
        </View>
      ) : entry.subject ? (
        <Text style={styles.cardTitle} numberOfLines={3}>
          {entry.subject}
        </Text>
      ) : (
        <Text style={[styles.cardTitle, styles.cardTitleEmpty]} numberOfLines={1}>
          A quiet noticing
        </Text>
      )}
      <Text style={styles.cardDate}>{formatDate(entry.created_at)}</Text>
      {entry.quality ? (
        <Text style={styles.cardQuality} numberOfLines={1}>
          {entry.quality}
        </Text>
      ) : null}
      {entry.charge !== null ? (
        <ChargeGauge charge={entry.charge} word={false} width={Math.min(inner, 120)} />
      ) : null}
    </Card>
  );
}

function NotebookPage({ entries, pageWidth }: { entries: EntryListItem[]; pageWidth: number }) {
  const styles = useThemedStyles(makeStyles);
  const colWidth = (pageWidth - COL_GAP) / 2;
  const month = entries.length ? monthLabel(entries[0].created_at) : '';
  return (
    <View style={[styles.page, { width: pageWidth }]}>
      {month ? <Text style={styles.pageMonth}>{month}</Text> : null}
      <View style={styles.grid}>
        {entries.map((e) => (
          <EntryCard key={e.id} entry={e} width={colWidth} />
        ))}
      </View>
    </View>
  );
}

function PageIndicator({
  count,
  index,
  onDot,
}: {
  count: number;
  index: number;
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
          accessibilityLabel={i === 0 ? 'Reflections' : `Page ${i}`}>
          <View style={[styles.dot, i === index && styles.dotActive]} />
        </Pressable>
      ))}
    </View>
  );
}

// The notebook itself: a horizontal flip-book whose first page is your
// reflections (your inner world) and whose following pages are your entries.
function NotebookContent() {
  const entries = useRecentEntries(NOTEBOOK_CAP);
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const reduced = useReducedMotion();
  const { width: winW } = useWindowDimensions();
  const pagerRef = useRef<FlipBookPagerHandle>(null);
  const [page, setPage] = useState(0);
  const [pagerHeight, setPagerHeight] = useState(0);

  const pageWidth = Math.min(winW, MaxContentWidth) - Spacing.four * 2;
  const gridPages = chunk(entries, PAGE_SIZE);

  const pages: React.ReactNode[] = [
    <ReflectionsPage key="reflections" width={pageWidth} />,
    ...gridPages.map((items, i) => (
      <NotebookPage key={`grid-${i}`} entries={items} pageWidth={pageWidth} />
    )),
  ];
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
          <Text style={styles.heading}>Notebook</Text>
          <Pressable
            onPress={() => router.push('/search')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Search your reflections">
            <SymbolView
              name={{ ios: 'magnifyingglass', web: 'search' }}
              size={20}
              tintColor={colors.textSecondary}
            />
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
          <PageIndicator count={pageCount} index={safePage} onDot={goToPage} />
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
      <NotebookLockScreen
        onSubmitPin={unlockWithPin}
        onUseBiometric={unlockWithBiometric}
        biometricAvailable={biometricAvailable}
      />
    );
  }

  return <NotebookContent />;
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
    page: { gap: Spacing.three, paddingTop: Spacing.one },
    pageMonth: { ...typography.caption, textTransform: 'uppercase', letterSpacing: 1, color: colors.textFaint },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: COL_GAP },

    card: { gap: Spacing.one, alignSelf: 'flex-start' },
    thumb: { backgroundColor: colors.surface, borderRadius: radii.md, overflow: 'hidden', alignSelf: 'flex-start' },
    cardTitle: { ...typography.body, fontWeight: '500', lineHeight: 22 },
    cardTitleEmpty: { fontWeight: '400', fontStyle: 'italic', color: colors.textSecondary },
    cardDate: { ...typography.caption, color: colors.textSecondary },
    cardQuality: { ...typography.bodySmall, fontStyle: 'italic' },

    dots: { flexDirection: 'row', gap: Spacing.two, justifyContent: 'center', alignItems: 'center' },
    dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.border },
    dotActive: { backgroundColor: colors.accent },
    pageCount: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  });
