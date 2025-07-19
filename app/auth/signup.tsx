import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '@/firebaseconfig';
import { router } from 'expo-router';
import { Eye, EyeOff, Check, X } from 'lucide-react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
   const isMounted = useRef(true);

   useEffect(() => {
     return () => {
       isMounted.current = false;
     };
   }, []);

  // Password strength validation
  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordRequirements).every(Boolean);

  // Input validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Full name is required');
      return false;
    }
    if (name.trim().length < 2) {
      Alert.alert('Validation Error', 'Name must be at least 2 characters');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Password is required');
      return false;
    }
    if (!isPasswordStrong) {
      Alert.alert('Validation Error', 'Password does not meet security requirements');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return false;
    }
    if (!acceptedTerms) {
      Alert.alert('Validation Error', 'Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      Alert.alert(
        'Account Created Successfully!',
        'A verification email has been sent to your email address. Please verify your email before logging in.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Sign out the user until they verify their email
              auth.signOut();
              router.replace('/auth/login');
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Account creation failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
      }
      
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <View style={styles.requirementRow}>
      {met ? <Check size={16} color="#10b981" /> : <X size={16} color="#ef4444" />}
      <Text style={[styles.requirementText, { color: met ? '#10b981' : '#ef4444' }]}>
        {text}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
        textContentType="name"
        autoComplete="name"
        style={styles.input}
        editable={!loading}
      />
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        style={styles.input}
        editable={!loading}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          textContentType="newPassword"
          autoComplete="password-new"
          style={styles.passwordInput}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
          disabled={loading}
        >
          {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
        </TouchableOpacity>
      </View>

      {password.length > 0 && (
        <View style={styles.passwordRequirements}>
          <Text style={styles.requirementsTitle}>Password Requirements:</Text>
          <PasswordRequirement met={passwordRequirements.length} text="At least 8 characters" />
          <PasswordRequirement met={passwordRequirements.uppercase} text="One uppercase letter" />
          <PasswordRequirement met={passwordRequirements.lowercase} text="One lowercase letter" />
          <PasswordRequirement met={passwordRequirements.number} text="One number" />
          <PasswordRequirement met={passwordRequirements.special} text="One special character (@$!%*?&)" />
        </View>
      )}
      
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          textContentType="newPassword"
          style={styles.passwordInput}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={loading}
        >
          {showConfirmPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
        </TouchableOpacity>
      </View>

      {confirmPassword.length > 0 && (
        <View style={styles.passwordMatch}>
          {password === confirmPassword ? (
            <View style={styles.requirementRow}>
              <Check size={16} color="#10b981" />
              <Text style={[styles.requirementText, { color: '#10b981' }]}>Passwords match</Text>
            </View>
          ) : (
            <View style={styles.requirementRow}>
              <X size={16} color="#ef4444" />
              <Text style={[styles.requirementText, { color: '#ef4444' }]}>Passwords do not match</Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
        disabled={loading}
      >
        <View style={[styles.checkbox, acceptedTerms && styles.checkedBox]}>
          {acceptedTerms && <Check size={16} color="#fff" />}
        </View>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.signupButton, loading && styles.disabledButton]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.replace('/auth/login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeButton: {
    padding: 12,
  },
  passwordRequirements: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    marginLeft: 8,
  },
  passwordMatch: {
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  signupButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#3b82f6',
    textAlign: 'center',
  },
});
