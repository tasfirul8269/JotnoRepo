import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Doctor } from '@/types';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: doctor.profileImage }} 
        style={styles.image} 
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFC107" fill="#FFC107" />
          <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
          <Text style={styles.reviews}>({doctor.reviewsCount})</Text>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.location} numberOfLines={1}>{doctor.primaryAffiliation}</Text>
        </View>
        <View style={styles.feesContainer}>
          <Text style={styles.fees}>৳{doctor.fees}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  specialty: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  reviews: {
    marginLeft: 2,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  locationContainer: {
    marginBottom: 5,
  },
  location: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  feesContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  fees: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
});