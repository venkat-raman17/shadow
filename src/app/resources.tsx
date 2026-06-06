import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, Spacing, BottomTabInset } from '@/constants/theme';
import type { CrisisResources } from '@/types/flow';

// Bundled at build time — never fetched from network
const resources: CrisisResources = require('@/assets/resources/crisis.json');

export default function ResourcesScreen() {
  function openLine(action: string) {
    Linking.openURL(action).catch(() => {});
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Support</Text>
        <Text style={styles.subheading}>
          If you're in crisis or need immediate help, reach out to a person.
        </Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Crisis lines</Text>
          {resources.lines.map((line) => (
            <TouchableOpacity
              key={line.action}
              style={styles.lineCard}
              onPress={() => openLine(line.action)}>
              <View style={styles.lineContent}>
                <Text style={styles.lineLabel}>{line.label}</Text>
                <Text style={styles.lineMeta}>
                  {line.kind === 'call' ? 'Tap to call' : line.kind === 'text' ? 'Tap to text' : 'Tap to open'}
                </Text>
              </View>
              <Text style={styles.lineArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About Shadow</Text>
          <Text style={styles.body}>
            This app is a private space for reflection. It is not therapy and cannot provide crisis
            support. For acute distress, please contact a crisis line or a mental health professional.
          </Text>
          <Text style={styles.body}>
            Nothing you write in Shadow leaves your device. There are no accounts, no servers, and no
            AI involved in v1.
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
  heading: { ...typography.heading, fontSize: 26, lineHeight: 34 },
  subheading: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
  divider: { height: 1, backgroundColor: colors.border },
  section: { gap: Spacing.three },
  sectionLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textSecondary,
  },
  lineCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  lineContent: { flex: 1, gap: Spacing.half },
  lineLabel: { ...typography.body },
  lineMeta: { ...typography.caption, color: colors.accent },
  lineArrow: { ...typography.body, color: colors.textSecondary },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 26 },
});
