import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingScreenProps {
  onNext: () => void;
}

export function OnboardingScreen1({ onNext }: OnboardingScreenProps) {
  return (
    <LinearGradient
      colors={['#001C30', '#003454', '#176B87']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>UNEXA</Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✨</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Connect & Share</Text>
          <Text style={styles.subtitle}>
            The ultimate social experience combining all your favorite features
            in one place
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
  logoContainer: {
    marginBottom: 48,
  },
  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#64CCC5',
    letterSpacing: 8,
    textShadowColor: 'rgba(100, 204, 197, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  iconContainer: {
    marginBottom: 32,
  },
  icon: {
    fontSize: 96,
    textAlign: 'center',
    color: '#64CCC5',
    textShadowColor: 'rgba(100, 204, 197, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
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
