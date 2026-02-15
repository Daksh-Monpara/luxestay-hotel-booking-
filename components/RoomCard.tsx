
import React from 'react';
import { Room } from '../types';
import { Users, Wifi, Wind, ArrowRight } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 group flex flex-col h-full">
      <div className="relative h-72 overflow-hidden m-2 rounded-[1.5rem]">
        <ImageCarousel 
          images={room.images} 
          alt={room.name} 
          className="h-full w-full"
          imageClassName="group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-teal-900 uppercase tracking-widest shadow-sm">
            {room.type}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
           <h3 className="text-2xl font-serif font-bold text-stone-800 leading-tight">{room.name}</h3>
           <div className="text-right">
             <span className="block text-lg font-bold text-teal-800">₹{room.price.toLocaleString('en-IN')}</span>
           </div>
        </div>
        
        <p className="text-stone-500 text-sm mb-6 line-clamp-2 leading-relaxed font-light">{room.description}</p>
        
        <div className="flex items-center gap-4 text-stone-400 mb-8 border-t border-stone-100 pt-6 mt-auto">
          <div className="flex items-center gap-2 bg-stone-50 px-3 py-1 rounded-lg">
            <Users size={14} className="text-teal-700" />
            <span className="text-xs font-bold text-stone-600">{room.capacity} Guests</span>
          </div>
          {room.amenities.includes('Free WiFi') && (
            <div className="flex items-center gap-2 bg-stone-50 px-3 py-1 rounded-lg">
              <Wifi size={14} className="text-teal-700" />
              <span className="text-xs font-bold text-stone-600">WiFi</span>
            </div>
          )}
        </div>

        <button 
          onClick={() => onClick(room)}
          className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-teal-900 transition-all group/btn shadow-lg shadow-stone-900/10"
        >
          View Details
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
