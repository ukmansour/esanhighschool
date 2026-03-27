import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit3, Save } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { academicSchedule, type AcademicEvent } from '../data/schedule';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC = () => {
  // Start with March 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('esan_calendar_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to load notes", e);
      }
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return academicSchedule.filter(e => e.date === dateStr);
  };

  const handleNoteChange = (date: string, value: string) => {
    const updatedNotes = { ...notes, [date]: value };
    setNotes(updatedNotes);
    localStorage.setItem('esan_calendar_notes', JSON.stringify(updatedNotes));
  };

  const selectedEvents = selectedDate ? academicSchedule.filter(e => e.date === selectedDate) : [];
  
  // Format selected date for header: e.g., "2026년 3월 27일 (금요일)"
  const getSelectedDateDisplay = () => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
    return `${y}. ${m}. ${d}. (${dayName})`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white text-gray-800 rounded-xl shadow-2xl border border-blue-100">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <CalendarIcon size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {MONTHS[month]} <span className="text-blue-600">{year}</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-blue-50 rounded-full transition-colors border border-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-blue-50 rounded-full transition-colors border border-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
        {DAYS.map(day => (
          <div key={day} className={cn(
            "bg-blue-50 py-3 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider",
            day === 'Sun' && "text-red-500",
            day === 'Sat' && "text-blue-500"
          )}>
            {day}
          </div>
        ))}
        {emptyDays.map(i => (
          <div key={`empty-${i}`} className="bg-gray-50 h-32" />
        ))}
        {days.map(day => {
          const events = getEventsForDay(day);
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          const hasNote = !!notes[dateStr];

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className={cn(
                "bg-white h-32 p-2 cursor-pointer transition-all hover:bg-blue-50/50 relative group border-t border-l border-gray-100",
                isSelected && "bg-blue-50 ring-2 ring-inset ring-blue-500 z-10",
              )}
            >
              <div className="flex justify-between items-start">
                <span className={cn(
                  "text-lg font-medium",
                  (new Date(year, month, day).getDay() === 0 || events.some(e => e.type === 'holiday')) && "text-red-500",
                  new Date(year, month, day).getDay() === 6 && "text-blue-500",
                  isToday && "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center -m-1"
                )}>
                  {day}
                </span>
                {hasNote && <Edit3 size={12} className="text-blue-400 mt-1" />}
              </div>
              <div className="mt-1 space-y-1 overflow-y-auto max-h-20 scrollbar-hide">
                {events.map((event, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-md truncate font-medium",
                      event.type === 'holiday' && "bg-red-100 text-red-700 border border-red-200",
                      event.type === 'exam' && "bg-amber-100 text-amber-700 border border-amber-200",
                      event.type === 'event' && "bg-blue-100 text-blue-700 border border-blue-200"
                    )}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-center mb-6 border-b border-blue-200 pb-4">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="text-blue-600">Schedule:</span> {getSelectedDateDisplay()}
            </h3>
            <button 
              onClick={() => setSelectedDate(null)}
              className="text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <CalendarIcon size={14} /> School Events
              </h4>
              {selectedEvents.length > 0 ? (
                <ul className="space-y-3">
                  {selectedEvents.map((event, idx) => (
                    <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          event.type === 'holiday' ? "bg-red-500" : event.type === 'exam' ? "bg-amber-500" : "bg-blue-500"
                        )} />
                        <span className="font-bold text-gray-800">{event.title}</span>
                      </div>
                      {event.description && (
                        <p className="text-gray-600 text-xs italic ml-4">{event.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-white/50 border border-dashed border-gray-200 p-4 rounded-lg text-center text-gray-400 italic text-sm">
                  No academic events scheduled.
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Edit3 size={14} /> My Notes
              </h4>
              <div className="relative group">
                <textarea
                  value={notes[selectedDate] || ''}
                  onChange={(e) => handleNoteChange(selectedDate, e.target.value)}
                  placeholder="Write your plans or notes here..."
                  className="w-full h-32 p-4 bg-white rounded-lg border border-blue-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm placeholder:text-gray-300"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1 text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                    <Save size={10} /> Auto-saving
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
