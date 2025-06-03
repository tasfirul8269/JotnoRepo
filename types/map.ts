export interface Location {
  latitude: number;
  longitude: number;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'ambulance';
  location: Location;
  address: string;
  phone: string;
  rating?: number;
  isOpen: boolean;
  openingHours?: {
    [key: string]: { open: string; close: string };
  };
  services?: string[];
  emergency?: boolean;
  distance?: number; // in kilometers
}

export interface MapRegion extends Location {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker extends HealthcareFacility {
  coordinate: Location;
}

export interface SearchFilters {
  facilityTypes: HealthcareFacility['type'][];
  maxDistance?: number;
  emergencyOnly?: boolean;
  isOpen?: boolean;
  minRating?: number;
} 