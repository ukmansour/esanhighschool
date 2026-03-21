import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
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

  const selectedEvents = selectedDate ? academicSchedule.filter(e => e.date === selectedDate) : [];

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
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            Schedule for {selectedDate}
          </h3>
          {selectedEvents.length > 0 ? (
            <ul className="space-y-4">
              {selectedEvents.map((event, idx) => (
                <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={cn(
                      "w-3 h-3 rounded-full",
                      event.type === 'holiday' ? "bg-red-500" : event.type === 'exam' ? "bg-amber-500" : "bg-blue-500"
                    )} />
                    <span className="font-bold text-lg text-gray-800">{event.title}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase">
                      {event.type}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-gray-600 ml-6 text-sm italic">{event.description}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No academic events scheduled for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};
