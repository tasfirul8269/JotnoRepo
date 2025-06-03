/* Removed duplicate role-select screen (use role.tsx instead) */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { User, Stethoscope, Building2, Pill } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

type UserRole = 'patient' | 'doctor' | 'hospital' | 'pharmacy';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function RoleSelectScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles: RoleOption[] = [
    {
      id: 'patient',
      title: 'Patient',
      description: 'Book appointments, manage prescriptions, and track your health',
      icon: <User stroke={Colors.primary} size={32} />,
    },
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Manage appointments, provide consultations, and grow your practice',
      icon: <Stethoscope stroke={Colors.secondary} size={32} />,
    },
    {
      id: 'hospital',
      title: 'Hospital/Clinic',
      description: 'Manage facilities, staff, and provide healthcare services',
      icon: <Building2 stroke={Colors.accent} size={32} />,
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy',
      description: 'Manage inventory, process prescriptions, and deliver medicines',
      icon: <Pill stroke={Colors.info} size={32} />,
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      // TODO: Implement role selection logic
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/auth/profile-completion');
    } catch (error) {
      console.error('Role selection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select the role that best describes you
        </Text>
      </View>

      {/* Role Options */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleCard,
              selectedRole === role.id && styles.selectedRoleCard
            ]}
            onPress={() => setSelectedRole(role.id)}
          >
            <View style={[
              styles.iconContainer,
              selectedRole === role.id && styles.selectedIconContainer
            ]}>
              {role.icon}
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity 
        style={[
          styles.continueButton,
          (!selectedRole || isLoading) && styles.continueButtonDisabled
        ]}
        onPress={handleContinue}
        disabled={!selectedRole || isLoading}
      >
        <Text style={styles.continueButtonText}>
          {isLoading ? 'Please wait...' : 'Continue'}
        </Text>
      </TouchableOpacity>
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
    marginTop: 60,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedRoleCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedIconContainer: {
    backgroundColor: Colors.card,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
}); 