import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { X, MapPin, Star, Phone, Calendar, Users, Home } from 'lucide-react-native';
import { Hostel } from '@/types/hostel';

interface HostelDetailModalProps {
  hostel: Hostel | null;
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export default function HostelDetailModal({ hostel, visible, onClose }: HostelDetailModalProps) {
  if (!hostel) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'boys': return '#3b82f6';
      case 'girls': return '#ec4899';
      case 'coed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRoomTypeIcon = (roomType: string) => {
    switch (roomType) {
      case 'single': return <Home size={16} color="#6b7280" />;
      case 'sharing': return <Users size={16} color="#6b7280" />;
      case 'dormitory': return <Users size={16} color="#6b7280" />;
      default: return <Home size={16} color="#6b7280" />;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hostel Details</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: hostel.image }} style={styles.heroImage} />
          
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.hostelName}>{hostel.name}</Text>
              <View style={styles.typeTag}>
                <Text style={[styles.typeText, { color: getTypeColor(hostel.type) }]}>
                  {hostel.type.charAt(0).toUpperCase() + hostel.type.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.locationSection}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.address}>{hostel.address}</Text>
            </View>

            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.statText}>{hostel.rating} Rating</Text>
              </View>
              <View style={styles.statItem}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.statText}>{hostel.distance}</Text>
              </View>
              <View style={styles.statItem}>
                {getRoomTypeIcon(hostel.roomType)}
                <Text style={styles.statText}>{hostel.roomType.charAt(0).toUpperCase() + hostel.roomType.slice(1)}</Text>
              </View>
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.price}>₹{hostel.price}</Text>
              <Text style={styles.priceUnit}>/month</Text>
            </View>

            {hostel.description && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{hostel.description}</Text>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {hostel.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityTag}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactInfo}>
                {hostel.contactNumber && (
                  <View style={styles.contactItem}>
                    <Phone size={16} color="#6b7280" />
                    <Text style={styles.contactText}>{hostel.contactNumber}</Text>
                  </View>
                )}
                {hostel.availableFrom && (
                  <View style={styles.contactItem}>
                    <Calendar size={16} color="#6b7280" />
                    <Text style={styles.contactText}>Available from: {hostel.availableFrom}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.contactButton}>
            <Phone size={20} color="#ffffff" />
            <Text style={styles.contactButtonText}>Contact Owner</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  hostelName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  address: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3b82f6',
  },
  priceUnit: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});