import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Search, Check, CheckCheck, Phone, Video } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function MessagesScreen() {
  const [searchText, setSearchText] = useState('');
  
  const conversations = [
    {
      id: 'c1',
      name: 'Dr. Afsana Karim',
      profileImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
      lastMessage: 'Your prescription is ready. Please let me know if you have any questions.',
      timestamp: '10:30 AM',
      unread: 2,
      isDoctor: true,
      isOnline: true,
    },
    {
      id: 'c2',
      name: 'Square Hospital',
      profileImage: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600',
      lastMessage: 'Your appointment with Dr. Rahman has been confirmed for tomorrow at 11:00 AM.',
      timestamp: 'Yesterday',
      unread: 0,
      isDoctor: false,
      isOnline: true,
    },
    {
      id: 'c3',
      name: 'Dr. Tarek Hossain',
      profileImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
      lastMessage: 'How is your knee feeling today? Any improvements?',
      timestamp: 'Yesterday',
      unread: 1,
      isDoctor: true,
      isOnline: false,
    },
    {
      id: 'c4',
      name: 'Lazz Pharma',
      profileImage: 'https://images.pexels.com/photos/3683845/pexels-photo-3683845.jpeg?auto=compress&cs=tinysrgb&w=600',
      lastMessage: 'Your order #12345 has been delivered. Thank you for choosing us!',
      timestamp: 'May 12',
      unread: 0,
      isDoctor: false,
      isOnline: true,
    },
    {
      id: 'c5',
      name: 'Dr. Nusrat Jahan',
      profileImage: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
      lastMessage: 'Remember to apply the cream twice daily as prescribed.',
      timestamp: 'May 10',
      unread: 0,
      isDoctor: true,
      isOnline: false,
    },
  ];

  const renderConversationItem = ({ item }) => {
    return (
      <Link href={`/conversation/${item.id}`} asChild>
        <TouchableOpacity style={styles.conversationItem}>
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: item.profileImage }} 
              style={styles.profileImage} 
            />
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          
          <View style={styles.conversationDetails}>
            <View style={styles.conversationHeader}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            
            <View style={styles.conversationFooter}>
              <View style={styles.messageContainer}>
                {item.unread === 0 && (
                  <CheckCheck size={14} color={Colors.primary} style={styles.readIcon} />
                )}
                {item.unread === 0 && item.lastMessage.includes('delivered') && (
                  <Check size={14} color={Colors.gray} style={styles.readIcon} />
                )}
                <Text 
                  style={[styles.lastMessage, item.unread > 0 && styles.unreadMessage]} 
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
              </View>
              
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{item.unread}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Phone size={20} color={Colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video size={20} color={Colors.dark} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput 
          placeholder="Search messages"
          placeholderTextColor={Colors.gray}
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conversationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  conversationsList: {
    paddingVertical: 10,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.card,
    marginBottom: 1,
  },
  profileContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  conversationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.gray,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  readIcon: {
    marginRight: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  unreadMessage: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});