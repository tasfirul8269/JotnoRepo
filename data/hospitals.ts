import { Hospital } from '@/types';

const hospitalsData: Hospital[] = [
  {
    id: "h1",
    name: "Square Hospital",
    type: "Multi-specialty Hospital",
    address: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka",
    contact: "+8801713377775",
    email: "info@squarehospital.com",
    website: "https://www.squarehospital.com",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology", "Oncology"],
    facilities: ["ICU", "CCU", "Emergency", "Pharmacy", "Laboratory", "Radiology"],
    emergency: true,
    beds: {
      total: 450,
      available: 120,
      icu: {
        total: 45,
        available: 10
      }
    },
    rating: 4.6,
    reviewsCount: 230,
    image: "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7461,
      longitude: 90.3742
    }
  },
  {
    id: "h2",
    name: "United Hospital",
    type: "Multi-specialty Hospital",
    address: "Plot 15, Road 71, Gulshan, Dhaka",
    contact: "+8801914001234",
    email: "info@uhlbd.com",
    website: "https://www.uhlbd.com",
    specialties: ["Cardiology", "Oncology", "Nephrology", "Urology", "ENT"],
    facilities: ["ICU", "NICU", "Emergency", "Pharmacy", "Laboratory", "Radiology"],
    emergency: true,
    beds: {
      total: 500,
      available: 150,
      icu: {
        total: 50,
        available: 15
      }
    },
    rating: 4.7,
    reviewsCount: 280,
    image: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7936,
      longitude: 90.4137
    }
  },
  {
    id: "h3",
    name: "Evercare Hospital",
    type: "Multi-specialty Hospital",
    address: "Plot 81, Block E, Bashundhara R/A, Dhaka",
    contact: "+8801958890390",
    email: "info@evercarebd.com",
    website: "https://www.evercarebd.com",
    specialties: ["Cardiology", "Neurology", "Gastroenterology", "Orthopedics", "Pediatrics"],
    facilities: ["ICU", "CCU", "Emergency", "Pharmacy", "Laboratory", "Radiology"],
    emergency: true,
    beds: {
      total: 425,
      available: 110,
      icu: {
        total: 40,
        available: 8
      }
    },
    rating: 4.5,
    reviewsCount: 210,
    image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.8199,
      longitude: 90.4366
    }
  },
  {
    id: "h4",
    name: "Labaid Hospital",
    type: "Multi-specialty Hospital",
    address: "House 1, Road 4, Dhanmondi, Dhaka",
    contact: "+8801766662777",
    email: "info@labaidgroup.com",
    website: "https://www.labaidgroup.com",
    specialties: ["Cardiology", "Neurology", "Gynecology", "Urology", "ENT"],
    facilities: ["ICU", "Emergency", "Pharmacy", "Laboratory", "Radiology"],
    emergency: true,
    beds: {
      total: 300,
      available: 85,
      icu: {
        total: 30,
        available: 7
      }
    },
    rating: 4.4,
    reviewsCount: 190,
    image: "https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7399,
      longitude: 90.3748
    }
  },
  {
    id: "h5",
    name: "Ibn Sina Hospital",
    type: "Multi-specialty Hospital",
    address: "House 48, Road 9/A, Dhanmondi, Dhaka",
    contact: "+8801970010030",
    email: "info@ibnsina.com",
    website: "https://www.ibnsinatrust.com",
    specialties: ["Cardiology", "Neurology", "Oncology", "Nephrology", "Pediatrics"],
    facilities: ["ICU", "NICU", "Emergency", "Pharmacy", "Laboratory", "Radiology"],
    emergency: false,
    beds: {
      total: 250,
      available: 60,
      icu: {
        total: 25,
        available: 5
      }
    },
    rating: 4.3,
    reviewsCount: 175,
    image: "https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7427,
      longitude: 90.3767
    }
  }
];

export function getHospitals(): Hospital[] {
  return hospitalsData;
}

export function getHospitalById(id: string): Hospital | undefined {
  return hospitalsData.find(hospital => hospital.id === id);
}