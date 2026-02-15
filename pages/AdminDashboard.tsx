
import React, { useState } from 'react';
import { AppState, BookingStatus, Booking } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Users, Hotel, Calendar, CheckCircle, XCircle, Clock, 
  FileText, Download, Loader2, Eye, EyeOff, AlertTriangle, X, ChevronDown, ChevronUp, Info, Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  state: AppState;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateRoomAvailability: (id: string, available: boolean) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, updateBookingStatus, updateRoomAvailability }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory'>('analytics');
  const [pendingAction, setPendingAction] = useState<{ booking: Booking; status: BookingStatus } | null>(null);
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  const totalBookings = state.bookings.length;
  const totalRevenue = state.bookings.reduce((acc, curr) => curr.status === BookingStatus.APPROVED ? acc + curr.totalPrice : acc, 0);
  const totalRooms = state.rooms.length;
  const totalUsers = state.users.length;

  const data = [
    { name: 'Jan', revenue: 400000 },
    { name: 'Feb', revenue: 300000 },
    { name: 'Mar', revenue: 200000 },
    { name: 'Apr', revenue: 278000 },
    { name: 'May', revenue: 189000 },
    { name: 'Jun', revenue: totalRevenue },
  ];

  const bookingStatusData = [
    { name: 'Approved', value: state.bookings.filter(b => b.status === BookingStatus.APPROVED).length },
    { name: 'Pending', value: state.bookings.filter(b => b.status === BookingStatus.PENDING).length },
    { name: 'Cancelled', value: state.bookings.filter(b => b.status === BookingStatus.CANCELLED).length },
  ];

  const COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setShowSummary(true);
    
    setTimeout(() => {
      const headers = ["Booking ID", "Customer Name", "Customer Email", "Room Name", "Check-In", "Check-Out", "Amount (INR)", "Status", "Booked On"];
      const rows = state.bookings.map(booking => {
        const user = state.users.find(u => u.id === booking.userId);
        const room = state.rooms.find(r => r.id === booking.roomId);
        return [
          booking.id,
          user?.name || "N/A",
          user?.email || "N/A",
          room?.name || "N/A",
          booking.checkIn,
          booking.checkOut,
          booking.totalPrice,
          booking.status,
          new Date(booking.createdAt).toLocaleDateString()
        ];
      });

      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `LuxeStay_Surat_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsGenerating(false);
    }, 1500);
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      updateBookingStatus(pendingAction.booking.id, pendingAction.status);
      setPendingAction(null);
    }
  };

  const toggleRoomExpand = (id: string) => {
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-24 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Admin Console</h1>
          <p className="text-slate-500 font-medium">Real-time hospitality insights for LuxeStay Surat.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-1 rounded-2xl flex">
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'analytics' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Inventory
            </button>
          </div>
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-70"
          >
             {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
             {isGenerating ? 'Generating...' : 'Report'}
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <>
          {showSummary && !isGenerating && (
            <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp size={120} /></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-4">Report Summary - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Performance</p>
                    <p className="text-lg font-bold">Excellent occupancy rates at 84%. Revenue is up by 14%.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Top Room</p>
                    <p className="text-lg font-bold">The 'Tapi River View Suite' remains top categories.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Customer Sat</p>
                    <p className="text-lg font-bold">Feedback score is 4.8/5.0 across all bookings.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSummary(false)}
                  className="mt-8 text-indigo-300 hover:text-white text-sm font-bold flex items-center gap-2"
                >
                  <Download size={16} /> Data Exported Successfully. Dismiss.
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><span className="text-xl font-black">₹</span></div>
                <span className="text-emerald-500 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full"><TrendingUp size={14} /> +12%</span>
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Revenue</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calendar size={24} /></div>
                <span className="text-blue-500 font-bold text-xs flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Bookings</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalBookings}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Hotel size={24} /></div>
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Rooms</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalRooms}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Users size={24} /></div>
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Customers</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalUsers}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-10">Revenue Analysis</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                    <Bar dataKey="revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-10">Booking Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bookingStatusData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value">
                      {bookingStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-4">
                {bookingStatusData.map((item, idx) => (
                  <div key={item.name} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                      <span className="text-sm font-bold text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-indigo-950">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <tr>
                    <th className="px-10 py-5">Guest Profile</th>
                    <th className="px-10 py-5">Stay</th>
                    <th className="px-10 py-5">Check-in</th>
                    <th className="px-10 py-5">Gross Amount</th>
                    <th className="px-10 py-5">Live Status</th>
                    <th className="px-10 py-5 text-right">Approval</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {state.bookings.slice(-5).reverse().map(booking => {
                    const user = state.users.find(u => u.id === booking.userId);
                    const room = state.rooms.find(r => r.id === booking.roomId);
                    return (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            {user?.avatar ? (
                               <img src={user.avatar} className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm" alt="" />
                            ) : (
                               <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white shadow-sm text-indigo-600 flex items-center justify-center font-black text-xs">
                                  {getInitials(user?.name || 'Guest')}
                               </div>
                            )}
                            <div><p className="font-bold text-slate-900 text-sm">{user?.name}</p><p className="text-xs text-slate-400 font-medium">{user?.email}</p></div>
                          </div>
                        </td>
                        <td className="px-10 py-6 font-bold text-slate-700 text-sm">{room?.name}</td>
                        <td className="px-10 py-6 text-slate-500 text-sm font-medium">{new Date(booking.checkIn).toLocaleDateString()}</td>
                        <td className="px-10 py-6 font-black text-indigo-900 text-sm">₹{booking.totalPrice.toLocaleString('en-IN')}</td>
                        <td className="px-10 py-6">
                          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            booking.status === BookingStatus.APPROVED ? 'bg-emerald-50 text-emerald-600' :
                            booking.status === BookingStatus.CANCELLED ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                          }`}>{booking.status}</span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === BookingStatus.PENDING ? (
                              <>
                                <button 
                                  onClick={() => setPendingAction({ booking, status: BookingStatus.APPROVED })} 
                                  className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-xl transition-all"
                                >
                                  <CheckCircle size={20} />
                                </button>
                                <button 
                                  onClick={() => setPendingAction({ booking, status: BookingStatus.CANCELLED })} 
                                  className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                >
                                  <XCircle size={20} />
                                </button>
                              </>
                            ) : <div className="p-2 text-slate-300"><Clock size={20} /></div>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-right-8 duration-500">
          <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Room Inventory Management</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage room status and detailed specifications</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <tr>
                  <th className="px-10 py-5">Room Details</th>
                  <th className="px-10 py-5">Type</th>
                  <th className="px-10 py-5">Price / Night</th>
                  <th className="px-10 py-5">Capacity</th>
                  <th className="px-10 py-5 text-right">Availability & Details</th>
                </tr>
              </thead>
              {state.rooms.map(room => (
                <tbody key={room.id} className="divide-y divide-slate-50 border-b border-slate-50">
                  <tr className={`hover:bg-slate-50/50 transition-all ${!room.available ? 'opacity-70 bg-slate-50/30' : ''}`}>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <img src={room.images[0]} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{room.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">ID: {room.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-widest">
                        {room.type}
                      </span>
                    </td>
                    <td className="px-10 py-6 font-black text-indigo-900 text-sm">₹{room.price.toLocaleString('en-IN')}</td>
                    <td className="px-10 py-6 text-slate-500 text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <Users size={14} /> {room.capacity} Guests
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end items-center gap-4">
                        <button 
                          onClick={() => toggleRoomExpand(room.id)}
                          className={`p-2 rounded-xl transition-all ${expandedRoomId === room.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                          title="View Specs"
                        >
                          {expandedRoomId === room.id ? <ChevronUp size={20} /> : <Info size={20} />}
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${room.available ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {room.available ? 'Active' : 'Inactive'}
                        </span>
                        <button 
                          onClick={() => updateRoomAvailability(room.id, !room.available)}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${room.available ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                          <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${room.available ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRoomId === room.id && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={5} className="px-10 py-8 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <FileText size={12} /> Description
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-indigo-200 pl-4">
                              "{room.description}"
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Sparkles size={12} /> Key Amenities
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map(amenity => (
                                <span key={amenity} className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 shadow-sm flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {pendingAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setPendingAction(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className={`p-8 text-center border-b ${pendingAction.status === BookingStatus.APPROVED ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${pendingAction.status === BookingStatus.APPROVED ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {pendingAction.status === BookingStatus.APPROVED ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {pendingAction.status === BookingStatus.APPROVED ? 'Confirm Approval' : 'Confirm Cancellation'}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Please review the guest details before proceeding.</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                {state.users.find(u => u.id === pendingAction.booking.userId)?.avatar ? (
                  <img src={state.users.find(u => u.id === pendingAction.booking.userId)?.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-600 font-black">
                    {getInitials(state.users.find(u => u.id === pendingAction.booking.userId)?.name || 'Guest')}
                  </div>
                )}
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Guest</p>
                  <p className="font-bold text-indigo-950">{state.users.find(u => u.id === pendingAction.booking.userId)?.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Room</p>
                  <p className="font-bold text-indigo-950 text-sm truncate">{state.rooms.find(r => r.id === pendingAction.booking.roomId)?.name}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount</p>
                  <p className="font-bold text-indigo-950">₹{pendingAction.booking.totalPrice.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Stay Duration</p>
                <div className="flex justify-between items-center text-sm font-bold text-indigo-950">
                  <span>{new Date(pendingAction.booking.checkIn).toLocaleDateString()}</span>
                  <div className="h-px bg-slate-200 flex-1 mx-4"></div>
                  <span>{new Date(pendingAction.booking.checkOut).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-8 pt-0 flex gap-4">
              <button 
                onClick={() => setPendingAction(null)}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Go Back
              </button>
              <button 
                onClick={handleConfirmAction}
                className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                  pendingAction.status === BookingStatus.APPROVED 
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' 
                    : 'bg-red-600 hover:bg-red-700 shadow-red-100'
                }`}
              >
                Confirm Action
              </button>
            </div>
            
            <button 
              onClick={() => setPendingAction(null)} 
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
