
/**
 * HOME PAGE (Mukhya Page)
 * -----------------------
 * Purpose: The landing page seen by users.
 * Sections: Hero (Banner), Services, Featured Rooms, Testimonials, AI Concierge.
 */

import React, { useState } from 'react';
import { Room } from '../types';
import { UI_STRINGS, CONTACT_INFO, MOCK_SERVICES, MOCK_TESTIMONIALS } from '../constants';
import { Sparkles, MessageSquare, MapPin, Navigation, Utensils, Car, Flower2, Wine, Star, Quote, ArrowDown, ChevronRight } from 'lucide-react';
import { getAIConciergeRecommendation } from '../services/geminiService';
import ImageCarousel from '../components/ImageCarousel';

interface HomeProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ rooms, onRoomClick, onNavigate }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const t = UI_STRINGS;

  const availableRooms = rooms.filter(r => r.available);

  const handleAIConcierge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const resp = await getAIConciergeRecommendation(aiPrompt, rooms);
    setAiResponse(resp);
    setIsAiLoading(false);
  };

  const getServiceIcon = (key: string) => {
    switch (key) {
      case 'dining': return <Utensils size={28} strokeWidth={1.5} />;
      case 'spa': return <Flower2 size={28} strokeWidth={1.5} />;
      case 'transport': return <Car size={28} strokeWidth={1.5} />;
      case 'event': return <Wine size={28} strokeWidth={1.5} />;
      default: return <Sparkles size={28} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-teal-950">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]" 
            alt="Luxury Hotel Lobby" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mt-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-amber-200 text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <Star size={12} fill="currentColor" /> Premier Hospitality
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 leading-tight">
            Surat's <span className="italic text-amber-400 font-serif">Crown</span> Jewel
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-12 max-w-xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {t.heroSub} Where timeless elegance meets modern comfort on the banks of the Tapi.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
             <button onClick={() => onNavigate('rooms')} className="bg-amber-500 text-teal-950 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-amber-900/20 hover:-translate-y-1">
               {t.browseRooms}
             </button>
             <button onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })} className="bg-transparent text-white border border-white/30 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm">
               Discover More
             </button>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce text-white/30">
          <ArrowDown size={32} />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Refined Comfort</span>
            <h2 className="text-4xl md:text-5xl font-serif text-teal-950">{t.services}</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_SERVICES.map((service, index) => (
              <div key={service.id} className="bg-white p-10 rounded-t-[3rem] rounded-b-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-stone-100">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-teal-800 flex items-center justify-center mb-8 group-hover:bg-teal-900 group-hover:text-amber-400 transition-colors duration-500">
                  {getServiceIcon(service.iconKey)}
                </div>
                <h3 className="text-xl font-serif font-bold text-teal-950 mb-4">{service.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-stone-100 pb-8">
            <div>
              <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.3em] mb-2 block">Sanctuary</span>
              <h2 className="text-4xl md:text-5xl font-serif text-teal-950">{t.featured}</h2>
            </div>
            <button onClick={() => onNavigate('rooms')} className="group flex items-center gap-3 text-teal-800 font-bold uppercase text-xs tracking-widest hover:text-amber-600 transition-colors">
               View All Suites <div className="p-2 bg-stone-100 rounded-full group-hover:bg-amber-100 transition-colors"><ChevronRight size={16} /></div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {availableRooms.slice(0, 3).map(room => (
              <div key={room.id} className="group cursor-pointer" onClick={() => onRoomClick(room)}>
                <div className="relative h-[450px] overflow-hidden rounded-[2rem] shadow-lg mb-6">
                  <ImageCarousel 
                    images={room.images} 
                    alt={room.name} 
                    className="h-full w-full" 
                    imageClassName="group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-teal-900 uppercase tracking-widest pointer-events-none shadow-sm">
                    {room.type}
                  </div>
                  <div className="absolute bottom-8 left-8 text-white pointer-events-none">
                    <p className="text-amber-300 font-medium text-lg mb-1">₹{room.price.toLocaleString('en-IN')} <span className="text-sm text-white/70">/ Night</span></p>
                    <h3 className="text-3xl font-serif leading-tight">{room.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-teal-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-96 h-96 bg-amber-400 rounded-full blur-[120px]"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-teal-400 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
             <Quote size={48} className="text-amber-400/30 mx-auto mb-6" />
             <h2 className="text-4xl md:text-5xl font-serif text-white">{t.testimonials}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TESTIMONIALS.map(item => (
              <div key={item.id} className="bg-teal-950/50 backdrop-blur-md border border-teal-800 p-10 rounded-3xl hover:border-amber-500/30 transition-colors">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < item.rating ? "#fbbf24" : "none"} className={i < item.rating ? "text-amber-400" : "text-teal-800"} />
                  ))}
                </div>
                <p className="text-stone-300 text-lg leading-relaxed mb-8 font-serif">"{item.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-teal-800">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/50" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <p className="text-teal-400 text-xs font-bold uppercase tracking-wider">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Location Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="bg-stone-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
               <div className="inline-flex items-center gap-2 bg-stone-800 border border-stone-700 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-8">
                 <Sparkles size={14} /> AI Concierge
               </div>
               <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Your Personal <br/><span className="text-stone-500 italic">Digital Butler</span></h2>
               <p className="text-stone-400 mb-10 text-lg leading-relaxed font-light">
                 Powered by Gemini. Describe your dream stay, and let our intelligence curate the perfect Surat experience for you.
               </p>
               <form onSubmit={handleAIConcierge} className="flex flex-col gap-4">
                 <div className="relative group">
                   <MessageSquare className="absolute left-6 top-5 text-stone-500 group-focus-within:text-amber-400 transition-colors" size={20} />
                   <input 
                     type="text" 
                     value={aiPrompt}
                     onChange={(e) => setAiPrompt(e.target.value)}
                     placeholder={t.aiPlaceholder}
                     className="w-full bg-stone-800 border border-stone-700 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-amber-500/50 text-white placeholder:text-stone-600 transition-all"
                   />
                 </div>
                 <button disabled={isAiLoading} className="bg-white text-stone-950 px-8 py-5 rounded-2xl font-bold hover:bg-amber-400 hover:text-stone-900 transition-all flex items-center justify-center gap-2 shadow-lg">
                   {isAiLoading ? t.aiLoading : 'Get Personalized Recommendation'}
                 </button>
               </form>
               {aiResponse && (
                 <div className="mt-8 p-8 bg-stone-800 border-l-4 border-amber-500 rounded-r-2xl animate-in fade-in slide-in-from-top-4">
                   <div className="flex gap-4">
                     <div className="min-w-[40px] h-10 w-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center"><Sparkles size={20} /></div>
                     <p className="text-stone-300 italic leading-relaxed">{aiResponse}</p>
                   </div>
                 </div>
               )}
            </div>
            
            <div className="h-[500px] rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl relative group rotate-1 hover:rotate-0 transition-transform duration-500">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230402!2d72.73989474719236!3d21.15920020355447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715600000000!5m2!1sen!2sin" 
                className="w-full h-full grayscale-[0.5] contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                style={{ border: 0 }} 
                loading="lazy" 
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
                 <div className="flex items-start gap-5">
                    <div className="p-3 bg-teal-900 text-amber-400 rounded-2xl"><MapPin size={24} /></div>
                    <div>
                       <h4 className="text-teal-950 font-bold text-lg mb-1">{t.findUs}</h4>
                       <p className="text-stone-500 text-sm">{CONTACT_INFO.address}</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
