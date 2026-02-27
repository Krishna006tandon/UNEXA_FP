import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { authAPI } from '../utils/api';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function SettingsScreen({ onBack, onLogout }: SettingsScreenProps) {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { label: "Profile Settings", icon: "👤" },
        { label: "Password & Security", icon: "🔒" },
        { label: "Privacy Settings", icon: "👁️" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Notifications", icon: "🔔" },
        { label: "Language & Region", icon: "🌍" },
        { label: "Data & Storage", icon: "🛡️" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Help Center", icon: "❓" },
        { label: "About UNEXA", icon: "ℹ️" },
      ],
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await authAPI.logout();
              onLogout();
            } catch (error) {
              console.error('Logout error:', error);
              // Still navigate to login even if API call fails
              onLogout();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings List */}
      <View style={styles.content}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.itemIcon}>{item.icon}</Text>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text style={styles.versionText}>UNEXA v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#176B8740',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#64CCC5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#DAFFFB',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  groupContainer: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64CCC5',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  groupItems: {
    backgroundColor: '#00284380',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#176B8720',
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: '#DAFFFB',
  },
  chevron: {
    fontSize: 20,
    color: '#64CCC580',
  },
  logoutContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4D6A20',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4D6A',
  },
  versionText: {
    textAlign: 'center',
    color: '#64CCC580',
    fontSize: 14,
  },
});
