
import { Room, User, UserRole, Booking, BookingStatus, Service, Testimonial } from './types';

export const CONTACT_INFO = {
  email: 'surat.luxury@luxestay.com',
  phone: '+91 261 456 7890',
  address: '456, Diamond Avenue, near Dumas Road, Surat, Gujarat - 395007',
  owner: 'Mehul Patel'
};

export const MOCK_ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'Tapi River View Suite',
    type: 'Suite',
    price: 18500,
    description: 'Experience ultimate luxury with a panoramic view of the Tapi River. Includes private balcony and infinity pool access.',
    amenities: ['Free WiFi', 'Mini Bar', 'River View', 'King Bed', 'AC', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 2,
    available: true
  },
  {
    id: 'r2',
    name: 'Diamond City Deluxe',
    type: 'Deluxe',
    price: 8500,
    description: 'Perfect for business travelers visiting the textile and diamond hubs, offering a spacious work area and high-speed internet.',
    amenities: ['Free WiFi', 'Coffee Maker', 'Desk', 'Queen Bed', 'AC', 'Laundry'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 2,
    available: true
  },
  {
    id: 'r3',
    name: 'Dumas Garden Villa',
    type: 'Suite',
    price: 24000,
    description: 'Spacious multi-bedroom villa surrounded by lush gardens near the coastline. Ideal for large families and long stays.',
    amenities: ['Garden View', 'Kitchenette', 'Private Patio', '2 King Beds', 'Play Area'],
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 4,
    available: true
  },
  {
    id: 'r4',
    name: 'Surat Royal Penthouse',
    type: 'Penthouse',
    price: 45000,
    description: 'Top-floor penthouse with 360-degree city views of the Surat skyline and a private butler for elite comfort.',
    amenities: ['Private Elevator', 'City View', 'Personal Chef', 'Luxury Bath', 'Jacuzzi'],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 4,
    available: true
  },
  {
    id: 'r5',
    name: 'Executive Business King',
    type: 'Standard',
    price: 6500,
    description: 'Designed for efficiency and comfort. Located near the conference center with ergonomic seating and soundproofing.',
    amenities: ['Free WiFi', 'Work Desk', 'Ironing', 'King Bed', 'Coffee Station'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 2,
    available: true
  },
  {
    id: 'r6',
    name: 'Heritage Family Suite',
    type: 'Suite',
    price: 15000,
    description: 'A tribute to Gujarati culture with traditional decor, swing (jhula), and modern amenities for the whole family.',
    amenities: ['Traditional Decor', 'Living Area', '2 Queen Beds', 'Bathtub', 'Welcome Thali'],
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 4,
    available: false // Currently booked/maintenance
  },
  {
    id: 'r7',
    name: 'Surat Diamond Suite',
    type: 'Suite',
    price: 20000,
    description: 'A premium suite featuring modern diamond-themed interiors and a private view of the city center.',
    amenities: ['Free WiFi', 'Mini Bar', 'City View', 'King Bed', 'AC', 'Jacuzzi'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9759678?auto=format&fit=crop&q=80&w=800'
    ],
    capacity: 2,
    available: true
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    username: 'admin',
    email: 'admin@luxestay.com',
    phone: '9876543210',
    role: UserRole.ADMIN,
    avatar: 'https://i.pravatar.cc/150?u=admin',
    password: 'password123'
  },
  {
    id: 'u2',
    name: 'Mehul Patel',
    username: 'mehul123',
    email: 'mehul@example.com',
    phone: '9988776655',
    role: UserRole.CLIENT,
    avatar: 'https://i.pravatar.cc/150?u=mehul',
    password: 'password123'
  },
  {
    id: 'u3',
    name: 'Sneha Shah',
    username: 'sneha_s',
    email: 'sneha@example.com',
    phone: '9898989898',
    role: UserRole.CLIENT,
    avatar: 'https://i.pravatar.cc/150?u=sneha',
    password: 'password123'
  },
  {
    id: 'u4',
    name: 'Rahul Dravid',
    username: 'rahul_wall',
    email: 'rahul@example.com',
    phone: '9123456780',
    role: UserRole.CLIENT,
    password: 'password123'
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    userId: 'u2',
    roomId: 'r1',
    checkIn: '2024-06-15',
    checkOut: '2024-06-17',
    totalPrice: 37000,
    status: BookingStatus.APPROVED,
    createdAt: '2024-05-10T10:00:00Z'
  },
  {
    id: 'b2',
    userId: 'u3',
    roomId: 'r3',
    checkIn: '2024-07-01',
    checkOut: '2024-07-05',
    totalPrice: 96000,
    status: BookingStatus.PENDING,
    createdAt: '2024-06-25T14:30:00Z'
  },
  {
    id: 'b3',
    userId: 'u4',
    roomId: 'r2',
    checkIn: '2024-06-20',
    checkOut: '2024-06-21',
    totalPrice: 8500,
    status: BookingStatus.APPROVED,
    createdAt: '2024-06-18T09:15:00Z'
  },
  {
    id: 'b4',
    userId: 'u2',
    roomId: 'r4',
    checkIn: '2024-08-10',
    checkOut: '2024-08-12',
    totalPrice: 90000,
    status: BookingStatus.PENDING,
    createdAt: '2024-06-28T16:45:00Z'
  },
  {
    id: 'b5',
    userId: 'u3',
    roomId: 'r5',
    checkIn: '2024-05-01',
    checkOut: '2024-05-02',
    totalPrice: 6500,
    status: BookingStatus.CANCELLED,
    createdAt: '2024-04-20T11:20:00Z'
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Gourmet Dining',
    description: 'Indulge in authentic Gujarati Thali and international cuisines at our award-winning rooftop restaurant.',
    iconKey: 'dining'
  },
  {
    id: 's2',
    title: 'Luxury Spa',
    description: 'Rejuvenate your senses with world-class ayurvedic treatments and modern therapy sessions.',
    iconKey: 'spa'
  },
  {
    id: 's3',
    title: 'Chauffeur Service',
    description: 'Premium airport transfers and city tours in luxury sedans for your convenience.',
    iconKey: 'transport'
  },
  {
    id: 's4',
    title: 'Grand Events',
    description: 'State-of-the-art banquet halls perfect for weddings and corporate conferences.',
    iconKey: 'event'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Shah',
    location: 'Mumbai',
    rating: 5,
    text: "The view of the Tapi river from the suite was breathtaking. The hospitality was unmatched, truly a 'Luxe' experience in Surat!",
    avatar: 'https://i.pravatar.cc/150?u=priya'
  },
  {
    id: 't2',
    name: 'Rajesh Gupta',
    location: 'Ahmedabad',
    rating: 5,
    text: "I visited for a diamond business trip. The high-speed internet and desk setup in the Deluxe room were perfect for my work needs.",
    avatar: 'https://i.pravatar.cc/150?u=rajesh'
  },
  {
    id: 't3',
    name: 'Sarah Williams',
    location: 'London, UK',
    rating: 4,
    text: "A hidden gem in Gujarat. The AI concierge helped me find the best local textile markets. Will definitely visit again.",
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 't4',
    name: 'Amit Patel',
    location: 'Surat',
    rating: 5,
    text: "Celebrated my anniversary at the Rooftop restaurant. The staff went above and beyond to make it special. Highly recommended!",
    avatar: 'https://i.pravatar.cc/150?u=amit'
  }
];

export const UI_STRINGS = {
  home: 'Home',
  heroTitle: 'LuxeStay Surat',
  heroSub: 'Experience unparalleled luxury in the heart of the Diamond City.',
  browseRooms: 'Browse Rooms',
  featured: 'Featured Accommodations',
  services: 'World Class Services',
  testimonials: 'Guest Experiences',
  aiTitle: 'AI Concierge',
  aiPlaceholder: 'Ex: I need a suite with a river view for 2 nights...',
  aiLoading: 'Thinking...',
  login: 'Login',
  register: 'Register',
  admin: 'Admin',
  dashboard: 'Dashboard',
  rooms: 'Rooms',
  about: 'About Us',
  contact: 'Contact Us',
  bookNow: 'Book Now',
  checkIn: 'Check In',
  checkOut: 'Check Out',
  totalPrice: 'Total Price',
  confirm: 'Confirm Booking',
  logout: 'Logout',
  currency: '₹',
  email: 'Mail ID',
  password: 'Password',
  newPassword: 'New Password',
  confirmPassword: 'Confirm Password',
  name: 'Full Name',
  username: 'Username',
  contactNumber: 'Contact Number',
  noAccount: "Don't have an account?",
  hasAccount: 'Already have an account?',
  forgotPassword: 'Forgot Password?',
  resetPassword: 'Reset Password',
  backToLogin: 'Back to Login',
  passwordUpdated: 'Password reset successfully!',
  userNotFound: 'User not found. Check Username and Mail ID.',
  contactTitle: 'Get in Touch',
  contactSub: 'Our Surat team is available 24/7 to assist you.',
  ownerLabel: 'General Manager',
  phoneLabel: 'Surat Office',
  emailLabel: 'Email Address',
  myBookings: 'My Bookings',
  noBookings: 'You have no bookings yet.',
  status: 'Status',
  cancelBooking: 'Cancel Booking',
  findUs: 'Find us in Surat',
  directions: 'Get Directions',
  payNow: 'Complete Transaction',
  paymentSuccess: 'Payment Successful!',
  paymentSuccessSub: 'Your Surat stay is officially confirmed.',
  otpLabel: 'OTP Code',
  getOtp: 'Get OTP'
};
