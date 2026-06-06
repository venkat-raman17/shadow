import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { getItem } from '@/lib/kv';

import { colors } from '@/constants/theme';
import { migrateDbIfNeeded } from '@/lib/db';
import { CryptoProvider, useCrypto } from '@/context/CryptoContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="shadow.db" onInit={migrateDbIfNeeded}>
      <CryptoProvider>
        <RootNavigator />
      </CryptoProvider>
    </SQLiteProvider>
  );
}

function RootNavigator() {
  const { ready: cryptoReady } = useCrypto();
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    getItem('shadow.onboarding_complete').then((val) => {
      setOnboardingDone(val === 'true');
    });
  }, []);

  const appReady = cryptoReady && onboardingDone !== null;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Protected guard={!!onboardingDone}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="flow/[id]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Back' }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!onboardingDone}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
