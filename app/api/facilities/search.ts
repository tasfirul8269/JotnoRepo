import { NextResponse } from 'next/server';
import type { HealthcareFacility, Location, SearchFilters } from '@/types/map';
import { MAP_CONFIG } from '@/constants/Config';

// This would typically come from a database
const facilities: HealthcareFacility[] = [
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
  // ... more facilities from our dummy data
];

// Calculate distance between two points using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, filters, query, radius = MAP_CONFIG.searchRadius, limit = MAP_CONFIG.maxSearchResults } = body;

    if (!location || !filters) {
      return NextResponse.json(
        { error: 'Location and filters are required' },
        { status: 400 }
      );
    }

    // Filter facilities based on search criteria
    const results = facilities
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
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          facility.location.latitude,
          facility.location.longitude
        );
        if (radius && distance > radius) {
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
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          facility.location.latitude,
          facility.location.longitude
        ),
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, limit);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search facilities error:', error);
    return NextResponse.json(
      { error: 'Failed to search facilities' },
      { status: 500 }
    );
  }
} 