import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';

export type UserRole = 'patient' | 'doctor' | 'hospital' | 'pharmacy' | 'ambulance';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (identifier: string, method: 'phone' | 'email') => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  setUserRole: (role: UserRole) => Promise<void>;
  completeProfile: (profileData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement persistent auth state
    // For now, just simulate checking auth state
    const checkAuthState = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For testing, you can set a mock user here
        // setUser({ id: '1', fullName: 'Test User', email: 'test@example.com', phone: '+1234567890', role: 'patient' });
      } catch (error) {
        console.error('Auth state check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const signIn = async (identifier: string, method: 'phone' | 'email') => {
    setIsLoading(true);
    try {
      // TODO: Implement actual sign in logic
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/auth/otp');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual OTP verification
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/auth/role-select');
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setUserRole = async (role: UserRole) => {
    setIsLoading(true);
    try {
      // TODO: Implement role setting logic
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/auth/profile-completion');
    } catch (error) {
      console.error('Role setting error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeProfile = async (profileData: Partial<User>) => {
    setIsLoading(true);
    try {
      // TODO: Implement profile completion logic
      // For now, just simulate a delay and set mock user
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser: User = {
        id: '1', // This should come from the backend
        fullName: profileData.fullName || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        role: profileData.role || 'patient',
        ...profileData,
      };
      setUser(newUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Profile completion error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement sign out logic
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);
      router.replace('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        verifyOtp,
        setUserRole,
        completeProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 