import React from 'react';
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/constants/theme-context';

export default function TabsLayout() {
  const { colors, typography } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
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
            <SymbolView name={{ ios: 'house', web: 'home' }} size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="integration"
        options={{
          title: 'Reflections',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'book.closed', web: 'menu_book' }} size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'lifepreserver', web: 'support' }} size={24} tintColor={color} />
          ),
        }}
      />
    </Tabs>
  );
}
