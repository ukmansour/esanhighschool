export interface AcademicEvent {
  date: string; // YYYY-MM-DD
  title: string;
  type: 'holiday' | 'exam' | 'event';
  description?: string;
}

export const academicSchedule: AcademicEvent[] = [
  // March 2026
  { date: '2026-03-02', title: '입학식 및 시업식', type: 'event', description: 'Entrance Ceremony & Start of Semester' },
  { date: '2026-03-11', title: '3월 학력평가', type: 'exam', description: 'March Nationwide Mock Exam' },
  
  // April 2026
  { date: '2026-04-08', title: '4월 학력평가', type: 'exam', description: 'April Mock Exam' },
  { date: '2026-04-27', title: '1학기 중간고사', type: 'exam', description: '1st Semester Midterm Exam' },
  { date: '2026-04-28', title: '1학기 중간고사', type: 'exam' },
  { date: '2026-04-29', title: '1학기 중간고사', type: 'exam' },
  { date: '2026-04-30', title: '1학기 중간고사', type: 'exam' },

  // May 2026
  { date: '2026-05-01', title: '근로자의 날 (재량휴업일)', type: 'holiday' },
  { date: '2026-05-05', title: '어린이날', type: 'holiday' },
  { date: '2026-05-15', title: '스승의 날 / 체육대회', type: 'event' },
  { date: '2026-05-24', title: '부처님 오신 날', type: 'holiday' },
  { date: '2026-05-25', title: '대체공휴일', type: 'holiday' },

  // June 2026
  { date: '2026-06-04', title: '6월 모의평가', type: 'exam', description: 'June Mock Exam (CSAT style)' },
  { date: '2026-06-06', title: '현충일', type: 'holiday' },

  // July 2026
  { date: '2026-07-06', title: '1학기 기말고사', type: 'exam' },
  { date: '2026-07-07', title: '1학기 기말고사', type: 'exam' },
  { date: '2026-07-08', title: '1학기 기말고사', type: 'exam' },
  { date: '2026-07-09', title: '1학기 기말고사', type: 'exam' },
  { date: '2026-07-17', title: '제헌절 / 여름방학 선언식', type: 'event' },
  { date: '2026-07-20', title: '여름방학 시작', type: 'holiday' },
];
