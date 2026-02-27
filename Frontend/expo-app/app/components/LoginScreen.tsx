import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { authAPI } from '../utils/api';

interface LoginScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginScreen({ onLogin, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      // Token is automatically stored by authAPI.login
      console.log('Login successful:', response);
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>UNEXA</Text>
        <Text style={styles.subtitle}>Welcome back</Text>
      </View>

      <View style={styles.form}>
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

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={onSignup}>
            <Text style={styles.signupText}>Create account</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
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
    marginTop: 32,
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
  subtitle: {
    color: '#64CCC5',
    marginTop: 8,
    fontSize: 14,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
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
    paddingVertical: 16,
    borderRadius: 16,
    fontSize: 16,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  forgotText: {
    color: '#64CCC5',
    fontSize: 14,
  },
  loginButton: {
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
  loginButtonDisabled: {
    backgroundColor: '#176B8780',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  loginButtonText: {
    color: '#DAFFFB',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#64CCC5',
    fontSize: 14,
  },
  signupText: {
    color: '#DAFFFB',
    fontWeight: '600',
  },
});
