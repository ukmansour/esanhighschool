import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit3, Save, Image as ImageIcon, Trash2, Plus, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { academicSchedule, type AcademicEvent } from '../data/schedule';
import { SUBJECT_COLORS, type SubjectName } from '../data/subjects';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

interface PerformanceAssessment {
  id: string;
  subject: SubjectName;
  title: string;
  image?: string; // base64 string
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [assessments, setAssessments] = useState<Record<string, PerformanceAssessment[]>>({});
  
  // 수행평가 추가용 상태
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState<SubjectName>('국어');
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 데이터 로드
  useEffect(() => {
    const savedNotes = localStorage.getItem('esan_calendar_notes');
    const savedAssessments = localStorage.getItem('esan_calendar_assessments');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return academicSchedule.filter(e => e.date === dateStr);
  };

  const getAssessmentsForDay = (dateStr: string) => {
    return assessments[dateStr] || [];
  };

  const handleNoteChange = (date: string, value: string) => {
    const updatedNotes = { ...notes, [date]: value };
    setNotes(updatedNotes);
    localStorage.setItem('esan_calendar_notes', JSON.stringify(updatedNotes));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAssessment = () => {
    if (!selectedDate || !newTitle) return;
    
    const newEntry: PerformanceAssessment = {
      id: Date.now().toString(),
      subject: newSubject,
      title: newTitle,
      image: newImage
    };

    const updated = {
      ...assessments,
      [selectedDate]: [...(assessments[selectedDate] || []), newEntry]
    };

    setAssessments(updated);
    localStorage.setItem('esan_calendar_assessments', JSON.stringify(updated));
    
    // 폼 초기화
    setNewTitle('');
    setNewImage(undefined);
    setShowAddForm(false);
  };

  const deleteAssessment = (date: string, id: string) => {
    const updated = {
      ...assessments,
      [date]: assessments[date].filter(a => a.id !== id)
    };
    setAssessments(updated);
    localStorage.setItem('esan_calendar_assessments', JSON.stringify(updated));
  };

  const selectedEvents = selectedDate ? academicSchedule.filter(e => e.date === selectedDate) : [];
  const selectedAssessments = selectedDate ? assessments[selectedDate] || [] : [];
  
  const getSelectedDateDisplay = () => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = DAYS[dateObj.getDay()] + '요일';
    return `${y}년 ${m}월 ${d}일 (${dayName})`;
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 bg-white text-gray-800 rounded-xl shadow-2xl border border-blue-100">
      {/* 달력 헤더 */}
      <div className="flex items-center justify-between mb-4 sm:mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg text-white">
            <CalendarIcon size={20} className="sm:size-[24px]" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            <span className="text-blue-600">{year}년</span> {MONTHS[month]}
          </h2>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button onClick={prevMonth} className="p-1.5 hover:bg-blue-50 rounded-full transition-colors border border-gray-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-1.5 hover:bg-blue-50 rounded-full transition-colors border border-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
        {DAYS.map(day => (
          <div key={day} className={cn(
            "bg-blue-50 py-2 sm:py-3 text-center text-[10px] sm:text-sm font-semibold text-gray-600 uppercase tracking-wider",
            day === '일' && "text-red-500",
            day === '토' && "text-blue-500"
          )}>
            {day}
          </div>
        ))}
        {emptyDays.map(i => (
          <div key={`empty-${i}`} className="bg-gray-50 h-20 sm:h-32" />
        ))}
        {days.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const events = getEventsForDay(day);
          const dayAssessments = getAssessmentsForDay(dateStr);
          const isSelected = selectedDate === dateStr;
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          const hasNote = !!notes[dateStr];

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className={cn(
                "bg-white h-20 sm:h-32 p-1 sm:p-2 cursor-pointer transition-all hover:bg-blue-50/50 relative group border-t border-l border-gray-100 flex flex-col",
                isSelected && "bg-blue-50 ring-2 ring-inset ring-blue-500 z-10",
              )}
            >
              <div className="flex justify-between items-start mb-0.5">
                <span className={cn(
                  "text-xs sm:text-lg font-medium",
                  (new Date(year, month, day).getDay() === 0 || events.some(e => e.type === 'holiday')) && "text-red-500",
                  new Date(year, month, day).getDay() === 6 && "text-blue-500",
                  isToday && "bg-blue-600 text-white rounded-full w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center -m-0.5 sm:-m-1 text-[10px] sm:text-base"
                )}>
                  {day}
                </span>
                <div className="flex gap-0.5">
                  {dayAssessments.length > 0 && <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-600" title="수행평가 있음" />}
                  {hasNote && <Edit3 size={10} className="text-blue-400 sm:size-[12px]" />}
                </div>
              </div>
              
              <div className="flex-1 space-y-0.5 overflow-hidden">
                {/* 학사일정 */}
                {events.map((event, idx) => (
                  <div key={idx} className={cn(
                    "text-[8px] sm:text-[10px] px-1 py-0.5 rounded-sm truncate font-medium leading-tight",
                    event.type === 'holiday' && "bg-red-100 text-red-700 border border-red-200",
                    event.type === 'exam' && "bg-amber-100 text-amber-700 border border-amber-200",
                    event.type === 'event' && "bg-blue-100 text-blue-700 border border-blue-200"
                  )}>
                    {event.title}
                  </div>
                ))}
                
                {/* 수행평가 강조 표시 */}
                {dayAssessments.map((ass) => (
                  <div key={ass.id} 
                    className="text-[8px] sm:text-[10px] px-1 py-0.5 rounded-sm truncate font-bold shadow-sm border border-black/5"
                    style={{ backgroundColor: SUBJECT_COLORS[ass.subject].bg, color: SUBJECT_COLORS[ass.subject].text }}
                  >
                    [{ass.subject}] {ass.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 상세 영역 */}
      {selectedDate && (
        <div className="mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-center mb-6 border-b border-blue-200 pb-4">
            <h3 className="text-lg sm:text-2xl font-black text-gray-900">
              <span className="text-blue-600">상세 일정:</span> {getSelectedDateDisplay()}
            </h3>
            <button onClick={() => setSelectedDate(null)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 학교 공식 일정 & 메모 */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CalendarIcon size={14} /> 학교 공식 일정
                </h4>
                {selectedEvents.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedEvents.map((event, idx) => (
                      <li key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                        <div className="flex items-center gap-2">
                          <span className={cn("w-2 h-2 rounded-full", event.type === 'holiday' ? "bg-red-500" : event.type === 'exam' ? "bg-amber-500" : "bg-blue-500")} />
                          <span className="font-bold text-sm">{event.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-white/50 border border-dashed border-gray-200 p-3 rounded-lg text-center text-gray-400 italic text-xs">등록된 일정이 없습니다.</div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Edit3 size={14} /> 나의 메모
                </h4>
                <textarea
                  value={notes[selectedDate] || ''}
                  onChange={(e) => handleNoteChange(selectedDate, e.target.value)}
                  placeholder="할 일이나 메모를 입력하세요..."
                  className="w-full h-24 p-3 bg-white rounded-lg border border-blue-100 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
                />
              </div>
            </div>

            {/* 수행평가 공지 영역 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={14} /> 수행평가 공지
                </h4>
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors shadow-md"
                >
                  {showAddForm ? <X size={14} /> : <Plus size={14} />}
                  {showAddForm ? '취소' : '공지 추가'}
                </button>
              </div>

              {/* 추가 폼 */}
              {showAddForm && (
                <div className="bg-white p-4 rounded-xl border-2 border-blue-200 shadow-lg space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">과목 선택</label>
                      <select 
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value as SubjectName)}
                        className="w-full p-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.keys(SUBJECT_COLORS).map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">사진 첨부</label>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-2 flex items-center justify-center gap-2 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <ImageIcon size={14} /> {newImage ? '사진 변경' : '사진 선택'}
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500">수행 내용</label>
                    <input 
                      type="text" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="수행평가 제목 또는 간단한 설명"
                      className="w-full p-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {newImage && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
                      <img src={newImage} alt="미리보기" className="w-full h-full object-cover" />
                      <button onClick={() => setNewImage(undefined)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X size={14} /></button>
                    </div>
                  )}

                  <button 
                    onClick={addAssessment}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    공지 올리기
                  </button>
                </div>
              )}

              {/* 목록 표시 */}
              <div className="grid gap-4">
                {selectedAssessments.length > 0 ? (
                  selectedAssessments.map(ass => (
                    <div key={ass.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 group">
                      <div className="flex flex-col sm:flex-row">
                        {ass.image && (
                          <div className="sm:w-1/3 aspect-video sm:aspect-square bg-gray-100">
                            <img src={ass.image} alt={ass.subject} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open(ass.image)} />
                          </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-black shadow-sm"
                                style={{ backgroundColor: SUBJECT_COLORS[ass.subject].bg, color: SUBJECT_COLORS[ass.subject].text }}
                              >
                                {ass.subject}
                              </span>
                              <button 
                                onClick={() => deleteAssessment(selectedDate, ass.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-gray-900 font-bold text-lg leading-tight">{ass.title}</p>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-4">수행평가 강조 안내</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/50 border border-dashed border-gray-200 p-8 rounded-xl text-center text-gray-400 italic text-sm">
                    등록된 수행평가 공지가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
