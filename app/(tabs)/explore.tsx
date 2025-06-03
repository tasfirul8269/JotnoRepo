import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Search, MapPin, Filter, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { getDoctors } from '@/data/doctors';
import { getHospitals } from '@/data/hospitals';
import { getPharmacies } from '@/data/pharmacies';
import { Doctor, Hospital, Pharmacy, MapLocation } from '@/types';

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    const doctors = getDoctors();
    const hospitals = getHospitals();
    const pharmacies = getPharmacies();
    
    const doctorLocations: MapLocation[] = doctors
      .filter(doctor => doctor.contactInformation && doctor.contactInformation.location)
      .map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        type: 'doctor',
        latitude: 23.7461 + (Math.random() * 0.05),
        longitude: 90.3742 + (Math.random() * 0.05),
        icon: 'stethoscope'
      }));
    
    const hospitalLocations: MapLocation[] = hospitals.map(hospital => ({
      id: hospital.id,
      name: hospital.name,
      type: 'hospital',
      latitude: hospital.location.latitude,
      longitude: hospital.location.longitude,
      icon: 'hospital'
    }));
    
    const pharmacyLocations: MapLocation[] = pharmacies.map(pharmacy => ({
      id: pharmacy.id,
      name: pharmacy.name,
      type: 'pharmacy',
      latitude: pharmacy.location.latitude,
      longitude: pharmacy.location.longitude,
      icon: 'pill'
    }));
    
    setLocations([...doctorLocations, ...hospitalLocations, ...pharmacyLocations]);
  };

  const filterLocations = (type: string | null) => {
    setSelectedType(type);
  };

  const getFilteredLocations = () => {
    if (!selectedType) return locations;
    return locations.filter(location => location.type === selectedType);
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'doctor':
        return Colors.primary;
      case 'hospital':
        return Colors.secondary;
      case 'pharmacy':
        return Colors.accent;
      case 'ambulance':
        return Colors.error;
      default:
        return Colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.gray} style={styles.searchIcon} />
          <TextInput 
            placeholder="Find doctors, hospitals, etc."
            placeholderTextColor={Colors.gray}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <X size={18} color={Colors.gray} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.dark} />
        </TouchableOpacity>
      </View>
      
      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsContent}
        >
          <TouchableOpacity 
            style={[styles.filterTab, !selectedType && styles.filterTabSelected]}
            onPress={() => filterLocations(null)}
          >
            <Text style={[styles.filterTabText, !selectedType && styles.filterTabTextSelected]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, selectedType === 'doctor' && styles.filterTabSelected]}
            onPress={() => filterLocations('doctor')}
          >
            <Text style={[styles.filterTabText, selectedType === 'doctor' && styles.filterTabTextSelected]}>Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, selectedType === 'hospital' && styles.filterTabSelected]}
            onPress={() => filterLocations('hospital')}
          >
            <Text style={[styles.filterTabText, selectedType === 'hospital' && styles.filterTabTextSelected]}>Hospitals</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, selectedType === 'pharmacy' && styles.filterTabSelected]}
            onPress={() => filterLocations('pharmacy')}
          >
            <Text style={[styles.filterTabText, selectedType === 'pharmacy' && styles.filterTabTextSelected]}>Pharmacies</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, selectedType === 'ambulance' && styles.filterTabSelected]}
            onPress={() => filterLocations('ambulance')}
          >
            <Text style={[styles.filterTabText, selectedType === 'ambulance' && styles.filterTabTextSelected]}>Ambulances</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Location List */}
      <ScrollView style={styles.locationList}>
        {getFilteredLocations().map((location) => (
          <TouchableOpacity 
            key={`${location.type}-${location.id}`}
            style={styles.locationCard}
          >
            <View style={[styles.locationIcon, { backgroundColor: getLocationColor(location.type) + '20' }]}>
              <MapPin size={24} color={getLocationColor(location.type)} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationType}>{location.type.charAt(0).toUpperCase() + location.type.slice(1)}</Text>
              <Text style={styles.locationAddress}>
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.card,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 46,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    backgroundColor: Colors.card,
    paddingBottom: 15,
  },
  filterTabsContent: {
    paddingHorizontal: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    marginRight: 10,
  },
  filterTabSelected: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  filterTabTextSelected: {
    color: '#FFFFFF',
  },
  locationList: {
    flex: 1,
    padding: 20,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  locationType: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 12,
    color: Colors.gray,
  },
});