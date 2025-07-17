export const COLORS = {
  primary: '#3b82f6',
  secondary: '#14b8a6',
  accent: '#f97316',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Grays
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Backgrounds
  background: '#f9fafb',
  surface: '#ffffff',
  
  // Text
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
};

export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const AMENITIES = [
  'WiFi',
  'Mess',
  'Laundry',
  'AC',
  'Gym',
  'Security',
  'Parking',
  'Study Room',
  'Common Area',
  'CCTV',
  'Backup Power',
  'Water Cooler',
  'Elevator',
  'Recreation Room',
  'Medical Facility',
];

export const ROOM_TYPES = [
  { id: 'single', label: 'Single Room' },
  { id: 'sharing', label: 'Sharing Room' },
  { id: 'dormitory', label: 'Dormitory' },
];

export const HOSTEL_TYPES = [
  { id: 'boys', label: 'Boys Only' },
  { id: 'girls', label: 'Girls Only' },
  { id: 'coed', label: 'Co-ed' },
];

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'budget', label: '₹5,000 - ₹8,000', min: 5000, max: 8000 },
  { id: 'mid', label: '₹8,000 - ₹12,000', min: 8000, max: 12000 },
  { id: 'premium', label: '₹12,000+', min: 12000, max: Infinity },
];

export const DISTANCE_RANGES = [
  { id: 'all', label: 'Any Distance', max: Infinity },
  { id: 'walking', label: 'Walking Distance', max: 1 },
  { id: 'nearby', label: 'Within 2km', max: 2 },
  { id: 'farther', label: 'Within 5km', max: 5 },
];

export const INSTITUTE_INFO = {
  name: 'Haris and Co Institute',
  location: {
    latitude: 28.6139,
    longitude: 77.2090,
  },
  address: 'Delhi, India',
};