import { API_BASE_URL, MAP_CONFIG } from '@/constants/Config';
import type { HealthcareFacility, Location, SearchFilters } from '@/types/map';

class MapService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Search facilities based on filters and location
  async searchFacilities(
    location: Location,
    filters: SearchFilters,
    query?: string
  ): Promise<HealthcareFacility[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/facilities/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          filters,
          query,
          radius: MAP_CONFIG.searchRadius,
          limit: MAP_CONFIG.maxSearchResults,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search facilities');
      }

      return response.json();
    } catch (error) {
      console.error('Search facilities error:', error);
      throw error;
    }
  }

  // Get facility details
  async getFacilityDetails(facilityId: string): Promise<HealthcareFacility> {
    try {
      const response = await fetch(`${this.baseUrl}/api/facilities/${facilityId}`);
      if (!response.ok) {
        throw new Error('Failed to get facility details');
      }
      return response.json();
    } catch (error) {
      console.error('Get facility details error:', error);
      throw error;
    }
  }

  // Get directions between two points
  async getDirections(
    origin: Location,
    destination: Location,
    mode: 'driving' | 'walking' | 'transit' = 'driving'
  ) {
    try {
      const response = await fetch(`${this.baseUrl}/api/directions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origin, destination, mode }),
      });

      if (!response.ok) {
        throw new Error('Failed to get directions');
      }

      return response.json();
    } catch (error) {
      console.error('Get directions error:', error);
      throw error;
    }
  }

  // Calculate distance between two points using the Haversine formula
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return (value * Math.PI) / 180;
  }

  // Dummy data for testing
  private getDummyFacilities(
    location: Location,
    filters: SearchFilters,
    query?: string
  ): HealthcareFacility[] {
    const facilities = [
      {
        id: '1',
        name: 'City General Hospital',
        type: 'hospital' as const,
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
        type: 'pharmacy' as const,
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
        type: 'clinic' as const,
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
        type: 'ambulance' as const,
        location: { latitude: 23.8203, longitude: 90.4325 },
        address: '101 Emergency Lane, Dhaka',
        phone: '+880 1234567893',
        rating: 4.8,
        isOpen: true,
        emergency: true,
        services: ['24/7 Emergency Response', 'Medical Transport'],
      },
    ];

    // Filter facilities based on search criteria
    return facilities
      .filter((facility) => {
        // Filter by type
        if (!filters.facilityTypes.includes(facility.type)) {
          return false;
        }

        // Filter by emergency status
        if (filters.emergencyOnly && !facility.emergency) {
          return false;
        }

        // Filter by operational status
        if (filters.isOpen !== undefined && facility.isOpen !== filters.isOpen) {
          return false;
        }

        // Filter by rating
        if (filters.minRating && (!facility.rating || facility.rating < filters.minRating)) {
          return false;
        }

        // Filter by distance
        const distance = this.calculateDistance(
          location.latitude,
          location.longitude,
          facility.location.latitude,
          facility.location.longitude
        );
        if (filters.maxDistance && distance > filters.maxDistance) {
          return false;
        }

        // Filter by search query
        if (query) {
          const searchQuery = query.toLowerCase();
          return (
            facility.name.toLowerCase().includes(searchQuery) ||
            facility.address.toLowerCase().includes(searchQuery) ||
            facility.services?.some((service) => service.toLowerCase().includes(searchQuery))
          );
        }

        return true;
      })
      .map((facility) => ({
        ...facility,
        distance: this.calculateDistance(
          location.latitude,
          location.longitude,
          facility.location.latitude,
          facility.location.longitude
        ),
      }));
  }

  private getDummyFacilityById(id: string): HealthcareFacility {
    const facility = this.getDummyFacilities(
      { latitude: 23.8103, longitude: 90.4125 },
      { facilityTypes: ['hospital', 'clinic', 'pharmacy', 'ambulance'] }
    ).find((f) => f.id === id);

    if (!facility) {
      throw new Error('Facility not found');
    }

    return facility;
  }
}

export const mapService = new MapService(); 