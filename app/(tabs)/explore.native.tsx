import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Search, MapPin, Filter, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getDoctors } from '@/data/doctors';
import { getHospitals } from '@/data/hospitals';
import { getPharmacies } from '@/data/pharmacies';
import { Doctor, Hospital, Pharmacy, MapLocation } from '@/types';

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 23.7806,
    longitude: 90.3978,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = () => {
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

  const getMarkerColor = (type: string) => {
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
      
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapRegion}
        >
          {getFilteredLocations().map((location) => (
            <Marker
              key={`${location.type}-${location.id}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              description={location.type}
              pinColor={getMarkerColor(location.type)}
            />
          ))}
        </MapView>
        
        <View style={styles.mapLocationIndicator}>
          <MapPin size={16} color={Colors.primary} />
          <Text style={styles.mapLocationText}>Dhaka, Bangladesh</Text>
        </View>
      </View>
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapLocationIndicator: {
    position: 'absolute',
    top: 15,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mapLocationText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
});