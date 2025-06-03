// import { NextResponse } from 'next/server'; // removed (not used)
import type { Location } from '@/types/map';

interface DirectionsRequest {
  origin: Location;
  destination: Location;
  mode: 'driving' | 'walking' | 'transit';
}

interface DirectionsStep {
  instruction: string;
  distance: number;
  duration: number;
}

interface DirectionsResponse {
  distance: number;
  duration: number;
  steps: DirectionsStep[];
}

// OSRM API endpoint
const OSRM_API = 'https://router.project-osrm.org/route/v1';

// Get directions using OSRM
async function getDirectionsFromOSRM(
  origin: Location,
  destination: Location,
  mode: 'driving' | 'walking' | 'transit'
): Promise<DirectionsResponse> {
  try {
    // Convert mode to OSRM profile
    const profile = mode === 'walking' ? 'foot' : 'driving';
    
    // Construct OSRM API URL
    const url = `${OSRM_API}/${profile}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson&steps=true`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to get directions from OSRM');
    }

    const data = await response.json();
    
    if (data.code !== 'Ok') {
      throw new Error(data.message || 'Failed to get directions');
    }

    const route = data.routes[0];
    const steps = route.legs[0].steps.map((step: any) => ({
      instruction: step.maneuver.type + ' ' + (step.maneuver.modifier || ''),
      distance: step.distance / 1000, // Convert meters to kilometers
      duration: step.duration / 60, // Convert seconds to minutes
    }));

    return {
      distance: route.distance / 1000, // Convert meters to kilometers
      duration: route.duration / 60, // Convert seconds to minutes
      steps,
    };
  } catch (error) {
    console.error('OSRM directions error:', error);
    // Fallback to simple distance calculation if OSRM fails
    return getSimpleDirections(origin, destination, mode);
  }
}

// Fallback function for simple distance calculation
function getSimpleDirections(
  origin: Location,
  destination: Location,
  mode: 'driving' | 'walking' | 'transit'
): DirectionsResponse {
  const distance = calculateDistance(
    origin.latitude,
    origin.longitude,
    destination.latitude,
    destination.longitude
  );

  // Estimate duration based on mode and distance
  const averageSpeed = {
    driving: 50, // km/h
    walking: 5, // km/h
    transit: 30, // km/h
  }[mode];

  const duration = (distance / averageSpeed) * 60; // Convert to minutes

  return {
    distance,
    duration,
    steps: [
      {
        instruction: 'Start at your current location',
        distance: 0,
        duration: 0,
      },
      {
        instruction: `Head ${distance > 0 ? 'towards' : 'to'} the destination`,
        distance: distance * 0.5,
        duration: duration * 0.5,
      },
      {
        instruction: 'Arrive at your destination',
        distance: distance * 0.5,
        duration: duration * 0.5,
      },
    ],
  };
}

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
    const body = await request.json() as DirectionsRequest;
    const { origin, destination, mode = 'driving' } = body;

    if (!origin || !destination) {
      return new Response(JSON.stringify({ error: 'Origin and destination are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const directions = await getDirectionsFromOSRM(origin, destination, mode);
    return new Response(JSON.stringify(directions), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Get directions error:', error);
    return new Response(JSON.stringify({ error: 'Failed to get directions' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
} 