import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Star, Eye, MessageSquare } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [userType, setUserType] = useState<'seeker' | 'lister'>('seeker');

  const ProfileStat = ({ icon: Icon, label, value, color }: {
    icon: any;
    label: string;
    value: string;
    color: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Icon size={20} color="#ffffff" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({ icon: Icon, label, onPress, showSwitch = false, switchValue, onSwitchToggle, rightText }: {
    icon: any;
    label: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchToggle?: (value: boolean) => void;
    rightText?: string;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon size={20} color="#6b7280" />
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      {showSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchToggle}
          trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
          thumbColor={switchValue ? '#ffffff' : '#ffffff'}
        />
      )}
      {rightText && <Text style={styles.menuItemRight}>{rightText}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JS</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#3b82f6" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>John Smith</Text>
            <Text style={styles.userInfo}>Student ID: HC2024001</Text>
            <Text style={styles.userInfo}>Haris and Co Institute</Text>
          </View>

          <View style={styles.userTypeSelector}>
            <TouchableOpacity 
              style={[styles.typeButton, userType === 'seeker' && styles.activeTypeButton]}
              onPress={() => setUserType('seeker')}
            >
              <Text style={[styles.typeButtonText, userType === 'seeker' && styles.activeTypeButtonText]}>
                Seeker
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeButton, userType === 'lister' && styles.activeTypeButton]}
              onPress={() => setUserType('lister')}
            >
              <Text style={[styles.typeButtonText, userType === 'lister' && styles.activeTypeButtonText]}>
                Lister
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <ProfileStat
            icon={Eye}
            label="Profile Views"
            value="24"
            color="#3b82f6"
          />
          <ProfileStat
            icon={MessageSquare}
            label="Messages"
            value="8"
            color="#10b981"
          />
          <ProfileStat
            icon={Star}
            label="Favorites"
            value="12"
            color="#f59e0b"
          />
        </View>

        <MenuSection title="Account Settings">
          <MenuItem
            icon={User}
            label="Personal Information"
            onPress={() => {}}
          />
          <MenuItem
            icon={Shield}
            label="Privacy & Security"
            onPress={() => {}}
          />
          <MenuItem
            icon={Bell}
            label="Notifications"
            showSwitch={true}
            switchValue={notificationsEnabled}
            onSwitchToggle={setNotificationsEnabled}
          />
          <MenuItem
            icon={Settings}
            label="Location Services"
            showSwitch={true}
            switchValue={locationEnabled}
            onSwitchToggle={setLocationEnabled}
          />
        </MenuSection>

        <MenuSection title="Preferences">
          <MenuItem
            icon={Settings}
            label="Search Preferences"
            onPress={() => {}}
          />
          <MenuItem
            icon={Bell}
            label="Notification Settings"
            onPress={() => {}}
          />
          <MenuItem
            icon={User}
            label="Profile Visibility"
            rightText="Public"
            onPress={() => {}}
          />
        </MenuSection>

        <MenuSection title="Support">
          <MenuItem
            icon={HelpCircle}
            label="Help & Support"
            onPress={() => {}}
          />
          <MenuItem
            icon={MessageSquare}
            label="Contact Us"
            onPress={() => {}}
          />
          <MenuItem
            icon={Star}
            label="Rate App"
            onPress={() => {}}
          />
        </MenuSection>

        <MenuSection title="Legal">
          <MenuItem
            icon={Shield}
            label="Terms of Service"
            onPress={() => {}}
          />
          <MenuItem
            icon={Shield}
            label="Privacy Policy"
            onPress={() => {}}
          />
        </MenuSection>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 Haris Hostel Finder</Text>
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
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  userTypeSelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTypeButton: {
    backgroundColor: '#3b82f6',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTypeButtonText: {
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 14,
    color: '#1f2937',
    marginLeft: 12,
  },
  menuItemRight: {
    fontSize: 14,
    color: '#6b7280',
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9ca3af',
  },
});