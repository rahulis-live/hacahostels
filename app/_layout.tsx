import { Slot } from 'expo-router';
import { HostelProvider } from '@/contexts/HostelContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  console.log('AuthGate loading:', loading);
  if (loading) return null;
  // Add redirect logic here if needed
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