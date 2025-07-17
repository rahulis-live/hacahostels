import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Search, Filter, MapPin, FileSliders as Sliders } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'all',
    roomType: 'all',
    distance: 'all',
    amenities: [] as string[],
  });

  const priceRanges = [
    { id: 'all', label: 'All Prices', value: 'all' },
    { id: 'budget', label: '₹5,000 - ₹8,000', value: 'budget' },
    { id: 'mid', label: '₹8,000 - ₹12,000', value: 'mid' },
    { id: 'premium', label: '₹12,000+', value: 'premium' },
  ];

  const roomTypes = [
    { id: 'all', label: 'All Types', value: 'all' },
    { id: 'single', label: 'Single Room', value: 'single' },
    { id: 'sharing', label: 'Sharing Room', value: 'sharing' },
    { id: 'dormitory', label: 'Dormitory', value: 'dormitory' },
  ];

  const distances = [
    { id: 'all', label: 'Any Distance', value: 'all' },
    { id: 'walking', label: 'Walking Distance', value: 'walking' },
    { id: 'nearby', label: 'Within 2km', value: 'nearby' },
    { id: 'farther', label: 'Within 5km', value: 'farther' },
  ];

  const amenities = [
    'WiFi', 'Mess', 'Laundry', 'AC', 'Gym', 'Security', 'Parking', 'Study Room'
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const FilterSection = ({ title, options, selected, onSelect }: {
    title: string;
    options: { id: string; label: string; value: string }[];
    selected: string;
    onSelect: (value: string) => void;
  }) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterOptions}>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterOption,
                selected === option.value && styles.selectedFilterOption
              ]}
              onPress={() => onSelect(option.value)}
            >
              <Text style={[
                styles.filterOptionText,
                selected === option.value && styles.selectedFilterOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Hostels</Text>
        <TouchableOpacity style={styles.mapButton}>
          <MapPin size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hostels, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Sliders size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <FilterSection
          title="Price Range"
          options={priceRanges}
          selected={selectedFilters.priceRange}
          onSelect={(value) => setSelectedFilters(prev => ({ ...prev, priceRange: value }))}
        />

        <FilterSection
          title="Room Type"
          options={roomTypes}
          selected={selectedFilters.roomType}
          onSelect={(value) => setSelectedFilters(prev => ({ ...prev, roomType: value }))}
        />

        <FilterSection
          title="Distance from Institute"
          options={distances}
          selected={selectedFilters.distance}
          onSelect={(value) => setSelectedFilters(prev => ({ ...prev, distance: value }))}
        />

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map(amenity => (
              <TouchableOpacity
                key={amenity}
                style={[
                  styles.amenityTag,
                  selectedFilters.amenities.includes(amenity) && styles.selectedAmenityTag
                ]}
                onPress={() => toggleAmenity(amenity)}
              >
                <Text style={[
                  styles.amenityText,
                  selectedFilters.amenities.includes(amenity) && styles.selectedAmenityText
                ]}>
                  {amenity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Hostels</Text>
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
  mapButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#1f2937',
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  filterSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedFilterOption: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedFilterOptionText: {
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  searchButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});