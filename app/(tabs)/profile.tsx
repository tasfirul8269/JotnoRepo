import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, User, Heart, Calendar, FileText, Clock, CreditCard, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const user = {
    name: 'Rafiqul Islam',
    email: 'rafiqul@example.com',
    phone: '+880 1712 345678',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  const menuItems = [
    {
      icon: <User size={22} color={Colors.primary} />,
      title: 'Personal Information',
      subtitle: 'Manage your personal details',
      route: '/profile/personal',
    },
    {
      icon: <Heart size={22} color={Colors.primary} />,
      title: 'Favorites',
      subtitle: 'Your saved doctors and facilities',
      route: '/profile/favorites',
    },
    {
      icon: <Calendar size={22} color={Colors.primary} />,
      title: 'Medical History',
      subtitle: 'Your past appointments and treatments',
      route: '/profile/medical-history',
    },
    {
      icon: <FileText size={22} color={Colors.primary} />,
      title: 'Prescriptions',
      subtitle: 'Access your digital prescriptions',
      route: '/profile/prescriptions',
    },
    {
      icon: <Clock size={22} color={Colors.primary} />,
      title: 'Appointment History',
      subtitle: 'View all your appointments',
      route: '/profile/appointments',
    },
    {
      icon: <CreditCard size={22} color={Colors.primary} />,
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      route: '/profile/payment',
    },
    {
      icon: <HelpCircle size={22} color={Colors.primary} />,
      title: 'Help & Support',
      subtitle: 'Get assistance and answers',
      route: '/profile/support',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={Colors.dark} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Medical ID Card */}
        <View style={styles.medicalIdCard}>
          <View style={styles.medicalIdHeader}>
            <Text style={styles.medicalIdTitle}>Medical ID</Text>
            <TouchableOpacity>
              <Text style={styles.medicalIdViewButton}>View</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.medicalIdInfo}>
            <View style={styles.medicalIdItem}>
              <Text style={styles.medicalIdLabel}>Blood Type</Text>
              <Text style={styles.medicalIdValue}>A+</Text>
            </View>
            <View style={styles.medicalIdItem}>
              <Text style={styles.medicalIdLabel}>Weight</Text>
              <Text style={styles.medicalIdValue}>75 kg</Text>
            </View>
            <View style={styles.medicalIdItem}>
              <Text style={styles.medicalIdLabel}>Height</Text>
              <Text style={styles.medicalIdValue}>175 cm</Text>
            </View>
            <View style={styles.medicalIdItem}>
              <Text style={styles.medicalIdLabel}>Allergies</Text>
              <Text style={styles.medicalIdValue}>None</Text>
            </View>
          </View>
        </View>
        
        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>{item.icon}</View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <View style={[styles.menuIconContainer, styles.logoutIconContainer]}>
              <LogOut size={22} color={Colors.error} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={[styles.menuTitle, styles.logoutText]}>Logout</Text>
              <Text style={styles.menuSubtitle}>Sign out from your account</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Healthcare App v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 All Rights Reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  profilePhone: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  medicalIdCard: {
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicalIdHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  medicalIdTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  medicalIdViewButton: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  medicalIdInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  medicalIdItem: {
    width: '48%',
    marginBottom: 15,
  },
  medicalIdLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  medicalIdValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  menuContainer: {
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutIconContainer: {
    backgroundColor: '#FFEBEE',
  },
  logoutText: {
    color: Colors.error,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
});