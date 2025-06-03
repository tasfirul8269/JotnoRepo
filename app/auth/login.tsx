import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Phone, Mail } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!identifier) return;
    
    setError('');
    setIsLoading(true);
    try {
      await signIn(identifier, loginMethod);
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Logo and Welcome Text */}
      <View style={styles.header}>
        <Image 
          source={require('@/assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      {/* Login Method Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, loginMethod === 'phone' && styles.activeToggle]}
          onPress={() => setLoginMethod('phone')}
        >
          <Phone stroke={loginMethod === 'phone' ? Colors.primary : Colors.gray} size={20} />
          <Text style={[styles.toggleText, loginMethod === 'phone' && styles.activeToggleText]}>
            Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, loginMethod === 'email' && styles.activeToggle]}
          onPress={() => setLoginMethod('email')}
        >
          <Mail stroke={loginMethod === 'email' ? Colors.primary : Colors.gray} size={20} />
          <Text style={[styles.toggleText, loginMethod === 'email' && styles.activeToggleText]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={loginMethod === 'phone' ? 'Enter your phone number' : 'Enter your email'}
          placeholderTextColor={Colors.gray}
          keyboardType={loginMethod === 'phone' ? 'phone-pad' : 'email-address'}
          value={identifier}
          onChangeText={value => {
            setIdentifier(value);
            setError('');
          }}
          autoCapitalize="none"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, (!identifier || isLoading) && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={!identifier || isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Please wait...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Link href="/auth/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeToggle: {
    backgroundColor: Colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeToggleText: {
    color: Colors.primary,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
}); 