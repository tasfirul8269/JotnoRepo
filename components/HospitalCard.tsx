import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Hospital } from '@/types';

interface HospitalCardProps {
  hospital: Hospital;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: hospital.image }} 
        style={styles.image} 
      />
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{hospital.name}</Text>
          <Text style={styles.type}>{hospital.type}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={12} color={Colors.gray} />
            <Text style={styles.address} numberOfLines={1}>{hospital.address}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFC107" fill="#FFC107" />
            <Text style={styles.rating}>{hospital.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({hospital.reviewsCount})</Text>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, hospital.emergency ? styles.openBadge : styles.closedBadge]}>
            <Text style={[styles.statusText, hospital.emergency ? styles.openText : styles.closedText]}>
              {hospital.emergency ? 'Emergency Open' : 'No Emergency'}
            </Text>
          </View>
          <View style={styles.bedsInfoContainer}>
            <Text style={styles.bedsLabel}>Available Beds</Text>
            <Text style={styles.bedsCount}>{hospital.beds.available}/{hospital.beds.total}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 110,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  type: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  address: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  reviews: {
    marginLeft: 2,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  openBadge: {
    backgroundColor: '#E8F5E9',
  },
  closedBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  openText: {
    color: Colors.success,
  },
  closedText: {
    color: Colors.error,
  },
  bedsInfoContainer: {
    alignItems: 'flex-end',
  },
  bedsLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  bedsCount: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});