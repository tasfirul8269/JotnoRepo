import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, User, Building2, Stethoscope, Pill, Ambulance } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/contexts/AuthContext';

const roles: Array<{
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'patient',
    title: 'Patient',
    description: 'Book appointments, manage prescriptions, and track your health',
    icon: <User size={24} color={Colors.primary} />,
  },
  {
    id: 'doctor',
    title: 'Doctor',
    description: 'Manage appointments, prescriptions, and patient records',
    icon: <Stethoscope size={24} color={Colors.primary} />,
  },
  {
    id: 'hospital',
    title: 'Hospital/Clinic',
    description: 'Manage staff, facilities, and patient services',
    icon: <Building2 size={24} color={Colors.primary} />,
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Manage inventory, prescriptions, and deliveries',
    icon: <Pill size={24} color={Colors.primary} />,
  },
  {
    id: 'ambulance',
    title: 'Ambulance Provider',
    description: 'Manage ambulance fleet and emergency services',
    icon: <Ambulance size={24} color={Colors.primary} />,
  },
];

export default function RoleSelectionScreen() {
  const { setUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = async (role: UserRole) => {
    setSelectedRole(role);
    setError('');
    setIsLoading(true);
    try {
      await setUserRole(role);
    } catch (error) {
      console.error('Role selection error:', error);
      setError('Failed to set role. Please try again.');
      setSelectedRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={Colors.dark} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>
          Choose how you want to use Jotno
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Role Selection */}
      <ScrollView 
        style={styles.rolesContainer}
        showsVerticalScrollIndicator={false}
      >
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleCard,
              selectedRole === role.id && styles.roleCardSelected
            ]}
            onPress={() => handleRoleSelect(role.id)}
            disabled={isLoading}
          >
            <View style={styles.roleIcon}>
              {role.icon}
            </View>
            <View style={styles.roleContent}>
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
        onPress={() => selectedRole && handleRoleSelect(selectedRole)}
        disabled={!selectedRole || isLoading}
      >
        <Text style={styles.continueButtonText}>
          {isLoading ? 'Setting up...' : 'Continue'}
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    marginTop: 40,
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
  errorText: {
    color: Colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  rolesContainer: {
    flex: 1,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roleCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
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
    marginTop: 16,
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