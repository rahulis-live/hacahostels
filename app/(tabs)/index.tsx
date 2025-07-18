import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { MapPin, Star, Heart, Filter } from 'lucide-react-native';
import { router } from 'expo-router';
import { useHostels } from '@/contexts/HostelContext';
import { Hostel } from '@/types/hostel';

export default function HomeScreen() {
  const { hostels, toggleFavorite } = useHostels();
  const [userType, setUserType] = useState<'seeker' | 'lister'>('seeker');

  const HostelCard = ({ hostel }: { hostel: Hostel }) => (
    <TouchableOpacity 
      style={styles.hostelCard}
      onPress={() => router.push(`/hostel/${hostel.id}`)}
    >
      <Image source={{ uri: hostel.image }} style={styles.hostelImage} />
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(hostel.id)}
      >
        <Heart 
          size={20} 
          color={hostel.isFavorite ? '#ef4444' : '#9ca3af'} 
          fill={hostel.isFavorite ? '#ef4444' : 'transparent'}
        />
      </TouchableOpacity>
      
      <View style={styles.hostelInfo}>
        <Text style={styles.hostelName}>{hostel.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.address}>{hostel.address}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Star size={14} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.rating}>{hostel.rating}</Text>
          <Text style={styles.distance}>• {hostel.distance}</Text>
        </View>
        <View style={styles.amenitiesRow}>
          {hostel.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{hostel.price}</Text>
          <Text style={styles.priceUnit}>/month</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('@/assets/images/rahul.png')} 
            style={styles.logo}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/(tabs)/search')}>
          <Text style={styles.searchButtonText}>Find Hostel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Hostels ({hostels.length})</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hostelList}>
          {hostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  hostelList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  hostelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hostelImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hostelInfo: {
    padding: 16,
  },
  hostelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
    marginLeft: 4,
  },
  distance: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  amenityTag: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  priceUnit: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
});