import { Linking, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

import { Card, Screen, SectionHeader } from '@/components/ui';
import { Spacing, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/constants/theme-context';
import { getDeviceRegion } from '@/lib/locale';
import type { CrisisResources } from '@/types/flow';

// Bundled at build time — never fetched from network
const resources: CrisisResources = require('@/assets/resources/crisis.json');

// Resolved once at module load. A null/unknown region falls back to the
// international directory, so a user is never shown another country's numbers.
const DEVICE_REGION = getDeviceRegion();
const REGIONAL = (DEVICE_REGION && resources.regions[DEVICE_REGION]) || null;
const CRISIS_LINES = REGIONAL ? REGIONAL.lines : resources.international.lines;
const SHOWING_INTERNATIONAL = !REGIONAL;

// Gentle "both/and" referral — not a fallback for failure, a complement. Broad
// directories that resolve to the visitor's own country.
const THERAPY_DIRECTORIES = [
  { label: 'Find a therapist — Psychology Today', action: 'https://www.psychologytoday.com' },
  { label: 'Find a Jungian analyst — IAAP', action: 'https://iaap.org/find-an-analyst/' },
];

export default function ResourcesScreen() {
  const styles = useThemedStyles(makeStyles);
  function openLine(action: string) {
    Linking.openURL(action).catch(() => {});
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Support' }} />
      <Screen>
        <Text style={styles.heading}>Support</Text>
        <Text style={styles.subheading}>
          If you&apos;re in crisis or need immediate help, reach out to a person.
        </Text>

        <View style={styles.section}>
          <SectionHeader>Reach out to someone</SectionHeader>
          {CRISIS_LINES.map((line) => (
            <Card key={line.action} onPress={() => openLine(line.action)} style={styles.lineCard}>
              <View style={styles.lineContent}>
                <Text style={styles.lineLabel}>{line.label}</Text>
                <Text style={styles.lineMeta}>
                  {line.kind === 'call'
                    ? 'Tap to call'
                    : line.kind === 'text'
                      ? 'Tap to text'
                      : 'Tap to open'}
                </Text>
              </View>
              <Text style={styles.lineArrow}>→</Text>
            </Card>
          ))}
          {SHOWING_INTERNATIONAL && (
            <Text style={styles.note}>
              These open a directory that will find a line for your country.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader>Working with someone</SectionHeader>
          <Text style={styles.body}>
            This app and a good therapist aren&apos;t either/or — they&apos;re both/and. If something
            here keeps surfacing, or feels too big to hold alone, working with a person can go where an
            app can&apos;t. That&apos;s not failure; it&apos;s wisdom.
          </Text>
          {THERAPY_DIRECTORIES.map((d) => (
            <Card key={d.action} onPress={() => openLine(d.action)} style={styles.lineCard}>
              <View style={styles.lineContent}>
                <Text style={styles.lineLabel}>{d.label}</Text>
                <Text style={styles.lineMeta}>Tap to open</Text>
              </View>
              <Text style={styles.lineArrow}>→</Text>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader>About Partwise</SectionHeader>
          <Text style={styles.body}>
            This app is a private space for reflection. It is not therapy and cannot provide crisis
            support. For acute distress, please contact a crisis line or a mental health professional.
          </Text>
          <Text style={styles.body}>
            Nothing you write in Partwise leaves your device. There are no accounts, no servers, and no
            AI involved.
          </Text>
        </View>
      </Screen>
    </>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  heading: { ...typography.display },
  subheading: { ...typography.body, color: colors.textSecondary },
  section: { gap: Spacing.two },
  lineCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  lineContent: { flex: 1, gap: Spacing.half },
  lineLabel: { ...typography.body },
  lineMeta: { ...typography.caption, color: colors.accent },
  lineArrow: { ...typography.body, color: colors.textSecondary },
  note: { ...typography.caption, color: colors.textFaint, marginTop: Spacing.one },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
});
