import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Stethoscope, Building2, Pill, Ambulance } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface CategoryButtonProps {
  icon: string;
  title: string;
  color: string;
  route: string;
}

export default function CategoryButton({ icon, title, color, route }: CategoryButtonProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'stethoscope':
        return <Stethoscope size={24} color={Colors.primary} />;
      case 'hospital':
        return <Building2 size={24} color={Colors.secondary} />;
      case 'pill':
        return <Pill size={24} color={Colors.accent} />;
      case 'ambulance':
        return <Ambulance size={24} color={Colors.error} />;
      default:
        return <Stethoscope size={24} color={Colors.primary} />;
    }
  };

  return (
    <Link href={route} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          {renderIcon()}
        </View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});