import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Platform, TextInput, Linking } from 'react-native';
import MapView, { Marker, UrlTile, PROVIDER_DEFAULT } from 'react-native-maps';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, Navigation, Phone, Clock, Star, AlertCircle, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useMap } from '@/contexts/MapContext';
import { FACILITY_TYPES, MAP_CONFIG } from '@/constants/Config';
import type { HealthcareFacility } from '@/types/map';
import debounce from 'lodash/debounce';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const {
    userLocation,
    facilities,
    selectedFacility,
    filters,
    searchQuery,
    isLoading,
    error,
    setSelectedFacility,
    setFilters,
    setSearchQuery,
    refreshLocation,
    getDirections,
  } = useMap();

  const mapRef = useRef<MapView>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleMarkerPress = (facility: HealthcareFacility) => {
    setSelectedFacility(facility);
    mapRef.current?.animateToRegion({
      latitude: facility.location.latitude,
      longitude: facility.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleSearch = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 300),
    []
  );

  const handleCall = async (phone: string) => {
    try {
      await Linking.openURL(`tel:${phone}`);
    } catch (err) {
      console.error('Error opening phone:', err);
    }
  };

  const handleGetDirections = async (facility: HealthcareFacility) => {
    try {
      const url = Platform.select({
        ios: `maps://app?daddr=${facility.location.latitude},${facility.location.longitude}`,
        android: `google.navigation:q=${facility.location.latitude},${facility.location.longitude}`,
      });

      if (url) {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback to getting directions in the app
          await getDirections(facility);
        }
      }
    } catch (err) {
      console.error('Error opening directions:', err);
      // Fallback to getting directions in the app
      await getDirections(facility);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Screen options={{ title: 'Map' }} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Screen options={{ title: 'Map' }} />
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={Colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshLocation}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Screen options={{ title: 'Map' }} />

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={userLocation || undefined}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
      >
        {/* OpenStreetMap Tiles */}
        <UrlTile
          urlTemplate={MAP_CONFIG.tileServer}
          zIndex={-1}
        />
        
        {/* Attribution */}
        <View style={styles.attribution}>
          <Text style={styles.attributionText}>{MAP_CONFIG.attribution}</Text>
        </View>

        {/* Facility Markers */}
        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            coordinate={facility.location}
            onPress={() => handleMarkerPress(facility)}
          >
            <View style={[
              styles.markerContainer,
              { borderColor: FACILITY_TYPES[facility.type].color }
            ]}>
              <Text style={styles.markerText}>
                {FACILITY_TYPES[facility.type].icon}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search healthcare facilities..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={(text) => {
              setIsSearching(true);
              handleSearch(text);
            }}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
            >
              <X size={20} color={Colors.gray} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={showFilters ? Colors.card : Colors.gray} />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(FACILITY_TYPES).map(([type, config]) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  filters.facilityTypes.includes(type as HealthcareFacility['type']) && styles.filterChipActive,
                  { borderColor: config.color },
                ]}
                onPress={() => {
                  setFilters({
                    ...filters,
                    facilityTypes: filters.facilityTypes.includes(type as HealthcareFacility['type'])
                      ? filters.facilityTypes.filter((t) => t !== type)
                      : [...filters.facilityTypes, type as HealthcareFacility['type']],
                  });
                }}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    filters.facilityTypes.includes(type as HealthcareFacility['type']) && styles.filterChipTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Selected Facility Card */}
      {selectedFacility && (
        <View style={styles.facilityCard}>
          <View style={styles.facilityHeader}>
            <View style={styles.facilityTitleContainer}>
              <Text style={styles.facilityTitle}>{selectedFacility.name}</Text>
              <View style={styles.facilityTypeContainer}>
                <Text style={[
                  styles.facilityType,
                  { color: FACILITY_TYPES[selectedFacility.type].color }
                ]}>
                  {selectedFacility.type.charAt(0).toUpperCase() + selectedFacility.type.slice(1)}
                </Text>
                {selectedFacility.emergency && (
                  <View style={styles.emergencyBadge}>
                    <Text style={styles.emergencyText}>24/7</Text>
                  </View>
                )}
              </View>
            </View>
            {selectedFacility.rating && (
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.warning} fill={Colors.warning} />
                <Text style={styles.ratingText}>{selectedFacility.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>

          <View style={styles.facilityDetails}>
            <View style={styles.detailRow}>
              <Clock size={16} color={Colors.textSecondary} />
              <Text style={styles.detailText}>
                {selectedFacility.isOpen ? 'Open Now' : 'Closed'}
              </Text>
            </View>
            {selectedFacility.distance !== undefined && (
              <View style={styles.detailRow}>
                <Navigation size={16} color={Colors.textSecondary} />
                <Text style={styles.detailText}>
                  {selectedFacility.distance.toFixed(1)} km away
                </Text>
              </View>
            )}
            {selectedFacility.services && (
              <View style={styles.servicesContainer}>
                {selectedFacility.services.map((service, index) => (
                  <View key={index} style={styles.serviceChip}>
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.facilityActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleGetDirections(selectedFacility)}
            >
              <Navigation size={20} color={Colors.primary} />
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={() => handleCall(selectedFacility.phone)}
            >
              <Phone size={20} color={Colors.card} />
              <Text style={[styles.actionButtonText, styles.callButtonText]}>
                Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    width,
    height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    padding: 0,
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filtersPanel: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 80,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primaryLight,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.primary,
  },
  markerContainer: {
    backgroundColor: Colors.card,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  markerText: {
    fontSize: 20,
  },
  facilityCard: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  facilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  facilityTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  facilityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  facilityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  facilityType: {
    fontSize: 14,
    fontWeight: '500',
  },
  emergencyBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  emergencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.card,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  facilityDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  facilityActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  callButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  callButtonText: {
    color: Colors.card,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  serviceChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  attribution: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 4,
    borderRadius: 4,
  },
  attributionText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
}); 