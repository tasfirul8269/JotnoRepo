export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

// API endpoints
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000' // Local development server
  : 'https://api.jotno.com'; // Production API URL

// Map configuration
export const MAP_CONFIG = {
  initialRegion: {
    latitude: 23.8103, // Dhaka coordinates
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  searchRadius: 10, // in kilometers
  maxSearchResults: 20,
  // OpenStreetMap tile server URL
  tileServer: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  // Attribution for OpenStreetMap
  attribution: '© OpenStreetMap contributors',
};

// Facility types and their configurations
export const FACILITY_TYPES = {
  hospital: {
    icon: '🏥',
    color: '#FF3B30', // Colors.error
    searchRadius: 15, // Larger search radius for hospitals
  },
  clinic: {
    icon: '🏥',
    color: '#007AFF', // Colors.primary
    searchRadius: 5,
  },
  pharmacy: {
    icon: '💊',
    color: '#34C759', // Colors.success
    searchRadius: 3,
  },
  ambulance: {
    icon: '🚑',
    color: '#FF9500', // Colors.warning
    searchRadius: 20, // Largest search radius for ambulances
  },
} as const; 