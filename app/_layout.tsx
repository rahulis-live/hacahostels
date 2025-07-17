import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { HostelProvider } from '@/contexts/HostelContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <HostelProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </HostelProvider>
  );
}
