import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SignupScreenProps {
  onSignup: () => void;
  onLogin: () => void;
}

export function SignupScreen({ onSignup, onLogin }: SignupScreenProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>UNEXA</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#64CCC580"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>@</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#64CCC580"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#64CCC580"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#64CCC580"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={onSignup}>
            <LinearGradient
              colors={['#176B87', '#64CCC5']}
              style={styles.signupButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.signupButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C30',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#64CCC5',
    letterSpacing: 8,
    textShadowColor: 'rgba(100, 204, 197, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  subtitle: {
    color: '#64CCC5',
    marginTop: 8,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    backgroundColor: '#176B874D',
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#64CCC580',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 40,
    color: '#64CCC580',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: '#64CCC5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  cameraIcon: {
    fontSize: 16,
    color: '#001C30',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    marginTop: -12,
    fontSize: 20,
    color: '#64CCC5',
    zIndex: 1,
  },
  input: {
    backgroundColor: '#176B8733',
    borderWidth: 1,
    borderColor: '#176B8766',
    color: '#DAFFFB',
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 14,
    borderRadius: 16,
    fontSize: 16,
  },
  signupButton: {
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#64CCC5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 8,
  },
  signupButtonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#001C30',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#64CCC5',
    fontSize: 14,
  },
  loginText: {
    color: '#DAFFFB',
    fontWeight: '600',
  },
});
