import { Doctor } from '@/types';

const doctorsData: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Afsana Karim",
    degree: "MBBS, FCPS (Medicine)",
    specialty: "Internal Medicine Specialist",
    primaryAffiliation: "Square Hospital, Dhaka",
    otherLocations: [
      {
        name: "MediLife Diagnostic Center",
        address: "Dhanmondi, Dhaka",
        consultationTimings: "Sun, Tue, Thu: 5 PM – 8 PM"
      },
      {
        name: "HealthCare Clinic",
        address: "Uttara, Dhaka",
        consultationTimings: "Mon, Wed: 6 PM – 9 PM"
      }
    ],
    fees: 1200,
    yearsExperience: 12,
    rating: 4.7,
    reviewsCount: 85,
    languages: ["Bangla", "English"],
    bmdcRegistration: "A-12345",
    studiedAt: "Dhaka Medical College, Bangladesh",
    livesIn: "Banani, Dhaka",
    contactInformation: {
      phone: "+8801712345678",
      whatsApp: "+8801712345678",
      email: "dr.afsana@example.com",
      facebook: "https://facebook.com/drafsanakarim",
      instagram: "https://instagram.com/drafsana",
      website: "https://drafsanakarim.com"
    },
    profileImage: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600",
    additionalInfo: "Available for telemedicine appointments. Fluent in patient communication. Specialized in chronic disease management."
  },
  {
    id: "d2",
    name: "Dr. Mahbub Rahman",
    degree: "MBBS, MD (Cardiology)",
    specialty: "Cardiologist",
    primaryAffiliation: "United Hospital, Dhaka",
    otherLocations: [
      {
        name: "Cardio Care Center",
        address: "Gulshan, Dhaka",
        consultationTimings: "Sat, Mon, Wed: 6 PM – 9 PM"
      }
    ],
    fees: 1500,
    yearsExperience: 15,
    rating: 4.9,
    reviewsCount: 120,
    languages: ["Bangla", "English", "Hindi"],
    bmdcRegistration: "B-23456",
    studiedAt: "Bangabandhu Sheikh Mujib Medical University, Bangladesh",
    livesIn: "Gulshan, Dhaka",
    contactInformation: {
      phone: "+8801812345678",
      email: "dr.mahbub@example.com"
    },
    profileImage: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "d3",
    name: "Dr. Sabrina Ahmed",
    degree: "MBBS, FCPS (Gynecology)",
    specialty: "Gynecologist",
    primaryAffiliation: "Evercare Hospital, Dhaka",
    otherLocations: [
      {
        name: "Women's Health Center",
        address: "Mirpur, Dhaka",
        consultationTimings: "Sun, Tue, Thu: 4 PM – 7 PM"
      }
    ],
    fees: 1300,
    yearsExperience: 10,
    rating: 4.8,
    reviewsCount: 95,
    languages: ["Bangla", "English"],
    bmdcRegistration: "C-34567",
    studiedAt: "Mymensingh Medical College, Bangladesh",
    livesIn: "Dhanmondi, Dhaka",
    contactInformation: {
      phone: "+8801912345678",
      whatsApp: "+8801912345678"
    },
    profileImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "d4",
    name: "Dr. Tarek Hossain",
    degree: "MBBS, MS (Orthopedics)",
    specialty: "Orthopedic Surgeon",
    primaryAffiliation: "Apollo Hospital, Dhaka",
    otherLocations: [
      {
        name: "Bone & Joint Clinic",
        address: "Bashundhara, Dhaka",
        consultationTimings: "Sat, Mon, Wed: 5 PM – 8 PM"
      }
    ],
    fees: 1400,
    yearsExperience: 14,
    rating: 4.6,
    reviewsCount: 80,
    languages: ["Bangla", "English"],
    bmdcRegistration: "D-45678",
    studiedAt: "Sir Salimullah Medical College, Bangladesh",
    livesIn: "Uttara, Dhaka",
    contactInformation: {
      phone: "+8801612345678"
    },
    profileImage: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "d5",
    name: "Dr. Nusrat Jahan",
    degree: "MBBS, FCPS (Dermatology)",
    specialty: "Dermatologist",
    primaryAffiliation: "Labaid Hospital, Dhaka",
    otherLocations: [
      {
        name: "Skin Care Center",
        address: "Banani, Dhaka",
        consultationTimings: "Sun, Tue, Thu: 6 PM – 9 PM"
      }
    ],
    fees: 1200,
    yearsExperience: 8,
    rating: 4.7,
    reviewsCount: 75,
    languages: ["Bangla", "English"],
    bmdcRegistration: "E-56789",
    studiedAt: "Chittagong Medical College, Bangladesh",
    livesIn: "Mohakhali, Dhaka",
    contactInformation: {
      phone: "+8801512345678",
      email: "dr.nusrat@example.com"
    },
    profileImage: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "d6",
    name: "Dr. Masud Khan",
    degree: "MBBS, MD (Neurology)",
    specialty: "Neurologist",
    primaryAffiliation: "Ibn Sina Hospital, Dhaka",
    otherLocations: [
      {
        name: "Brain & Nerve Center",
        address: "Dhanmondi, Dhaka",
        consultationTimings: "Sat, Mon, Wed: 7 PM – 10 PM"
      }
    ],
    fees: 1600,
    yearsExperience: 18,
    rating: 4.9,
    reviewsCount: 110,
    languages: ["Bangla", "English", "German"],
    bmdcRegistration: "F-67890",
    studiedAt: "Rajshahi Medical College, Bangladesh",
    livesIn: "Gulshan, Dhaka",
    contactInformation: {
      phone: "+8801712349876",
      email: "dr.masud@example.com",
      website: "https://drmasudkhan.com"
    },
    profileImage: "https://images.pexels.com/photos/8376266/pexels-photo-8376266.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export function getDoctors(): Doctor[] {
  return doctorsData;
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctorsData.find(doctor => doctor.id === id);
}