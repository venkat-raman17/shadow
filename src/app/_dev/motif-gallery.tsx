import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Svg from 'react-native-svg';

import { palettes, Spacing, type Palette } from '@/constants/theme';
import { MOTIFS, type IllustrationKey, type MotifColors } from '@/components/illustrations/motifs';

/**
 * DEV-only visual QA for the motif library. Renders every motif at icon→cover
 * sizes against all three palettes at once, so we can confirm small-size
 * legibility (16/22) and theme reactivity without flipping the app theme. Not
 * linked from any navigation; returns nothing in a production build.
 */

const SIZES = [16, 22, 34, 64] as const;
const THEMES: { name: string; c: Palette }[] = [
  { name: 'dark', c: palettes.dark },
  { name: 'light', c: palettes.light },
  { name: 'sepia', c: palettes.sepia },
];

// Mirror of Illustration's tonePalette (kept local so the dev screen never
// depends on the live ThemeContext — it draws each palette explicitly).
function mc(c: Palette, sw: number): MotifColors {
  return { primary: c.accent, secondary: c.accentMuted, fill: c.accentSoft, warm: c.accentWarm, sw };
}

function Glyph({ name, size, c }: { name: IllustrationKey; size: number; c: Palette }) {
  const sw = Number(Math.min((1.6 / size) * 100, 9).toFixed(2));
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {MOTIFS[name](mc(c, sw))}
    </Svg>
  );
}

export default function MotifGalleryScreen() {
  if (!__DEV__) return null;

  const keys = Object.keys(MOTIFS) as IllustrationKey[];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <Stack.Screen options={{ title: `Motifs (${keys.length})` }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {THEMES.map((t) => (
          <View key={t.name} style={[styles.section, { backgroundColor: t.c.background }]}>
            <Text style={[styles.theme, { color: t.c.textSecondary }]}>{t.name}</Text>
            <View style={styles.grid}>
              {keys.map((k) => (
                <View key={k} style={styles.cell}>
                  <View style={styles.row}>
                    {SIZES.map((s) => (
                      <View key={s} style={styles.slot}>
                        <Glyph name={k} size={s} c={t.c} />
                      </View>
                    ))}
                  </View>
                  <Text style={[styles.label, { color: t.c.textFaint }]}>{k}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.three, gap: Spacing.four },
  section: { borderRadius: 12, padding: Spacing.three, gap: Spacing.three },
  theme: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  cell: { width: 150, gap: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, height: 64 },
  slot: { alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 11 },
});
