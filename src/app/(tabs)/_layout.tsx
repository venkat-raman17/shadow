import React from 'react';
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/constants/theme-context';
import { TabBarBackground } from '@/components/ui';

export default function TabsLayout() {
  const { colors, typography } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
            <SymbolView name={{ ios: 'house', web: 'home' }} size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'figure.mind.and.body', web: 'self_improvement' }} size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notebook"
        options={{
          title: 'Notebook',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'note.text', web: 'article' }} size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="integration"
        options={{
          title: 'Reflections',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'sparkles', web: 'auto_awesome' }} size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'books.vertical', web: 'auto_stories' }} size={24} tintColor={color} />
          ),
        }}
      />
    </Tabs>
  );
}
