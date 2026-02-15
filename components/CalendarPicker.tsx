
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarPickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (dates: { checkIn: string; checkOut: string }) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ checkIn, checkOut, onChange }) => {
  const [viewDate, setViewDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (dateStr: string) => dateStr === checkIn || dateStr === checkOut;

  const isInRange = (dateStr: string) => {
    if (!checkIn || !checkOut) return false;
    return dateStr > checkIn && dateStr < checkOut;
  };

  const isPast = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const handleDateClick = (day: number) => {
    if (isPast(day)) return;

    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dateStr = selectedDate.toISOString().split('T')[0];

    if (!checkIn || (checkIn && checkOut)) {
      onChange({ checkIn: dateStr, checkOut: '' });
    } else {
      if (dateStr < checkIn) {
        onChange({ checkIn: dateStr, checkOut: '' });
      } else if (dateStr === checkIn) {
        onChange({ checkIn: '', checkOut: '' });
      } else {
        onChange({ checkIn, checkOut: dateStr });
      }
    }
  };

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-full"></div>);
    }

    // Actual days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const selected = isSelected(dateStr);
      const range = isInRange(dateStr);
      const past = isPast(d);

      days.push(
        <button
          key={d}
          onClick={() => handleDateClick(d)}
          disabled={past}
          className={`
            relative h-12 w-full flex items-center justify-center text-sm font-bold rounded-xl transition-all
            ${past ? 'text-stone-200 cursor-not-allowed' : 'text-stone-700 hover:bg-teal-50 hover:text-teal-900'}
            ${selected ? 'bg-teal-900 text-white hover:bg-teal-800 hover:text-white shadow-lg shadow-teal-900/20' : ''}
            ${range ? 'bg-teal-50 text-teal-900' : ''}
            ${isToday(d) && !selected ? 'border-2 border-amber-200' : ''}
          `}
        >
          {d}
          {selected && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-white"></span>
            </span>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden p-8 select-none">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-teal-900">
          <CalendarIcon size={20} className="text-amber-500" />
          <h4 className="text-xl font-serif font-bold tracking-tight">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h4>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-2.5 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-teal-900">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth} className="p-2.5 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-teal-900">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-center py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>

      <div className="mt-8 pt-6 border-t border-stone-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-900 rounded-sm"></div>
          <span>Selection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-50 rounded-sm"></div>
          <span>Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-amber-200 rounded-sm"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
