import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "feed", icon: "🏠", label: "Feed" },
    { id: "snaps", icon: "⚡", label: "Snaps" },
    { id: "stream", icon: "▶️", label: "Stream" },
    { id: "chats", icon: "💬", label: "Chats" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#002843', '#001C30']}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.nav}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => onTabChange(tab.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                  <Animated.Text
                    style={[styles.tabIcon, isActive && styles.activeTabIcon]}
                  >
                    {tab.icon}
                  </Animated.Text>
                  {isActive && (
                    <View style={styles.activeIndicator} />
                  )}
                </View>
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 8,
  },
  gradientContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: '#64CCC533',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 4,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#64CCC522',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    // Additional styling for active icon container
  },
  tabIcon: {
    fontSize: 20,
    color: '#64CCC5',
  },
  activeTabIcon: {
    color: '#DAFFFB',
    fontSize: 22,
    textShadowColor: '#64CCC5',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#64CCC5',
  },
  tabLabel: {
    fontSize: 10,
    color: '#64CCC5',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#DAFFFB',
    fontWeight: '600',
  },
});
