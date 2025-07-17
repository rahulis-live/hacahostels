import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star, Heart } from 'lucide-react-native';

interface HostelCardProps {
  hostel: {
    id: string;
    name: string;
    address: string;
    price: number;
    rating: number;
    distance: string;
    image: string;
    amenities: string[];
    type: string;
    isFavorite: boolean;
  };
  onPress: () => void;
  onFavoriteToggle: () => void;
}

export default function HostelCard({ hostel, onPress, onFavoriteToggle }: HostelCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: hostel.image }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoriteToggle}>
        <Heart 
          size={20} 
          color={hostel.isFavorite ? '#ef4444' : '#9ca3af'} 
          fill={hostel.isFavorite ? '#ef4444' : 'transparent'}
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.name}>{hostel.name}</Text>
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
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
  content: {
    padding: 16,
  },
  name: {
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