
import React from 'react';
import { Star, Award, Users, Clock, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: "Rajiv Mehta",
      role: "General Manager",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Anjali Desai",
      role: "Head Concierge",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Chef Vikram",
      role: "Executive Chef",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-teal-950">
           <img 
             src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"
             className="w-full h-full object-cover opacity-40"
             alt="Hotel Architecture"
           />
        </div>
        <div className="relative z-10 text-center text-white px-4">
           <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block animate-in fade-in slide-in-from-bottom-4">Our Heritage</span>
           <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-in fade-in slide-in-from-bottom-6 delay-100">The Story of LuxeStay</h1>
           <p className="max-w-2xl mx-auto text-lg text-stone-200 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 delay-200">
             Redefining hospitality in the Diamond City since 2010.
           </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
           <div className="relative">
              <div className="absolute top-0 -left-4 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1559599189-fe84dea4eb79?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[3rem] shadow-2xl relative z-10"
                alt="Hotel Interior"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-xl z-20 hidden md:block border border-stone-100">
                <p className="font-serif text-5xl font-bold text-teal-900 mb-2">14+</p>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Years of<br/>Excellence</p>
              </div>
           </div>
           <div>
              <h2 className="text-4xl font-serif text-teal-950 mb-6">A Sanctuary in Surat</h2>
              <p className="text-stone-600 leading-relaxed mb-6 text-lg">
                Founded with a vision to bring world-class luxury to Gujarat's vibrant commercial hub, LuxeStay has evolved into more than just a hotel. It is a landmark where tradition meets contemporary elegance.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Located on the serene banks of the Tapi River, our architecture draws inspiration from the region's rich textile heritage, weaving together intricate designs with modern minimalism.
              </p>
              <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-teal-800 font-medium"><Star size={18} className="text-amber-500" /> Rated #1 Luxury Hotel in Surat</li>
                 <li className="flex items-center gap-3 text-teal-800 font-medium"><Award size={18} className="text-amber-500" /> Green Hotel Certification 2023</li>
                 <li className="flex items-center gap-3 text-teal-800 font-medium"><Users size={18} className="text-amber-500" /> Over 50,000 Happy Guests</li>
              </ul>
           </div>
        </div>

        {/* Team */}
        <div className="mb-20">
           <div className="text-center mb-16">
              <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Leadership</span>
              <h2 className="text-4xl font-serif text-teal-950">Meet Your Hosts</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] h-[400px]">
                   <img src={member.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={member.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-transparent to-transparent opacity-90"></div>
                   <div className="absolute bottom-0 left-0 p-8 text-white">
                      <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">{member.role}</p>
                      <h3 className="text-2xl font-serif font-bold">{member.name}</h3>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
