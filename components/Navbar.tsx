
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { UI_STRINGS } from '../constants';
import { Menu, X, User as UserIcon, LogOut, Home, BookOpen, Info, Mail, Hotel, CalendarDays } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = UI_STRINGS;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.home, id: 'home', icon: <Home size={18} /> },
    { label: t.rooms, id: 'rooms', icon: <BookOpen size={18} /> },
    { label: t.about, id: 'about', icon: <Info size={18} /> },
    { label: t.contact, id: 'contact', icon: <Mail size={18} /> },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Luxury Aesthetic Logic
  const isTransparent = currentPage === 'home' && !scrolled && !isOpen;
  
  const navbarClasses = isTransparent 
    ? 'bg-transparent py-6 border-b border-white/10' 
    : 'bg-white/80 backdrop-blur-lg py-3 shadow-md border-b border-stone-100';

  const textClasses = isTransparent
    ? 'text-white hover:text-amber-300'
    : 'text-stone-600 hover:text-teal-700';
    
  const activeTextClasses = isTransparent
    ? 'text-amber-400'
    : 'text-teal-700 font-bold';

  const logoClasses = isTransparent
    ? 'text-white'
    : 'text-teal-900';

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${navbarClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
              <div className={`p-2 rounded-lg transition-all duration-500 group-hover:scale-110 ${isTransparent ? 'bg-white/10 text-amber-400' : 'bg-teal-900 text-amber-400'}`}>
                <Hotel size={28} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-start">
                <span className={`text-2xl font-serif font-bold tracking-tight leading-none ${logoClasses}`}>LUXESTAY</span>
                <span className={`text-[10px] uppercase tracking-[0.3em] font-medium opacity-80 ${logoClasses}`}>Collection</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                  currentPage === item.id ? activeTextClasses : textClasses
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isTransparent ? 'bg-amber-400' : 'bg-teal-600'}`}></span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex md:items-center gap-6">
            {currentUser ? (
              <div className="flex items-center gap-4">
                {currentUser.role === UserRole.ADMIN && (
                  <button onClick={() => handleNavClick('admin')} className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-4 py-2 rounded-full hover:bg-teal-100 transition-colors">Admin Panel</button>
                )}
                {currentUser.role === UserRole.CLIENT && (
                  <button 
                    onClick={() => handleNavClick('my-bookings')} 
                    className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
                      isTransparent 
                        ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                        : currentPage === 'my-bookings' ? 'text-teal-700 bg-teal-50 border-teal-100' : 'text-stone-600 border-transparent hover:bg-stone-100'
                    }`}
                  >
                    <CalendarDays size={16} /> {t.myBookings}
                  </button>
                )}
                
                <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                   {currentUser.avatar ? (
                     <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                   ) : (
                     <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${isTransparent ? 'bg-white text-teal-900' : 'bg-teal-900 text-amber-50'}`}>
                       {getInitials(currentUser.name)}
                     </div>
                   )}
                   <div className="flex flex-col text-left">
                     <span className={`text-xs font-bold leading-none ${isTransparent ? 'text-white' : 'text-stone-800'}`}>{currentUser.name}</span>
                     <button onClick={onLogout} className={`text-[10px] mt-1 hover:underline text-left ${isTransparent ? 'text-white/70 hover:text-white' : 'text-stone-400 hover:text-red-500'}`}>Sign Out</button>
                   </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => handleNavClick('login')} 
                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg ${
                  isTransparent 
                    ? 'bg-white text-teal-900 hover:bg-amber-50' 
                    : 'bg-teal-900 text-white hover:bg-teal-800 shadow-teal-900/20'
                }`}
              >
                <UserIcon size={16} /> {t.login}
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 transition-colors ${isTransparent ? 'text-white' : 'text-stone-800'}`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 p-6 space-y-2 shadow-2xl rounded-b-3xl">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-base font-medium transition-colors ${
                  currentPage === item.id ? 'bg-teal-50 text-teal-800' : 'text-stone-500 hover:bg-stone-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="pt-6 mt-4 border-t border-stone-100">
               {currentUser ? (
                 <button onClick={onLogout} className="flex items-center justify-center gap-2 w-full px-4 py-4 text-red-600 font-medium bg-red-50 rounded-2xl">
                   <LogOut size={18} /> {t.logout}
                 </button>
               ) : (
                 <button onClick={() => handleNavClick('login')} className="bg-teal-900 text-white w-full py-4 rounded-2xl font-bold shadow-xl shadow-teal-900/10">
                   {t.login}
                 </button>
               )}
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
