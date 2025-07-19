import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { LogOut, Trash2, HelpCircle, Shield, Camera, Key, Mail } from 'lucide-react-native';
import { useHostels } from '@/contexts/HostelContext';
import { useAuth } from '@/contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { router } from 'expo-router';

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  studentId: string;
  institute: string;
}

const initialUser: UserProfile = {
  id: 'current-user',
  name: 'John Smith',
  avatar: undefined, // Add image URL if available
  studentId: 'HC2024001',
  institute: 'Haris and Co Institute',
};

export default function ProfileScreen() {
  const { hostels, deleteHostel } = useHostels();
  const { user, signOut, isEmailVerified, sendEmailVerification } = useAuth();
  const userHostels = hostels.filter(h => h.ownerId === initialUser.id);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [sendingVerification, setSendingVerification] = useState(false);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteHostel(id) },
    ]);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access media library is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUser(prev => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/auth/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleSendVerification = async () => {
    setSendingVerification(true);
    try {
      await sendEmailVerification();
      Alert.alert('Success', 'Verification email sent! Please check your inbox.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send verification email');
    } finally {
      setSendingVerification(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} activeOpacity={0.7}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatar}>
                  <Camera size={28} color="#fff" style={{ position: 'absolute', alignSelf: 'center', top: 26 }} />
                  <Text style={styles.avatarText}>{user.name.split(' ').map(n => n[0]).join('')}</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userInfo}>
              {user?.email || 'No email available'}
            </Text>
            {!isEmailVerified && (
              <TouchableOpacity
                style={styles.verificationButton}
                onPress={handleSendVerification}
                disabled={sendingVerification}
              >
                <Mail size={16} color="#ef4444" />
                <Text style={styles.verificationText}>
                  {sendingVerification ? 'Sending...' : 'Verify Email'}
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.avatarHint}>Tap photo to change</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Listings</Text>
          {userHostels.length === 0 ? (
            <Text style={styles.emptyText}>You have not listed any hostels yet.</Text>
          ) : (
            userHostels.map(hostel => (
              <View key={hostel.id} style={styles.hostelCard}>
                <Image source={{ uri: hostel.image }} style={styles.hostelImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.hostelName}>{hostel.name}</Text>
                  <Text style={styles.hostelAddress}>{hostel.address}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(hostel.id)} style={styles.deleteBtn}>
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Security</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/auth/change-password')}>
            <Key size={20} color="#6b7280" />
            <Text style={styles.menuItemLabel}>Change Password</Text>
          </TouchableOpacity>
          {isEmailVerified ? (
            <View style={styles.menuItem}>
              <Mail size={20} color="#10b981" />
              <Text style={[styles.menuItemLabel, { color: '#10b981' }]}>Email Verified</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.menuItem} onPress={handleSendVerification}>
              <Mail size={20} color="#ef4444" />
              <Text style={[styles.menuItemLabel, { color: '#ef4444' }]}>
                {sendingVerification ? 'Sending Verification...' : 'Verify Email'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color="#6b7280" />
            <Text style={styles.menuItemLabel}>Help & Support</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#6b7280" />
            <Text style={styles.menuItemLabel}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#6b7280" />
            <Text style={styles.menuItemLabel}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    zIndex: 1,
  },
  avatarHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  verificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  verificationText: {
    fontSize: 12,
    color: '#ef4444',
    marginLeft: 4,
    fontWeight: '600',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  section: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 12,
  },
  hostelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
  hostelImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  hostelName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  hostelAddress: {
    fontSize: 12,
    color: '#6b7280',
  },
  deleteBtn: {
    marginLeft: 10,
    padding: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemLabel: {
    fontSize: 14,
    color: '#1f2937',
    marginLeft: 12,
  },
});