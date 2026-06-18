import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import * as Notifications from 'expo-notifications';
import {
  useFonts,
  Newsreader_400Regular,
  Newsreader_500Medium,
} from '@expo-google-fonts/newsreader';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import type { Theme } from '@/constants/theme';
import { ThemeProvider, useTheme, useThemedStyles } from '@/constants/theme-context';
import { migrateDbIfNeeded } from '@/lib/db';
import { CryptoProvider, useCrypto } from '@/context/CryptoContext';
import { SessionProvider, useSession } from '@/context/SessionContext';
import { AppErrorBoundary } from '@/components/ErrorBoundary';
import { useAppLock } from '@/hooks/useAppLock';
import { LockScreen } from '@/components/LockScreen';

// Show notifications when the app is in the foreground (e.g. user is in the app
// when a scheduled reminder fires). Without this, foreground notifications are silently dropped.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppErrorBoundary>
      <KeyboardProvider>
        <ThemeProvider>
          <SQLiteProvider databaseName="shadow.db" onInit={migrateDbIfNeeded}>
            <CryptoProvider>
              <SessionProvider>
                <RootNavigator />
              </SessionProvider>
            </CryptoProvider>
          </SQLiteProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </AppErrorBoundary>
  );
}

function RootNavigator() {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { ready: cryptoReady } = useCrypto();
  const { enabled: lockEnabled, locked, unlock } = useAppLock();
  const { onboardingDone } = useSession();

  // Load the serif display font. If it fails, proceed anyway — text falls back
  // to the platform serif rather than blocking the app behind the splash.
  const [fontsLoaded, fontError] = useFonts({
    Newsreader_400Regular,
    Newsreader_500Medium,
  });

  const appReady =
    cryptoReady &&
    onboardingDone !== null &&
    lockEnabled !== null &&
    (fontsLoaded || !!fontError);

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

  // The optional app lock sits in front of the journal — but never the
  // onboarding gate (a new user can't have enabled it).
  if (onboardingDone && lockEnabled && locked) {
    return <LockScreen onUnlock={unlock} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Protected guard={!!onboardingDone}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="flow/[id]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Home' }}
        />
        <Stack.Screen
          name="reflect/[id]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Reflections' }}
        />
        <Stack.Screen
          name="entry/[id]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="part/[id]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="practices"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Home' }}
        />
        <Stack.Screen name="history" />
        <Stack.Screen
          name="search"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="reading"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Home' }}
        />
        <Stack.Screen
          name="reading/[id]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Reading' }}
        />
        <Stack.Screen
          name="sketch/[partId]"
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.textSecondary, headerBackTitle: 'Back' }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!onboardingDone}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
