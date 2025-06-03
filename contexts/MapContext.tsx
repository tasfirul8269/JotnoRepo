import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import type { MapRegion, HealthcareFacility, SearchFilters } from '@/types/map';
import { mapService } from '@/services/mapService';
import { MAP_CONFIG } from '@/constants/Config';

// Dummy data for testing
const DUMMY_FACILITIES: HealthcareFacility[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    location: { latitude: 23.8103, longitude: 90.4125 },
    address: '123 Medical Center Road, Dhaka',
    phone: '+880 1234567890',
    rating: 4.5,
    isOpen: true,
    emergency: true,
    openingHours: {
      monday: { open: '08:00', close: '20:00' },
      tuesday: { open: '08:00', close: '20:00' },
      wednesday: { open: '08:00', close: '20:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '20:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: '09:00', close: '18:00' },
    },
    services: ['Emergency', 'Surgery', 'Cardiology', 'Pediatrics'],
  },
  {
    id: '2',
    name: 'MediCare Pharmacy',
    type: 'pharmacy',
    location: { latitude: 23.8153, longitude: 90.4225 },
    address: '456 Health Street, Dhaka',
    phone: '+880 1234567891',
    rating: 4.2,
    isOpen: true,
    openingHours: {
      monday: { open: '09:00', close: '21:00' },
      tuesday: { open: '09:00', close: '21:00' },
      wednesday: { open: '09:00', close: '21:00' },
      thursday: { open: '09:00', close: '21:00' },
      friday: { open: '09:00', close: '21:00' },
      saturday: { open: '10:00', close: '20:00' },
      sunday: { open: '10:00', close: '20:00' },
    },
  },
  {
    id: '3',
    name: 'QuickCare Clinic',
    type: 'clinic',
    location: { latitude: 23.8053, longitude: 90.4025 },
    address: '789 Wellness Avenue, Dhaka',
    phone: '+880 1234567892',
    rating: 4.0,
    isOpen: true,
    emergency: true,
    openingHours: {
      monday: { open: '08:00', close: '19:00' },
      tuesday: { open: '08:00', close: '19:00' },
      wednesday: { open: '08:00', close: '19:00' },
      thursday: { open: '08:00', close: '19:00' },
      friday: { open: '08:00', close: '19:00' },
      saturday: { open: '09:00', close: '17:00' },
      sunday: { open: '09:00', close: '17:00' },
    },
    services: ['General Medicine', 'Pediatrics', 'Gynecology'],
  },
  {
    id: '4',
    name: 'Emergency Ambulance Service',
    type: 'ambulance',
    location: { latitude: 23.8203, longitude: 90.4325 },
    address: '101 Emergency Lane, Dhaka',
    phone: '+880 1234567893',
    rating: 4.8,
    isOpen: true,
    emergency: true,
    services: ['24/7 Emergency Response', 'Medical Transport'],
  },
];

interface MapContextType {
  userLocation: MapRegion | null;
  facilities: HealthcareFacility[];
  selectedFacility: HealthcareFacility | null;
  filters: SearchFilters;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  setSelectedFacility: (facility: HealthcareFacility | null) => void;
  setFilters: (filters: SearchFilters) => void;
  setSearchQuery: (query: string) => void;
  refreshLocation: () => Promise<void>;
  searchFacilities: () => Promise<void>;
  getDirections: (destination: HealthcareFacility) => Promise<void>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState<MapRegion | null>(null);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    facilityTypes: ['hospital', 'clinic', 'pharmacy', 'ambulance'],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const region: MapRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: MAP_CONFIG.initialRegion.latitudeDelta,
        longitudeDelta: MAP_CONFIG.initialRegion.longitudeDelta,
      };
      setUserLocation(region);
      await searchFacilities();
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  const searchFacilities = useCallback(async () => {
    if (!userLocation) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await mapService.searchFacilities(userLocation, filters, searchQuery);
      setFacilities(results);
    } catch (err) {
      console.error('Search facilities error:', err);
      setError('Failed to search facilities');
    } finally {
      setIsLoading(false);
    }
  }, [userLocation, filters, searchQuery]);

  const getDirections = async (destination: HealthcareFacility) => {
    if (!userLocation) return;

    try {
      const directions = await mapService.getDirections(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        destination.location
      );
      // In a real app, you would open the directions in a map app or show them in the app
      console.log('Directions:', directions);
    } catch (err) {
      console.error('Get directions error:', err);
      setError('Failed to get directions');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      searchFacilities();
    }
  }, [userLocation, filters, searchQuery, searchFacilities]);

  const refreshLocation = async () => {
    setIsLoading(true);
    setError(null);
    await getLocation();
  };

  return (
    <MapContext.Provider
      value={{
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
        searchFacilities,
        getDirections,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
} 