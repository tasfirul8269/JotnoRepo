import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar as CalendarIcon, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingAppointments = [
    {
      id: 'a1',
      doctorName: 'Dr. Afsana Karim',
      specialty: 'Internal Medicine Specialist',
      date: 'Today, 15 May',
      time: '5:30 PM',
      type: 'video',
      profileImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'a2',
      doctorName: 'Dr. Mahbub Rahman',
      specialty: 'Cardiologist',
      date: 'Tomorrow, 16 May',
      time: '11:00 AM',
      type: 'in-person',
      profileImage: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];
  
  const pastAppointments = [
    {
      id: 'a3',
      doctorName: 'Dr. Sabrina Ahmed',
      specialty: 'Gynecologist',
      date: '10 May 2025',
      time: '4:00 PM',
      type: 'in-person',
      profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'a4',
      doctorName: 'Dr. Tarek Hossain',
      specialty: 'Orthopedic Surgeon',
      date: '5 May 2025',
      time: '6:30 PM',
      type: 'video',
      profileImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'a5',
      doctorName: 'Dr. Nusrat Jahan',
      specialty: 'Dermatologist',
      date: '28 Apr 2025',
      time: '7:15 PM',
      type: 'voice',
      profileImage: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];
  
  const renderAppointmentCard = (appointment) => {
    return (
      <View key={appointment.id} style={styles.appointmentCard}>
        <View style={styles.appointmentHeader}>
          <View style={styles.doctorInfo}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileImageText}>
                {appointment.doctorName.charAt(0)}
              </Text>
            </View>
            <View>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.specialty}>{appointment.specialty}</Text>
            </View>
          </View>
          <View style={[
            styles.typeBadge, 
            appointment.type === 'video' ? styles.videoBadge : 
            appointment.type === 'voice' ? styles.voiceBadge : styles.inPersonBadge
          ]}>
            <Text style={styles.typeText}>
              {appointment.type === 'video' ? 'Video Call' : 
               appointment.type === 'voice' ? 'Voice Call' : 'In Person'}
            </Text>
          </View>
        </View>
        
        <View style={styles.appointmentDetails}>
          <View style={styles.detailItem}>
            <CalendarIcon size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{appointment.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{appointment.time}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          {activeTab === 'upcoming' ? (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
                <Text style={styles.callText}>
                  {appointment.type === 'in-person' ? 'Get Directions' : 'Start Call'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.viewDetailsButton]}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.bookAgainButton]}>
                <Text style={styles.bookAgainText}>Book Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Appointments</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Appointment List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'upcoming' ? (
          upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(renderAppointmentCard)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No upcoming appointments</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book an Appointment</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          pastAppointments.length > 0 ? (
            pastAppointments.map(renderAppointmentCard)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No past appointments</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeTabText: {
    color: Colors.primary,
  },
  scrollContent: {
    padding: 20,
  },
  appointmentCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImageText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  videoBadge: {
    backgroundColor: Colors.primaryLight,
  },
  voiceBadge: {
    backgroundColor: '#E8F5E9',
  },
  inPersonBadge: {
    backgroundColor: '#FFF3E0',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  appointmentDetails: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButton: {
    backgroundColor: Colors.lightGray,
    marginRight: 10,
  },
  callButton: {
    backgroundColor: Colors.primary,
  },
  viewDetailsButton: {
    backgroundColor: Colors.lightGray,
    marginRight: 10,
  },
  bookAgainButton: {
    backgroundColor: Colors.secondary,
  },
  rescheduleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  callText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bookAgainText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
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