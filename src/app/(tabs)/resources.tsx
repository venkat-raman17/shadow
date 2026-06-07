import { Linking, StyleSheet, Text, View } from 'react-native';

import { Card, Screen, SectionHeader } from '@/components/ui';
import { colors, Spacing, typography } from '@/constants/theme';
import type { CrisisResources } from '@/types/flow';

// Bundled at build time — never fetched from network
const resources: CrisisResources = require('@/assets/resources/crisis.json');

export default function ResourcesScreen() {
  function openLine(action: string) {
    Linking.openURL(action).catch(() => {});
  }

  return (
    <Screen withTabBar>
      <Text style={styles.heading}>Support</Text>
      <Text style={styles.subheading}>
        If you&apos;re in crisis or need immediate help, reach out to a person.
      </Text>

      <View style={styles.section}>
        <SectionHeader>Crisis lines</SectionHeader>
        {resources.lines.map((line) => (
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
  );
}

const styles = StyleSheet.create({
  heading: { ...typography.display },
  subheading: { ...typography.body, color: colors.textSecondary },
  section: { gap: Spacing.two },
  lineCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  lineContent: { flex: 1, gap: Spacing.half },
  lineLabel: { ...typography.body },
  lineMeta: { ...typography.caption, color: colors.accent },
  lineArrow: { ...typography.body, color: colors.textSecondary },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
});
