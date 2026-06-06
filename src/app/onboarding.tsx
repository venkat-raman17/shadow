import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setItem } from '@/lib/kv';

import { colors, typography, Spacing } from '@/constants/theme';

export default function OnboardingScreen() {
  async function handleAcknowledge() {
    await setItem('shadow.onboarding_complete', 'true');
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Before we begin</Text>

        <View style={styles.section}>
          <Text style={styles.body}>
            Shadow is a space for slow inner work — noticing your reactions, meeting the parts of
            yourself you've pushed away, and sitting with what you find.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>This app is not for you right now if:</Text>
          <Text style={styles.listItem}>
            — You're in active crisis, or having thoughts of suicide or self-harm.
          </Text>
          <Text style={styles.listItem}>
            — You're processing fresh or acute trauma.
          </Text>
          <Text style={styles.listItem}>
            — You need immediate emotional support from another person.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.body}>
            If any of those fit right now, please reach out to a person who can actually help. The
            Support tab has crisis lines you can call or text immediately.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.body}>
            This is not therapy. It won't replace a therapist, and it won't monitor your safety. It's
            a private container for reflection — nothing more, and nothing less.
          </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleAcknowledge}>
          <Text style={styles.btnText}>I understand — take me in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.four,
    flexGrow: 1,
  },
  heading: { ...typography.heading, fontSize: 26, lineHeight: 34 },
  section: { gap: Spacing.two },
  sectionLabel: {
    ...typography.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.textSecondary,
    marginBottom: Spacing.one,
  },
  body: { ...typography.body, color: colors.textSecondary, lineHeight: 28 },
  listItem: { ...typography.body, color: colors.textSecondary, lineHeight: 28 },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: Spacing.one,
  },
  btn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  btnText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.background,
  },
});
