export interface AcademicEvent {
  date: string; // YYYY-MM-DD
  title: string;
  type: 'holiday' | 'exam' | 'event';
  description?: string;
}

export const academicSchedule: AcademicEvent[] = [
  // 3월
  { date: '2026-03-01', title: '삼일절', type: 'holiday' },
  { date: '2026-03-02', title: '대체휴일', type: 'holiday' },
  { date: '2026-03-03', title: '입학식', type: 'event' },
  { date: '2026-03-19', title: '학부모총회', type: 'event' },
  { date: '2026-03-24', title: '전국연합평가(1,2,3)', type: 'exam', description: '<수요일 수업>' },
  { date: '2026-03-25', title: '<화요일 수업>', type: 'event' },

  // 4월
  { date: '2026-04-20', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-04-21', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-04-22', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-04-23', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-04-24', title: '<월요일 수업>', type: 'event', description: '체험학습 불허기간' },
  { date: '2026-04-27', title: '진로찾기(1), 현장체험(2)', type: 'event', description: '체험학습 불허기간' },
  { date: '2026-04-28', title: '진로찾기(1), 현장체험(2)', type: 'event', description: '체험학습 불허기간' },
  { date: '2026-04-29', title: '현장체험학습(1,2,3)', type: 'event', description: '체험학습 불허기간' },
  { date: '2026-04-30', title: '체험학습 불허기간', type: 'event' },

  // 5월
  { date: '2026-05-01', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-05-04', title: '재량휴업일 (개교기념일)', type: 'holiday' },
  { date: '2026-05-05', title: '어린이날', type: 'holiday' },
  { date: '2026-05-07', title: '전국연합평가(3)', type: 'exam', description: '<금요일 수업>' },
  { date: '2026-05-08', title: '<월요일 수업>', type: 'event' },
  { date: '2026-05-18', title: '학부모상담주간/수업공개', type: 'event', description: '~5.22' },
  { date: '2026-05-24', title: '부처님오신날', type: 'holiday' },
  { date: '2026-05-25', title: '대체휴일', type: 'holiday' },
  { date: '2026-05-29', title: '리더십캠프', type: 'event', description: '~5.30' },
  { date: '2026-05-30', title: '리더십캠프', type: 'event' },

  // 6월
  { date: '2026-06-03', title: '지방선거', type: 'holiday' },
  { date: '2026-06-04', title: '수능모의(3), 전국연합(1,2)', type: 'exam', description: '<금요일 수업>' },
  { date: '2026-06-05', title: '<화요일 수업>', type: 'event' },
  { date: '2026-06-06', title: '현충일', type: 'holiday' },
  { date: '2026-06-29', title: '2차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-06-30', title: '2차 정기시험(1,2,3)', type: 'exam' },

  // 7월
  { date: '2026-07-01', title: '2차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-07-02', title: '2차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-07-03', title: '2차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-07-06', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-07-07', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-07-08', title: '전국연합평가(3)', type: 'exam', description: '체험학습 불허기간' },
  { date: '2026-07-09', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-07-10', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-07-16', title: '1학기 성적평가회', type: 'event' },
  { date: '2026-07-17', title: '제헌절', type: 'event' },
  { date: '2026-07-20', title: '방학식 (생기부 점검)', type: 'event' },
  { date: '2026-07-21', title: '여름방학 시작', type: 'holiday', description: '~8.10' },

  // 8월
  { date: '2026-08-11', title: '개학식', type: 'event' },
  { date: '2026-08-15', title: '광복절', type: 'holiday' },
  { date: '2026-08-17', title: '대체휴일', type: 'holiday' },
  { date: '2026-08-31', title: '학부모상담주간', type: 'event', description: '~9.4' },

  // 9월
  { date: '2026-09-02', title: '수능모의(3), 전국연합(1,2)', type: 'exam' },
  { date: '2026-09-23', title: '<금요일 수업>', type: 'event' },
  { date: '2026-09-24', title: '추석연휴', type: 'holiday' },
  { date: '2026-09-25', title: '추석', type: 'holiday' },
  { date: '2026-09-28', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-09-29', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-09-30', title: '1차 정기시험(1,2,3)', type: 'exam' },

  // 10월
  { date: '2026-10-01', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-10-02', title: '1차 정기시험(1,2,3)', type: 'exam' },
  { date: '2026-10-03', title: '개천절', type: 'holiday' },
  { date: '2026-10-05', title: '대체휴일', type: 'holiday' },
  { date: '2026-10-06', title: '체험학습 불허기간', type: 'event', description: '~10.8' },
  { date: '2026-10-07', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-10-08', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-10-09', title: '한글날', type: 'holiday' },
  { date: '2026-10-12', title: '체험학습 불허기간', type: 'event', description: '~10.13' },
  { date: '2026-10-13', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-10-20', title: '전국연합평가(1,2,3)', type: 'exam', description: '<금요일 수업>' },
  { date: '2026-10-21', title: '<금요일 수업>', type: 'event' },
  { date: '2026-10-23', title: '체육축제', type: 'event' },

  // 11월
  { date: '2026-11-17', title: '<목요일 수업>', type: 'event' },
  { date: '2026-11-19', title: '수학능력시험 (재량휴업일)', type: 'holiday' },
  { date: '2026-11-20', title: '재량휴업일', type: 'holiday' },

  // 12월
  { date: '2026-12-07', title: '2차 정기시험(1,2)', type: 'exam', description: '~12.11' },
  { date: '2026-12-08', title: '2차 정기시험(1,2)', type: 'exam' },
  { date: '2026-12-09', title: '2차 정기시험(1,2)', type: 'exam' },
  { date: '2026-12-10', title: '2차 정기시험(1,2)', type: 'exam' },
  { date: '2026-12-11', title: '2차 정기시험(1,2)', type: 'exam' },
  { date: '2026-12-14', title: '체험학습 불허기간', type: 'event', description: '~12.18' },
  { date: '2026-12-15', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-12-16', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-12-17', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-12-18', title: '체험학습 불허기간', type: 'event' },
  { date: '2026-12-24', title: '동아리발표회/예술축제', type: 'event' },
  { date: '2026-12-25', title: '성탄절', type: 'holiday' },
  { date: '2026-12-29', title: '진급·졸업 평가회', type: 'event' },
  { date: '2026-12-31', title: '졸업식(3)/종업식(1,2)', type: 'event', description: '생기부 점검' },

  // 1월
  { date: '2027-01-01', title: '신정', type: 'holiday' },
  { date: '2027-01-04', title: '전교사 출근일 (생기부 점검)', type: 'event' },
];
