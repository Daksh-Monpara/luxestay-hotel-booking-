
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="pb-20 pt-32 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
         <div className="text-center mb-20">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-serif text-teal-950 mb-6">We'd Love to Hear From You</h1>
            <p className="text-stone-500 max-w-xl mx-auto text-lg">Whether it's a booking inquiry or a special request, our team is here to assist you 24/7.</p>
         </div>

         <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-stone-200/50 border border-stone-100">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
                   <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <Send size={32} />
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-teal-950 mb-2">Message Sent!</h3>
                   <p className="text-stone-500">Thank you for reaching out. We will get back to you shortly.</p>
                   <button onClick={() => setSubmitted(false)} className="mt-8 text-teal-600 font-bold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <h3 className="text-2xl font-serif font-bold text-teal-950 mb-8">Send a Message</h3>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all" 
                        placeholder="John Doe"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all" 
                        placeholder="john@example.com"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-2">Message</label>
                      <textarea 
                        required 
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-stone-50 border-transparent focus:border-teal-500 focus:bg-white border-2 rounded-2xl px-5 py-4 focus:ring-0 font-medium transition-all resize-none" 
                        placeholder="How can we help you?"
                      />
                   </div>
                   <button type="submit" className="w-full bg-teal-900 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-2">
                      Send Message <Send size={18} />
                   </button>
                </form>
              )}
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-teal-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-between h-48">
                     <Phone size={32} className="text-amber-400" />
                     <div>
                        <p className="text-teal-200 text-xs font-bold uppercase tracking-widest mb-1">Call Us</p>
                        <p className="text-xl font-bold">{CONTACT_INFO.phone}</p>
                     </div>
                  </div>
                  <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] flex flex-col justify-between h-48 shadow-sm">
                     <Mail size={32} className="text-teal-900" />
                     <div>
                        <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Email Us</p>
                        <p className="text-lg font-bold text-teal-950 truncate">{CONTACT_INFO.email}</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-2 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100">
                  <div className="h-80 rounded-[2rem] overflow-hidden relative">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230402!2d72.73989474719236!3d21.15920020355447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715600000000!5m2!1sen!2sin" 
                        className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                        style={{ border: 0 }} 
                        loading="lazy" 
                    ></iframe>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-teal-600 mt-1 shrink-0" size={20} />
                            <div>
                                <p className="text-teal-950 font-bold text-sm leading-tight mb-2">{CONTACT_INFO.address}</p>
                                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                                   <Clock size={12} /> Open 24 Hours
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
