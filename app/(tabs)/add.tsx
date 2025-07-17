import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Camera, Plus, X, MapPin, Upload } from 'lucide-react-native';
import { useHostels } from '@/contexts/HostelContext';
import { router } from 'expo-router';

export default function AddListingScreen() {
  const { addHostel } = useHostels();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    description: '',
    roomType: 'single',
    hostelType: 'boys',
    amenities: [] as string[],
    images: [] as string[],
    contactNumber: '',
    availableFrom: '',
  });

  const roomTypes = [
    { id: 'single', label: 'Single Room' },
    { id: 'sharing', label: 'Sharing Room' },
    { id: 'dormitory', label: 'Dormitory' },
  ];

  const hostelTypes = [
    { id: 'boys', label: 'Boys Only' },
    { id: 'girls', label: 'Girls Only' },
    { id: 'coed', label: 'Co-ed' },
  ];

  const availableAmenities = [
    'WiFi', 'Mess', 'Laundry', 'AC', 'Gym', 'Security', 'Parking', 'Study Room',
    'Common Area', 'CCTV', 'Backup Power', 'Water Cooler'
  ];

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const addImage = () => {
    // Simulating image picker
    const demoImages = [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, randomImage]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.price || !formData.contactNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Calculate a random distance for demo purposes
    const distances = ['0.3 km', '0.5 km', '0.8 km', '1.2 km', '1.5 km', '2.0 km'];
    const randomDistance = distances[Math.floor(Math.random() * distances.length)];
    
    // Generate a random rating between 4.0 and 5.0
    const randomRating = Math.round((4.0 + Math.random() * 1.0) * 10) / 10;
    
    // Create the new hostel object
    const newHostel = {
      name: formData.name,
      address: formData.address,
      price: parseInt(formData.price),
      rating: randomRating,
      distance: randomDistance,
      image: formData.images[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: formData.amenities,
      type: formData.hostelType as 'boys' | 'girls' | 'coed',
      roomType: formData.roomType as 'single' | 'sharing' | 'dormitory',
      isFavorite: false,
      description: formData.description,
      contactNumber: formData.contactNumber,
      availableFrom: formData.availableFrom || 'Immediately',
      ownerId: 'current-user', // In a real app, this would be the current user's ID
    };
    
    // Add the hostel to the global state
    addHostel(newHostel);
    
    Alert.alert('Success', 'Hostel listing created successfully!');
    
    // Reset form
    setFormData({
      name: '',
      address: '',
      price: '',
      description: '',
      roomType: 'single',
      hostelType: 'boys',
      amenities: [],
      images: [],
      contactNumber: '',
      availableFrom: '',
    });
    
    // Navigate back to home tab to see the new listing
    router.push('/(tabs)/');
  };

  const RadioGroup = ({ options, selected, onSelect, title }: {
    options: { id: string; label: string }[];
    selected: string;
    onSelect: (value: string) => void;
    title: string;
  }) => (
    <View style={styles.radioGroup}>
      <Text style={styles.radioTitle}>{title}</Text>
      <View style={styles.radioOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.radioOption,
              selected === option.id && styles.selectedRadioOption
            ]}
            onPress={() => onSelect(option.id)}
          >
            <Text style={[
              styles.radioOptionText,
              selected === option.id && styles.selectedRadioOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Listing</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hostel Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter hostel name"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter complete address"
              value={formData.address}
              onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Rent *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount in ₹"
              value={formData.price}
              onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
              keyboardType="numeric"
            />
          </View>

          <RadioGroup
            title="Room Type"
            options={roomTypes}
            selected={formData.roomType}
            onSelect={(value) => setFormData(prev => ({ ...prev, roomType: value }))}
          />

          <RadioGroup
            title="Hostel Type"
            options={hostelTypes}
            selected={formData.hostelType}
            onSelect={(value) => setFormData(prev => ({ ...prev, hostelType: value }))}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChangeText={(text) => setFormData(prev => ({ ...prev, contactNumber: text }))}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Available From</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Immediately, 1st Jan 2024"
              value={formData.availableFrom}
              onChangeText={(text) => setFormData(prev => ({ ...prev, availableFrom: text }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your hostel, facilities, rules..."
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {availableAmenities.map(amenity => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityTag,
                    formData.amenities.includes(amenity) && styles.selectedAmenityTag
                  ]}
                  onPress={() => toggleAmenity(amenity)}
                >
                  <Text style={[
                    styles.amenityText,
                    formData.amenities.includes(amenity) && styles.selectedAmenityText
                  ]}>
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Photos</Text>
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.addImageButton} onPress={addImage}>
                <Camera size={24} color="#3b82f6" />
                <Text style={styles.addImageText}>Add Photo</Text>
              </TouchableOpacity>
              
              {formData.images.map((image, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri: image }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <X size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Listing</Text>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  helpButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  helpButtonText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioGroup: {
    marginBottom: 24,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  radioOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  radioOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedRadioOption: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  radioOptionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedRadioOptionText: {
    color: '#ffffff',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedAmenityTag: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  amenityText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedAmenityText: {
    color: '#ffffff',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: 4,
  },
  imagePreview: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});