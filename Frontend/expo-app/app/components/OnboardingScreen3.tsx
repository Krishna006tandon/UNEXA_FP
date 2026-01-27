import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen3({ onGetStarted }: OnboardingScreenProps) {
  return (
    <LinearGradient
      colors={['#001C30', '#003454', '#176B87']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>⚡</Text>
            <View style={styles.iconGlow} />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Fast & Futuristic</Text>
          <Text style={styles.subtitle}>
            Experience the next generation of social media with lightning-fast
            performance and stunning design
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <LinearGradient
          colors={['#176B87', '#64CCC5']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </LinearGradient>
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
  iconContainer: {
    marginBottom: 48,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 120,
    color: '#64CCC5',
    textShadowColor: 'rgba(100, 204, 197, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  iconGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: '#64CCC5',
    borderRadius: 100,
    opacity: 0.3,
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
    borderRadius: 16,
    shadowColor: '#64CCC5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#001C30',
    fontSize: 18,
    fontWeight: '600',
  },
});
