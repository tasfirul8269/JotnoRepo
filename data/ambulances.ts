import { Ambulance } from '@/types';

const ambulancesData: Ambulance[] = [
  {
    id: "a1",
    provider: "National Ambulance Service",
    type: "Basic Life Support",
    contact: "999",
    available: true,
    rating: 4.5
  },
  {
    id: "a2",
    provider: "Square Hospital Ambulance",
    type: "Advanced Life Support",
    contact: "+8801713377775",
    available: true,
    rating: 4.7,
    location: {
      latitude: 23.7461,
      longitude: 90.3742
    }
  },
  {
    id: "a3",
    provider: "United Hospital Ambulance",
    type: "Advanced Life Support",
    contact: "+8801914001234",
    available: true,
    rating: 4.6,
    location: {
      latitude: 23.7936,
      longitude: 90.4137
    }
  },
  {
    id: "a4",
    provider: "Evercare Hospital Ambulance",
    type: "ICU Ambulance",
    contact: "+8801958890390",
    available: false,
    rating: 4.8,
    location: {
      latitude: 23.8199,
      longitude: 90.4366
    }
  },
  {
    id: "a5",
    provider: "Green Life Hospital Ambulance",
    type: "Basic Life Support",
    contact: "+8801712345678",
    available: true,
    rating: 4.3
  },
  {
    id: "a6",
    provider: "Medinova Hospital Ambulance",
    type: "Advanced Life Support",
    contact: "+8801812345678",
    available: true,
    rating: 4.2
  }
];

export function getAmbulances(): Ambulance[] {
  return ambulancesData;
}

export function getAvailableAmbulances(): Ambulance[] {
  return ambulancesData.filter(ambulance => ambulance.available);
}

export function getAmbulanceById(id: string): Ambulance | undefined {
  return ambulancesData.find(ambulance => ambulance.id === id);
}