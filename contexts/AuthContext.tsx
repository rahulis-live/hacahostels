import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/firebaseconfig';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isEmailVerified: boolean;
  sendEmailVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  updateUserPassword: async () => {},
  isEmailVerified: false,
  sendEmailVerification: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsEmailVerified(firebaseUser?.emailVerified || false);
      setLoading(false);
      
      // Log authentication events for security monitoring
      if (firebaseUser) {
        console.log('User authenticated:', firebaseUser.uid);
      } else {
        console.log('User signed out');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsEmailVerified(false);
    } catch (error: any) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
      throw error;
    }
  };

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) {
      throw new Error('No authenticated user found');
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(newPassword)) {
      throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    }

    try {
      // Re-authenticate user before password change
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
    } catch (error: any) {
      console.error('Password update error:', error);
      if (error.code === 'auth/wrong-password') {
        throw new Error('Current password is incorrect');
      }
      throw new Error('Failed to update password. Please try again.');
    }
  };

  const sendEmailVerification = async () => {
    if (!user) {
      throw new Error('No authenticated user found');
    }

    try {
      const { sendEmailVerification: sendVerification } = await import('firebase/auth');
      await sendVerification(user);
    } catch (error: any) {
      console.error('Email verification error:', error);
      throw new Error('Failed to send verification email. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signOut: handleSignOut,
      updateUserPassword,
      isEmailVerified,
      sendEmailVerification,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);