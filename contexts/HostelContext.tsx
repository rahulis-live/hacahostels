import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hostel } from '@/types/hostel';

interface HostelContextType {
  hostels: Hostel[];
  addHostel: (hostel: Omit<Hostel, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateHostel: (id: string, updates: Partial<Hostel>) => void;
  toggleFavorite: (id: string) => void;
  deleteHostel: (id: string) => void;
}

const HostelContext = createContext<HostelContextType | undefined>(undefined);

export const useHostels = () => {
  const context = useContext(HostelContext);
  if (!context) {
    throw new Error('useHostels must be used within a HostelProvider');
  }
  return context;
};

const initialHostels: Hostel[] = [
  {
    id: '1',
    name: 'Sunrise Boys Hostel',
    address: '123 College Road, Near Haris Institute',
    price: 8000,
    rating: 4.5,
    distance: '0.5 km',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['WiFi', 'Mess', 'Laundry', 'AC'],
    type: 'boys',
    roomType: 'single',
    isFavorite: false,
    description: 'A comfortable boys hostel with all modern amenities near the institute.',
    contactNumber: '+91 9876543210',
    availableFrom: 'Immediately',
    ownerId: 'owner1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Elite Girls Hostel',
    address: '456 University Avenue, Haris Colony',
    price: 9500,
    rating: 4.7,
    distance: '0.8 km',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['WiFi', 'Mess', 'Security', 'AC', 'Gym'],
    type: 'girls',
    roomType: 'single',
    isFavorite: true,
    description: 'Premium girls hostel with excellent security and facilities.',
    contactNumber: '+91 9876543211',
    availableFrom: '1st January 2024',
    ownerId: 'owner2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Budget Stay Hostel',
    address: '789 Student Street, Institute Area',
    price: 6500,
    rating: 4.2,
    distance: '1.2 km',
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['WiFi', 'Mess', 'Laundry'],
    type: 'coed',
    roomType: 'sharing',
    isFavorite: false,
    description: 'Affordable hostel option for budget-conscious students.',
    contactNumber: '+91 9876543212',
    availableFrom: '15th January 2024',
    ownerId: 'owner3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const HostelProvider = ({ children }: { children: ReactNode }) => {
  const [hostels, setHostels] = useState<Hostel[]>(initialHostels);

  const addHostel = (hostelData: Omit<Hostel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newHostel: Hostel = {
      ...hostelData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setHostels(prev => [newHostel, ...prev]);
  };

  const updateHostel = (id: string, updates: Partial<Hostel>) => {
    setHostels(prev => prev.map(hostel => 
      hostel.id === id 
        ? { ...hostel, ...updates, updatedAt: new Date().toISOString() }
        : hostel
    ));
  };

  const toggleFavorite = (id: string) => {
    setHostels(prev => prev.map(hostel => 
      hostel.id === id 
        ? { ...hostel, isFavorite: !hostel.isFavorite, updatedAt: new Date().toISOString() }
        : hostel
    ));
  };

  const deleteHostel = (id: string) => {
    setHostels(prev => prev.filter(hostel => hostel.id !== id));
  };

  return (
    <HostelContext.Provider value={{
      hostels,
      addHostel,
      updateHostel,
      toggleFavorite,
      deleteHostel,
    }}>
      {children}
    </HostelContext.Provider>
  );
};