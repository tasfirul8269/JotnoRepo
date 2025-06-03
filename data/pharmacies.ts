import { Pharmacy } from '@/types';

const pharmaciesData: Pharmacy[] = [
  {
    id: "p1",
    name: "Lazz Pharma",
    address: "House 1, Road 8, Dhanmondi, Dhaka",
    contact: "+8801713377770",
    email: "info@lazzpharma.com",
    hours: "8:00 AM - 12:00 AM, 7 days",
    delivery: true,
    rating: 4.7,
    reviewsCount: 320,
    image: "https://images.pexels.com/photos/3683845/pexels-photo-3683845.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7469,
      longitude: 90.3753
    }
  },
  {
    id: "p2",
    name: "Popular Pharmacy",
    address: "45/2 Panthapath, Dhaka",
    contact: "+8801912345678",
    email: "info@popularpharma.com",
    hours: "9:00 AM - 11:00 PM, 7 days",
    delivery: true,
    rating: 4.5,
    reviewsCount: 280,
    image: "https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7456,
      longitude: 90.3722
    }
  },
  {
    id: "p3",
    name: "Al-Madina Pharmacy",
    address: "House 17, Road 2, Banani, Dhaka",
    contact: "+8801712345678",
    email: "info@almadinapharma.com",
    hours: "8:00 AM - 10:00 PM, 7 days",
    delivery: true,
    rating: 4.4,
    reviewsCount: 240,
    image: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7938,
      longitude: 90.4038
    }
  },
  {
    id: "p4",
    name: "Medicine Corner",
    address: "Plot 15, Sector 7, Uttara, Dhaka",
    contact: "+8801812345678",
    email: "info@medicinecorner.com",
    hours: "9:00 AM - 11:00 PM, 7 days",
    delivery: true,
    rating: 4.3,
    reviewsCount: 180,
    image: "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.8698,
      longitude: 90.3892
    }
  },
  {
    id: "p5",
    name: "Life Care Pharmacy",
    address: "41 Gulshan Avenue, Gulshan-1, Dhaka",
    contact: "+8801912345679",
    email: "info@lifecarepharma.com",
    hours: "8:00 AM - 12:00 AM, 7 days",
    delivery: true,
    rating: 4.6,
    reviewsCount: 290,
    image: "https://images.pexels.com/photos/3873183/pexels-photo-3873183.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: {
      latitude: 23.7828,
      longitude: 90.4151
    }
  }
];

export function getPharmacies(): Pharmacy[] {
  return pharmaciesData;
}

export function getPharmacyById(id: string): Pharmacy | undefined {
  return pharmaciesData.find(pharmacy => pharmacy.id === id);
}