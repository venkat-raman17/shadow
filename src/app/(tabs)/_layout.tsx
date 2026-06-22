import React from 'react';
import { Tabs } from 'expo-router';

import { useTheme } from '@/constants/theme-context';
import { TabBarBackground } from '@/components/ui';
import { Illustration } from '@/components/illustrations';

export default function TabsLayout() {
  const { colors, typography } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Paint the scene container the app background so a detached/re-attached
        // tab scene never reveals the bare (white) window beneath it.
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: typography.caption.fontFamily,
          fontSize: 11,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Illustration name="tab-home" size={30} maxStroke={8} color={color} decorative />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color }) => (
            <Illustration name="tab-practice" size={30} maxStroke={8} color={color} decorative />
          ),
        }}
      />
      <Tabs.Screen
        name="notebook"
        options={{
          title: 'Notebook',
          tabBarIcon: ({ color }) => (
            <Illustration name="tab-notebook" size={30} maxStroke={8} color={color} decorative />
          ),
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => (
            <Illustration name="tab-library" size={30} maxStroke={8} color={color} decorative />
          ),
        }}
      />
    </Tabs>
  );
}
