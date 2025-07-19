import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { HostelProvider } from '@/contexts/HostelContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useRouter, useSegments } from 'expo-router';

function AuthGateWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <_AuthGate>{children}</_AuthGate>
    </AuthProvider>
  );
}

function _AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, isEmailVerified } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    console.log("Segments:", segments);
    console.log("User:", user);
    console.log("Email Verified:", isEmailVerified);
    
    if (!user || !isEmailVerified) {
      if (!inAuthGroup) {
        router.replace('/auth/login');
      }
    } else {
      if (inAuthGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [user, loading, isEmailVerified, segments]);

  if (loading) return null;

  return <>{children}</>;
}

export default function CustomLayout() {
  useFrameworkReady();

  return (
    <HostelProvider>
      <AuthGateWrapper>
        <Slot />
      </AuthGateWrapper>
    </HostelProvider>
  );
}
