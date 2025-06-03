export interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  primaryAffiliation: string;
  otherLocations: Location[];
  fees: number;
  yearsExperience: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  bmdcRegistration: string;
  studiedAt: string;
  livesIn: string;
  contactInformation: ContactInformation;
  profileImage: string;
  additionalInfo?: string;
  availability?: Availability[];
}

export interface Location {
  name: string;
  address: string;
  consultationTimings: string;
}

export interface ContactInformation {
  phone: string;
  whatsApp?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface Availability {
  day: string;
  slots: Slot[];
}

export interface Slot {
  time: string;
  isAvailable: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  address: string;
  contact: string;
  email?: string;
  website?: string;
  specialties: string[];
  facilities: string[];
  emergency: boolean;
  beds: {
    total: number;
    available: number;
    icu: {
      total: number;
      available: number;
    };
  };
  rating: number;
  reviewsCount: number;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  contact: string;
  email?: string;
  hours: string;
  delivery: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Ambulance {
  id: string;
  provider: string;
  type: string;
  contact: string;
  available: boolean;
  rating: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'hospital' | 'pharmacy';
  profileImage?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'in-person' | 'video' | 'voice';
  location: string;
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'pharmacy' | 'ambulance';
  latitude: number;
  longitude: number;
  icon: string;
}