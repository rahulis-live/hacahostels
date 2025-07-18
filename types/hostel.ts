export interface Hostel {
  id: string;
  name: string;
  address: string;
  price: number;
  rating: number;
  distance: string;
  image: string;
  images?: string[];
  amenities: string[];
  type: 'boys' | 'girls' | 'coed';
  roomType: 'single' | 'sharing' | 'dormitory';
  isFavorite: boolean;
  description?: string;
  contactNumber?: string;
  availableFrom?: string;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  institute: string;
  userType: 'seeker' | 'lister';
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  hostelId?: string;
}

export interface SearchFilters {
  priceRange: 'all' | 'budget' | 'mid' | 'premium';
  roomType: 'all' | 'single' | 'sharing' | 'dormitory';
  hostelType: 'all' | 'boys' | 'girls' | 'coed';
  distance: 'all' | 'walking' | 'nearby' | 'farther';
  amenities: string[];
  sortBy: 'price' | 'rating' | 'distance';
  sortOrder: 'asc' | 'desc';
}