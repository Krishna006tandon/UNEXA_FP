import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingScreenProps {
  onNext: () => void;
}

export function OnboardingScreen2({ onNext }: OnboardingScreenProps) {
  return (
    <LinearGradient
      colors={['#001C30', '#003454', '#176B87']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.iconsContainer}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>📹</Text>
          </View>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>💬</Text>
          </View>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>📷</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>All-in-One Platform</Text>
          <Text style={styles.subtitle}>
            Stream videos, chat with friends, share snaps, and post your
            moments—all in UNEXA
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 48,
  },
  iconBox: {
    width: 80,
    height: 80,
    backgroundColor: '#176B87',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#176B87',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
  },
  icon: {
    fontSize: 40,
    color: '#64CCC5',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#DAFFFB',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#64CCC5',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#176B87',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#176B87',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
  },
  buttonText: {
    color: '#DAFFFB',
    fontSize: 18,
    fontWeight: '600',
  },
});
