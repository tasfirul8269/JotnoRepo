// import { NextResponse } from 'next/server'; // removed (not used)
import type { HealthcareFacility } from '@/types/map';

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const facility = facilities.find((f) => f.id === params.id);

    if (!facility) {
      return new Response(JSON.stringify({ error: 'Facility not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(facility), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Get facility details error:', error);
    return new Response(JSON.stringify({ error: 'Failed to get facility details' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
} 