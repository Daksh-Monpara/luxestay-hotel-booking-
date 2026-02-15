
/**
 * DATA DEFINITIONS (Data na Prakar)
 * ---------------------------------
 * This file defines the shape of data used throughout the entire application.
 * Linked: Imported by almost every file (App.tsx, constants.tsx, components, etc.) to ensure data consistency.
 */

export enum UserRole {
  CLIENT = 'CLIENT', // Regular customer
  ADMIN = 'ADMIN'    // Hotel manager (Mehul Patel)
}

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED'
}

// Defines what a User looks like in our "database"
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  password?: string;
}

// Defines the structure of a Room
// Used in: App.tsx (state), Home.tsx (display), RoomCard.tsx
export interface Room {
  id: string;
  name: string;
  type: 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';
  price: number;
  description: string;
  amenities: string[];
  images: string[]; // Array of image URLs for the ImageCarousel
  capacity: number;
  available: boolean;
}

// Defines a Booking
// Used in: App.tsx (state), AdminDashboard.tsx (reports), User Profile
export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconKey: 'dining' | 'spa' | 'transport' | 'event';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

// THE GLOBAL STATE (Sampurna App no Data)
// Used in: App.tsx to store the current status of the application
export interface AppState {
  currentUser: User | null; // Who is logged in?
  rooms: Room[];            // List of all rooms
  bookings: Booking[];      // List of all bookings
  users: User[];            // List of registered users
}
