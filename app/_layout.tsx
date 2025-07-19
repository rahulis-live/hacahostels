import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { HostelProvider } from '@/contexts/HostelContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, isEmailVerified } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Wait for auth state to load

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user) {
      // User is not authenticated, redirect to login
      if (!inAuthGroup) {
        router.replace('/auth/login');
      }
    } else {
      // User is authenticated
      if (!isEmailVerified) {
        // Email not verified, keep them on auth screens or redirect to login
        if (!inAuthGroup) {
          router.replace('/auth/login');
        }
      } else {
        // User is authenticated and verified, redirect to main app
        if (inAuthGroup) {
          router.replace('/(tabs)');
        }
      }
    }
  }, [user, loading, isEmailVerified, segments]);

  // Show loading screen while determining auth state
  if (loading) {
    return null; // You could show a loading spinner here
  }

  return <>{children}</>;
}

export default function CustomLayout() {
  return (
    <AuthProvider>
      <HostelProvider>
        <AuthGate>
          <Slot />
        </AuthGate>
      </HostelProvider>
    </AuthProvider>
  );
}