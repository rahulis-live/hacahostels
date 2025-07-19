import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  User,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification as firebaseSendEmailVerification
} from 'firebase/auth';
import { Alert } from 'react-native';
import { auth } from '@/firebaseconfig';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isEmailVerified: boolean;
  sendEmailVerification: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsEmailVerified(firebaseUser?.emailVerified ?? false);
      setLoading(false);

      if (firebaseUser) {
        console.log('User authenticated:', firebaseUser.uid);
      } else {
        console.log('User signed out');
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsEmailVerified(false);
    } catch (error: any) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
      throw error;
    }
  };

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) {
      throw new Error('No authenticated user found');
    }

    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const strongPasswordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!strongPasswordRegex.test(newPassword)) {
      throw new Error('Password must contain uppercase, lowercase, number, and special character');
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
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
      await firebaseSendEmailVerification(user);
    } catch (error: any) {
      console.error('Email verification error:', error);
      throw new Error('Failed to send verification email. Please try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        updateUserPassword,
        isEmailVerified,
        sendEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
