import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the type for TabScreenOptions
type TabScreenOptions = {
  title: string;
  tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => JSX.Element;
};

export default function TabLayout(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        } as TabScreenOptions}
      />
      <Tabs.Screen
        name="coinlist"
        options={{
          title: 'Coin List',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'logo-bitcoin' : 'logo-bitcoin'} color={color} />
          ),
        } as TabScreenOptions}
      />
      <Tabs.Screen
        name="deposit"
        options={{
          title: 'Deposit',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'arrow-down' : 'arrow-down'} color={color} />
          ),
        } as TabScreenOptions}
      />
    </Tabs>
  );
}
