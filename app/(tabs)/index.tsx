import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, MapPin, ChevronRight, Bell } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { getDoctors } from '@/data/doctors';
import { getHospitals } from '@/data/hospitals';
import DoctorCard from '@/components/DoctorCard';
import HospitalCard from '@/components/HospitalCard';
import CategoryButton from '@/components/CategoryButton';

export default function HomeScreen() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState('Dhaka, Bangladesh');

  useEffect(() => {
    setDoctors(getDoctors().slice(0, 5));
    setHospitals(getHospitals().slice(0, 5));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={18} color={Colors.primary} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.dark} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput 
          placeholder="Search doctors, hospitals, etc."
          placeholderTextColor={Colors.gray}
          style={styles.searchInput}
        />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories */}
        <View style={styles.categoryContainer}>
          <CategoryButton icon="stethoscope" title="Doctors" color="#E3F2FD" route="/doctors" />
          <CategoryButton icon="hospital" title="Hospitals" color="#E8F5E9" route="/hospitals" />
          <CategoryButton icon="pill" title="Pharmacy" color="#FFF3E0" route="/pharmacy" />
          <CategoryButton icon="ambulance" title="Ambulance" color="#FFEBEE" route="/ambulance" />
        </View>
        
        {/* Emergency Banner */}
        <TouchableOpacity style={styles.emergencyBanner}>
          <View style={styles.emergencyIconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991552.png' }} 
              style={styles.emergencyIcon} 
            />
          </View>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>Emergency?</Text>
            <Text style={styles.emergencySubtitle}>Call for immediate help</Text>
          </View>
          <View style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>SOS</Text>
          </View>
        </TouchableOpacity>
        
        {/* Top Doctors */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <Link href="/doctors" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={16} color={Colors.primary} />
              </TouchableOpacity>
            </Link>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.doctorsScrollContent}
          >
            {doctors.map((doctor) => (
              <Link key={doctor.id} href={`/doctor/${doctor.id}`} asChild>
                <TouchableOpacity>
                  <DoctorCard doctor={doctor} />
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>
        
        {/* Nearby Hospitals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
            <Link href="/hospitals" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={16} color={Colors.primary} />
              </TouchableOpacity>
            </Link>
          </View>
          
          {hospitals.map((hospital) => (
            <Link key={hospital.id} href={`/hospital/${hospital.id}`} asChild>
              <TouchableOpacity>
                <HospitalCard hospital={hospital} />
              </TouchableOpacity>
            </Link>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.card,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
    borderWidth: 1,
    borderColor: Colors.card,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  emergencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyIcon: {
    width: 24,
    height: 24,
  },
  emergencyTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
  },
  emergencySubtitle: {
    fontSize: 12,
    color: Colors.gray,
  },
  emergencyButton: {
    backgroundColor: Colors.error,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 3,
  },
  doctorsScrollContent: {
    paddingHorizontal: 15,
  },
});