
/**
 * MAIN CONTROLLER (Mukhya Controller)
 * -----------------------------------
 * Purpose: This file acts as the "Brain" of the application.
 * Theme: Tropical Luxury (Teal/Stone/Amber).
 * Updates: Added Booking Summary to Confirmation Modal.
 */

import React, { useState, useEffect } from 'react';
import { AppState, User, Room, Booking, BookingStatus, UserRole } from './types';
import { MOCK_ROOMS, MOCK_USERS, MOCK_BOOKINGS, UI_STRINGS } from './constants';
// Component Links
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import CalendarPicker from './components/CalendarPicker';
import ImageCarousel from './components/ImageCarousel';
import { 
  X, Check, ArrowRight, Lock, Star, Hotel, 
  ChevronLeft, CreditCard, Smartphone, AlertCircle, CheckCircle2, Banknote, QrCode, Phone, Key, Mail
} from 'lucide-react';

const App: React.FC = () => {
  // STATE MANAGEMENT
  const [state, setState] = useState<AppState>({
    currentUser: null,
    rooms: MOCK_ROOMS,
    bookings: MOCK_BOOKINGS,
    users: MOCK_USERS,
  });

  // NAVIGATION STATE
  const [currentPage, setCurrentPage] = useState('home');
  
  // MODAL STATE
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // AUTH & FORM STATES
  const [bookingStep, setBookingStep] = useState<'details' | 'payment'>('details');
  const [authState, setAuthState] = useState<'login' | 'register' | 'forgot'>('login');
  const [loginData, setLoginData] = useState({ 
    name: '', username: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' 
  });
  
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [forgotStep, setForgotStep] = useState<'init' | 'otp'>('init');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  
  const [bookingFormData, setBookingFormData] = useState({ checkIn: '', checkOut: '' });
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cash'>('card');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc'>('price-asc');
  
  const t = UI_STRINGS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Reset booking form when a room is opened/closed
  useEffect(() => {
    setBookingStep('details');
    setBookingFormData({ checkIn: '', checkOut: '' });
  }, [selectedRoom]);

  /**
   * AUTHENTICATION LOGIC
   */
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    // --- REGISTER LOGIC ---
    if (authState === 'register') {
      if (loginData.password !== loginData.confirmPassword) {
        setAuthError('Passwords do not match.');
        return;
      }
      const existingUser = state.users.find(u => u.email === loginData.email || u.username === loginData.username);
      if (existingUser) {
        setAuthError('Email or Username already exists.');
        return;
      }
      const newUser: User = {
        id: `u${Date.now()}`,
        name: loginData.name,
        username: loginData.username,
        email: loginData.email,
        phone: loginData.phone,
        role: UserRole.CLIENT,
        password: loginData.password
      };
      setState(prev => ({ ...prev, users: [...prev.users, newUser], currentUser: newUser }));
      setCurrentPage('home');
    } 
    // --- LOGIN LOGIC ---
    else if (authState === 'login') {
      const user = state.users.find(u => 
        u.username === loginData.username && 
        u.email === loginData.email &&
        u.password === loginData.password
      );
      
      if (user) {
        setState(prev => ({ ...prev, currentUser: user })); 
        setCurrentPage('home'); 
      } else {
        setAuthError('Invalid credentials. Check Username, Mail ID, and Password.');
      }
    } 
    // --- FORGOT PASSWORD LOGIC ---
    else if (authState === 'forgot') {
      if (forgotStep === 'init') {
        const user = state.users.find(u => u.username === loginData.username && u.email === loginData.email);
        if (user) {
          const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedOtp(mockOtp);
          setForgotStep('otp');
          setAuthSuccess(`OTP for ${loginData.username}: ${mockOtp}`);
        } else {
          setAuthError('User not found. Check Username and Mail ID.');
        }
      } else {
        if (loginData.otp !== generatedOtp) {
          setAuthError('Invalid OTP code.');
          return;
        }
        if (loginData.password !== loginData.confirmPassword) {
          setAuthError('Passwords do not match.');
          return;
        }
        const userIndex = state.users.findIndex(u => u.username === loginData.username && u.email === loginData.email);
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], password: loginData.password };
        setState(prev => ({ ...prev, users: updatedUsers }));
        
        setAuthSuccess('Password reset successfully!');
        setTimeout(() => {
          setAuthState('login');
          setForgotStep('init');
          setAuthSuccess('');
          setGeneratedOtp(null);
        }, 2000);
      }
    }
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
    setCurrentPage('home');
  };

  const calculateNights = () => {
    if (!bookingFormData.checkIn || !bookingFormData.checkOut) return 0;
    const start = new Date(bookingFormData.checkIn);
    const end = new Date(bookingFormData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCreateBooking = () => {
    if (!state.currentUser || !selectedRoom) return;
    const nights = calculateNights();
    
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      userId: state.currentUser.id,
      roomId: selectedRoom.id,
      checkIn: bookingFormData.checkIn,
      checkOut: bookingFormData.checkOut,
      totalPrice: selectedRoom.price * nights,
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    setState(prev => ({ ...prev, bookings: [...prev.bookings, newBooking] }));
    
    setShowBookingConfirm(true);
    setTimeout(() => {
      setShowBookingConfirm(false);
      setSelectedRoom(null);
      setCurrentPage('home');
    }, 2500);
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setState(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === id ? { ...b, status } : b) }));
  };

  const updateRoomAvailability = (id: string, available: boolean) => {
    setState(prev => ({
      ...prev,
      rooms: prev.rooms.map(r => r.id === id ? { ...r, available } : r)
    }));
  };

  // RENDER LOGIC
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home rooms={state.rooms} onRoomClick={setSelectedRoom} onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminDashboard state={state} updateBookingStatus={updateBookingStatus} updateRoomAvailability={updateRoomAvailability} />;
      case 'my-bookings':
        if (!state.currentUser) return null;
        let userBookings = state.bookings.filter(b => b.userId === state.currentUser?.id);
        return (
          <div className="max-w-5xl mx-auto px-4 py-32 animate-in fade-in duration-500">
            <h1 className="text-5xl font-serif text-teal-900 mb-4">{t.myBookings}</h1>
            {userBookings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-stone-100">
                    <p className="text-stone-400 text-lg">{t.noBookings}</p>
                    <button onClick={() => setCurrentPage('rooms')} className="mt-4 text-teal-600 font-bold hover:underline">Browse Rooms</button>
                </div>
            ) : (
                <div className="grid gap-8 mt-12">
                {userBookings.map(booking => {
                    const room = state.rooms.find(r => r.id === booking.roomId);
                    return (
                    <div key={booking.id} className="bg-white rounded-[2.5rem] border border-stone-100 p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm">
                        <img src={room?.images[0]} className="w-full md:w-48 h-32 object-cover rounded-2xl" alt="" />
                        <div className="flex-1">
                        <h4 className="text-2xl font-serif font-bold text-teal-950">{room?.name}</h4>
                        <p className="text-stone-500 font-medium mt-1">{booking.checkIn} — {booking.checkOut}</p>
                        </div>
                        <div className="text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            booking.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                            booking.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-stone-50 text-stone-500 border-stone-100'
                        }`}>{booking.status}</span>
                        <p className="text-xl font-bold text-teal-900 mt-3">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                    );
                })}
                </div>
            )}
          </div>
        );
      case 'rooms':
        const filteredRooms = state.rooms.filter(r => r.available);
        const sortedRooms = [...filteredRooms].sort((a, b) => {
          if (sortBy === 'price-asc') return a.price - b.price;
          if (sortBy === 'price-desc') return b.price - a.price;
          return a.name.localeCompare(b.name);
        });
        return (
          <div className="max-w-7xl mx-auto px-4 py-32 animate-in fade-in duration-500">
            <div className="mb-16 text-center">
              <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">The Collection</span>
              <h1 className="text-5xl font-serif text-teal-900 mb-4">{t.rooms}</h1>
              <p className="text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">Luxury escapes in Surat designed for your ultimate comfort and elite lifestyle.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {sortedRooms.map(room => (
                <div key={room.id} className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 group hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden m-2 rounded-3xl">
                    <ImageCarousel 
                      images={room.images} 
                      alt={room.name} 
                      className="h-full w-full"
                      imageClassName="group-hover:scale-110"
                      onImageClick={() => setSelectedRoom(room)}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-teal-900 uppercase tracking-widest pointer-events-none">{room.type}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-stone-800">{room.name}</h3>
                    <div className="flex justify-between items-center pt-6 border-t border-stone-50 mt-4">
                      <div><span className="text-2xl font-bold text-teal-900">₹{room.price.toLocaleString('en-IN')}</span></div>
                      <button onClick={() => setSelectedRoom(room)} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-teal-700 transition-all">{t.bookNow}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-stone-200/50 w-full max-w-lg border border-stone-100">
                <div className="flex justify-center mb-6 text-teal-900"><Hotel size={40} /></div>
                <h2 className="text-4xl font-serif font-bold text-teal-950 mb-2 text-center">
                  {authState === 'register' ? t.register : authState === 'forgot' ? t.resetPassword : t.login}
                </h2>
                
                {authError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in">
                    <AlertCircle size={20} />
                    <span className="text-sm font-bold">{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-bold">{authSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-6 mt-8">
                  {authState === 'register' && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">{t.name}</label>
                      <input type="text" required value={loginData.name} onChange={(e) => setLoginData({...loginData, name: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all" />
                    </div>
                  )}
                  
                  {(authState === 'login' || authState === 'register' || authState === 'forgot') && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">{t.username}</label>
                      <input type="text" required value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all" />
                    </div>
                  )}

                  {(authState === 'login' || authState === 'register' || authState === 'forgot') && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">{t.email}</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="email" required value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl pl-12 pr-5 py-4 focus:ring-0 font-medium transition-all" />
                      </div>
                    </div>
                  )}

                  {authState === 'register' && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">{t.contactNumber}</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="tel" required value={loginData.phone} onChange={(e) => setLoginData({...loginData, phone: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl pl-12 pr-5 py-4 focus:ring-0 font-medium transition-all" />
                      </div>
                    </div>
                  )}

                  {authState === 'forgot' && forgotStep === 'otp' && (
                    <div className="space-y-2 animate-in slide-in-from-top-4">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">{t.otpLabel}</label>
                      <div className="relative">
                        <Key size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="text" placeholder="Enter 6-digit OTP" required value={loginData.otp} onChange={(e) => setLoginData({...loginData, otp: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl pl-12 pr-5 py-4 focus:ring-0 font-black tracking-[0.5em] text-center" />
                      </div>
                    </div>
                  )}

                  {(authState !== 'forgot' || forgotStep === 'otp') && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">
                          {authState === 'forgot' ? t.newPassword : t.password}
                        </label>
                        <input type="password" required value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all" />
                      </div>
                      {(authState === 'register' || authState === 'forgot') && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">{t.confirmPassword}</label>
                          <input type="password" required value={loginData.confirmPassword} onChange={(e) => setLoginData({...loginData, confirmPassword: e.target.value})} className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {authState === 'login' && (
                    <div className="flex justify-end">
                      <button type="button" onClick={() => { setAuthState('forgot'); setForgotStep('init'); setAuthError(''); setAuthSuccess(''); }} className="text-xs font-bold text-teal-600 hover:underline">
                        {t.forgotPassword}
                      </button>
                    </div>
                  )}

                  <button type="submit" className="w-full bg-teal-900 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/20">
                    {authState === 'forgot' && forgotStep === 'init' ? t.getOtp : 
                     authState === 'register' ? t.register : 
                     authState === 'forgot' ? t.resetPassword : t.login}
                  </button>
                </form>

                <div className="mt-8 text-center text-sm font-bold text-stone-400">
                  {authState === 'login' ? (
                    <p>{t.noAccount} <button onClick={() => { setAuthState('register'); setAuthError(''); setAuthSuccess(''); }} className="text-teal-700 hover:underline">{t.register}</button></p>
                  ) : (
                    <p>{t.hasAccount} <button onClick={() => { setAuthState('login'); setAuthError(''); setAuthSuccess(''); }} className="text-teal-700 hover:underline">{t.login}</button></p>
                  )}
                </div>
            </div>
          </div>
        );
      default:
        return <div className="p-20 text-center">Page Under Development</div>;
    }
  };

  // Main UI Structure
  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-300 selection:bg-amber-100 selection:text-teal-900">
      {/* Linked: Navbar Component */}
      <Navbar 
        currentUser={state.currentUser} 
        onLogout={handleLogout} 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
      />
      
      {/* Main Content Area */}
      <main className="min-h-[80vh]">{renderContent()}</main>

      {/* ROOM DETAILS MODAL */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" onClick={() => setSelectedRoom(null)}></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
            <div className="md:w-5/12 h-64 md:h-auto overflow-hidden relative bg-stone-100">
              {/* Linked: ImageCarousel Component inside Modal */}
              <ImageCarousel 
                images={selectedRoom.images} 
                alt={selectedRoom.name} 
                className="h-full w-full"
              />
            </div>

            <div className="md:w-7/12 p-10 md:p-14 overflow-y-auto bg-white">
              <button onClick={() => setSelectedRoom(null)} className="absolute top-8 right-8 p-3 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors z-20 text-stone-500"><X size={24}/></button>
              {bookingStep === 'details' ? (
                <>
                  <div className="flex items-center gap-2 text-teal-600 mb-3"><Star size={16} fill="currentColor"/><span className="text-xs font-black uppercase tracking-[0.2em]">{selectedRoom.type}</span></div>
                  <h2 className="text-4xl font-serif text-teal-950 mb-4">{selectedRoom.name}</h2>
                  <p className="text-stone-500 mb-8 leading-relaxed text-lg font-light">{selectedRoom.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">{t.checkIn} & {t.checkOut}</h3>
                    {/* Linked: CalendarPicker Component */}
                    <CalendarPicker 
                      checkIn={bookingFormData.checkIn} 
                      checkOut={bookingFormData.checkOut} 
                      onChange={(dates) => setBookingFormData(dates)} 
                    />
                  </div>

                  <div className="bg-stone-50 p-10 rounded-[2.5rem] border border-stone-100 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="text-center sm:text-left">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t.totalPrice}</p>
                          <p className="text-4xl font-serif text-teal-900">₹{(selectedRoom.price * (calculateNights() || 1)).toLocaleString('en-IN')}</p>
                        </div>
                        <button onClick={() => state.currentUser ? setBookingStep('payment') : setCurrentPage('login')} disabled={!bookingFormData.checkIn || !bookingFormData.checkOut} className="w-full sm:w-auto bg-teal-900 text-white px-10 py-5 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest hover:bg-teal-800 disabled:opacity-50 transition-all shadow-xl shadow-teal-900/10">
                          {state.currentUser ? t.confirm : t.login}
                        </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="animate-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setBookingStep('details')} className="p-2 hover:bg-stone-100 rounded-full text-stone-500"><ChevronLeft size={24}/></button>
                    <h2 className="text-3xl font-serif text-teal-950">{t.confirm}</h2>
                  </div>

                  {/* BOOKING SUMMARY */}
                  <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs font-black text-stone-400 uppercase tracking-widest">Booking Summary</span>
                      <h3 className="text-lg font-serif font-bold text-teal-900 mt-1">{selectedRoom.name}</h3>
                      <div className="flex items-center gap-2 text-stone-500 text-sm font-medium mt-1">
                         <span>{bookingFormData.checkIn}</span>
                         <ArrowRight size={14} className="text-stone-300"/>
                         <span>{bookingFormData.checkOut}</span>
                         <span className="w-1 h-1 bg-stone-300 rounded-full mx-1"></span>
                         <span>{calculateNights()} Nights</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-xs font-black text-stone-400 uppercase tracking-widest">Total Amount</span>
                       <p className="text-3xl font-serif font-bold text-teal-900 mt-1">₹{(selectedRoom.price * calculateNights()).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* PAYMENT METHOD SELECTION */}
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setPaymentMethod('card')} className={`flex-1 min-w-[120px] p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-bold ${paymentMethod === 'card' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-stone-100 text-stone-400'}`}>
                        <CreditCard size={24} /> <span className="text-[10px] uppercase tracking-widest">Card</span>
                      </button>
                      <button onClick={() => setPaymentMethod('upi')} className={`flex-1 min-w-[120px] p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-bold ${paymentMethod === 'upi' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-stone-100 text-stone-400'}`}>
                        <Smartphone size={24} /> <span className="text-[10px] uppercase tracking-widest">UPI</span>
                      </button>
                      <button onClick={() => setPaymentMethod('cash')} className={`flex-1 min-w-[120px] p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-bold ${paymentMethod === 'cash' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-stone-100 text-stone-400'}`}>
                        <Banknote size={24} /> <span className="text-[10px] uppercase tracking-widest">Pay at Hotel</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="p-8 border-2 border-stone-100 rounded-[2.5rem] bg-stone-50 relative shadow-sm animate-in fade-in zoom-in duration-300">
                        <div className="absolute top-4 right-8 opacity-10 font-serif text-4xl italic text-teal-900">LuxePay™</div>
                        <h4 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Lock size={12}/> Secure Checkout</h4>
                        <div className="space-y-4">
                          <input type="text" placeholder="Cardholder Name" className="w-full bg-white border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-600 font-bold" />
                          <div className="grid grid-cols-3 gap-4">
                            <input type="text" placeholder="Card Number" className="col-span-2 w-full bg-white border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-600 font-bold" />
                            <input type="text" placeholder="CVV" className="w-full bg-white border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-600 font-bold" />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="p-8 border-2 border-amber-100 rounded-[2.5rem] bg-amber-50/30 relative shadow-sm animate-in fade-in zoom-in duration-300 text-center">
                        <div className="bg-[#f7d58b] p-8 rounded-[2rem] border-4 border-white shadow-xl max-w-xs mx-auto">
                           <h4 className="text-lg font-black text-stone-900 mb-6 tracking-tight">parth1234@fam</h4>
                           <div className="bg-white p-4 rounded-3xl aspect-square flex items-center justify-center shadow-inner relative overflow-hidden group">
                              <QrCode size={180} className="text-stone-900 group-hover:scale-105 transition-transform" />
                           </div>
                        </div>
                        <p className="text-xs font-bold text-amber-800 mt-6 uppercase tracking-widest">Scan with any UPI App to Pay</p>
                      </div>
                    )}

                    {paymentMethod === 'cash' && (
                      <div className="p-10 border-2 border-teal-100 rounded-[2.5rem] bg-teal-50/30 text-center animate-in fade-in zoom-in duration-300">
                         <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Banknote size={32} />
                         </div>
                         <h4 className="text-2xl font-serif font-bold text-teal-950 mb-2">Pay at Front Desk</h4>
                         <p className="text-teal-800/70 text-sm leading-relaxed max-w-xs mx-auto">
                            Secure your booking now and pay with cash or card when you check-in at LuxeStay Surat.
                         </p>
                      </div>
                    )}

                    <button onClick={handleCreateBooking} className="w-full bg-teal-900 text-white py-6 rounded-[2rem] font-bold text-sm uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3">
                      {paymentMethod === 'cash' ? 'Confirm Booking' : t.payNow} <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION TOAST */}
      {showBookingConfirm && (
        <div className="fixed bottom-12 right-12 z-[100] bg-white border border-stone-200 p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6 animate-in slide-in-from-right-full duration-500">
           <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl shadow-inner"><Check size={32} /></div>
           <div><h4 className="text-xl font-serif text-stone-900">{t.paymentSuccess}</h4><p className="text-stone-500">{t.paymentSuccessSub}</p></div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-teal-950 text-white py-24 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-4 mb-10 opacity-80">
              <Hotel size={40} strokeWidth={1} />
              <div className="text-left">
                <span className="block text-3xl font-serif tracking-tight">LUXESTAY</span>
                <span className="block text-[10px] uppercase tracking-[0.4em] text-amber-400">Surat Collection</span>
              </div>
           </div>
           <div className="flex justify-center gap-8 mb-12 text-sm font-medium text-teal-200">
              <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About</button>
              <button onClick={() => setCurrentPage('rooms')} className="hover:text-white transition-colors">Accommodations</button>
              <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Dining</button>
              <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Wellness</button>
              <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button>
           </div>
           <p className="text-teal-400 opacity-50 uppercase tracking-widest text-[10px]">© 2024 LuxeStay Hotel Group. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
