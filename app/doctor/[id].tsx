import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { Star, MapPin, Phone, Video, MessageSquare, Heart, ArrowLeft, Share2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Doctor } from '@/types';
import { getDoctorById } from '@/data/doctors';

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const doctorData = getDoctorById(id as string);
      if (doctorData) {
        setDoctor(doctorData);
      }
    }
  }, [id]);

  if (!doctor) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
            <Heart size={20} color="#FFFFFF" fill={isFavorite ? '#FFFFFF' : 'none'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Share2 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Profile */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: doctor.profileImage }} 
            style={styles.profileImage} 
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFC107" fill="#FFC107" />
              <Text style={styles.rating}>{doctor.rating.toFixed(1)}</Text>
              <Text style={styles.reviews}>({doctor.reviewsCount} reviews)</Text>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.gray} />
              <Text style={styles.location}>{doctor.primaryAffiliation}</Text>
            </View>
            
            <View style={styles.badgesContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{doctor.yearsExperience}+ years</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{doctor.languages.join(', ')}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.videoButton]}>
            <Video size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Video</Text>
          </TouchableOpacity>
          
          <Link href={`/conversation/${doctor.id}`} asChild>
            <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
              <MessageSquare size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>About</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
            onPress={() => setActiveTab('schedule')}
          >
            <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>Schedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'about' && (
            <View>
              {/* Education */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Education</Text>
                <Text style={styles.sectionText}>{doctor.studiedAt}</Text>
              </View>
              
              {/* Experience */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Experience</Text>
                <Text style={styles.sectionText}>{doctor.yearsExperience} years of experience</Text>
              </View>
              
              {/* Specializations */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Specializations</Text>
                <Text style={styles.sectionText}>{doctor.specialty}</Text>
              </View>
              
              {/* Registration */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Medical Registration</Text>
                <Text style={styles.sectionText}>BMDC Registration: {doctor.bmdcRegistration}</Text>
              </View>
              
              {/* Other Locations */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Other Locations</Text>
                {doctor.otherLocations.map((location, index) => (
                  <View key={index} style={styles.locationItem}>
                    <Text style={styles.locationName}>{location.name}</Text>
                    <Text style={styles.locationAddress}>{location.address}</Text>
                    <Text style={styles.locationTiming}>{location.consultationTimings}</Text>
                  </View>
                ))}
              </View>
              
              {/* Additional Info */}
              {doctor.additionalInfo && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Additional Information</Text>
                  <Text style={styles.sectionText}>{doctor.additionalInfo}</Text>
                </View>
              )}
            </View>
          )}
          
          {activeTab === 'schedule' && (
            <View>
              {/* Schedule content */}
              <Text style={styles.scheduleHeading}>Consultation Fee</Text>
              <View style={styles.feeContainer}>
                <Text style={styles.feeAmount}>৳{doctor.fees}</Text>
                <Text style={styles.feeType}>per consultation</Text>
              </View>
              
              <Text style={styles.scheduleHeading}>Available Slots</Text>
              <View style={styles.dayContainer}>
                <Text style={styles.dayText}>Today, 15 May</Text>
                <View style={styles.slotsContainer}>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>9:00 AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>10:30 AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonBooked]}>
                    <Text style={[styles.slotButtonText, styles.slotButtonTextBooked]}>12:00 PM</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.dayContainer}>
                <Text style={styles.dayText}>Tomorrow, 16 May</Text>
                <View style={styles.slotsContainer}>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>9:00 AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>10:30 AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>12:00 PM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>3:00 PM</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.dayContainer}>
                <Text style={styles.dayText}>Wednesday, 17 May</Text>
                <View style={styles.slotsContainer}>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>10:30 AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>12:00 PM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotButton, styles.slotButtonAvailable]}>
                    <Text style={styles.slotButtonText}>3:00 PM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          
          {activeTab === 'reviews' && (
            <View>
              {/* Reviews content */}
              <View style={styles.reviewsSummary}>
                <View style={styles.ratingLarge}>
                  <Text style={styles.ratingLargeText}>{doctor.rating.toFixed(1)}</Text>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={16} 
                        color="#FFC107" 
                        fill={star <= Math.round(doctor.rating) ? "#FFC107" : "none"} 
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewsCountText}>{doctor.reviewsCount} reviews</Text>
                </View>
                
                <View style={styles.ratingBars}>
                  <View style={styles.ratingBar}>
                    <Text style={styles.ratingBarLabel}>5</Text>
                    <View style={styles.ratingBarContainer}>
                      <View style={[styles.ratingBarFill, { width: '85%' }]} />
                    </View>
                  </View>
                  <View style={styles.ratingBar}>
                    <Text style={styles.ratingBarLabel}>4</Text>
                    <View style={styles.ratingBarContainer}>
                      <View style={[styles.ratingBarFill, { width: '10%' }]} />
                    </View>
                  </View>
                  <View style={styles.ratingBar}>
                    <Text style={styles.ratingBarLabel}>3</Text>
                    <View style={styles.ratingBarContainer}>
                      <View style={[styles.ratingBarFill, { width: '3%' }]} />
                    </View>
                  </View>
                  <View style={styles.ratingBar}>
                    <Text style={styles.ratingBarLabel}>2</Text>
                    <View style={styles.ratingBarContainer}>
                      <View style={[styles.ratingBarFill, { width: '1%' }]} />
                    </View>
                  </View>
                  <View style={styles.ratingBar}>
                    <Text style={styles.ratingBarLabel}>1</Text>
                    <View style={styles.ratingBarContainer}>
                      <View style={[styles.ratingBarFill, { width: '1%' }]} />
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Sample reviews */}
              <View style={styles.reviewsList}>
                <View style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>Kamal Ahmed</Text>
                      <Text style={styles.reviewDate}>10 May 2025</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} color="#FFC107" fill={star <= 5 ? "#FFC107" : "none"} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>
                    Dr. Afsana was very attentive and professional. She explained everything clearly and addressed all my concerns. I would highly recommend her.
                  </Text>
                </View>
                
                <View style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>Sadia Rahman</Text>
                      <Text style={styles.reviewDate}>5 May 2025</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} color="#FFC107" fill={star <= 4 ? "#FFC107" : "none"} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>
                    Great doctor, very knowledgeable and helpful. The wait time was a bit long, but the consultation was worth it.
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Consultation Fee</Text>
          <Text style={styles.price}>৳{doctor.fees}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for profile overlap
    backgroundColor: Colors.primary,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileSection: {
    flexDirection: 'row',
    marginTop: -80, // Negative margin to overlap with header
    marginHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  reviews: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    marginLeft: 5,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  badgesContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: Colors.primary,
  },
  videoButton: {
    backgroundColor: Colors.accent,
  },
  messageButton: {
    backgroundColor: Colors.secondary,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 5,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for bottom action
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  locationItem: {
    marginBottom: 12,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  locationTiming: {
    fontSize: 14,
    color: Colors.accent,
  },
  scheduleHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: 5,
  },
  feeType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  slotButtonAvailable: {
    backgroundColor: Colors.primaryLight,
  },
  slotButtonBooked: {
    backgroundColor: Colors.lightGray,
  },
  slotButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  slotButtonTextBooked: {
    color: Colors.gray,
  },
  reviewsSummary: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingLarge: {
    alignItems: 'center',
    marginRight: 20,
  },
  ratingLargeText: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewsCountText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  ratingBars: {
    flex: 1,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingBarLabel: {
    width: 20,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  ratingBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFC107',
  },
  reviewsList: {
    marginTop: 10,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: Colors.card,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});