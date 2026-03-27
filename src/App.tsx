import { Calendar } from './components/Calendar'

const SUBJECT_COLORS: Record<string, { bg: string, text: string }> = {
  "국어": { bg: "#F05097", text: "#FFFFFF" },
  "수학": { bg: "#657B4E", text: "#FFFFFF" },
  "영어": { bg: "#FFE852", text: "#000000" },
  "과학": { bg: "#6184D4", text: "#FFFFFF" },
  "한국사": { bg: "#F5F2E3", text: "#000000" },
  "사회": { bg: "#672C70", text: "#FFFFFF" },
  "정보": { bg: "#FF828A", text: "#FFFFFF" },
  "체육": { bg: "#BFBFBF", text: "#000000" },
  "과탐실": { bg: "#007C64", text: "#FFFFFF" },
  "미술": { bg: "#341E87", text: "#FFFFFF" },
  "창주": { bg: "#FFB27D", text: "#000000" },
  "진로": { bg: "#DAAADB", text: "#000000" },
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            이산고등학교 3학년 10반
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-blue-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-medium">
            2026학년도 학사일정
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-gray-600">행사</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-gray-600">시험</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-gray-600">공휴일</span>
            </div>
          </div>
        </div>
        
        <Calendar />

        <div className="mt-16 bg-white p-8 rounded-xl shadow-xl border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-blue-600 w-2 h-8 rounded-full"></span>
            주간 수업 시간표
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-blue-100 p-3 text-gray-700 font-bold">교시</th>
                  <th className="border border-blue-100 p-3 text-blue-700 font-bold">월</th>
                  <th className="border border-blue-100 p-3 text-blue-700 font-bold">화</th>
                  <th className="border border-blue-100 p-3 text-blue-700 font-bold">수</th>
                  <th className="border border-blue-100 p-3 text-blue-700 font-bold">목</th>
                  <th className="border border-blue-100 p-3 text-blue-700 font-bold">금</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "국어", "한국사", "한국사", "미술", "사회"],
                  ["2", "정보", "과탐실", "국어", "체육", "정보"],
                  ["3", "수학", "영어", "영어", "한국사", "과학"],
                  ["4", "과학", "과학", "미술", "수학", "영어"],
                  ["5", "체육", "수학", "정보", "창주", "수학"],
                  ["6", "사회", "국어", "과학", "창주", "진로"],
                  ["7", "영어", "-", "사회", "-", "국어"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/10 transition-colors">
                    <td className="border border-blue-100 p-3 text-center font-bold bg-gray-50 text-gray-500 w-16">{row[0]}</td>
                    {row.slice(1).map((subject, j) => {
                      const style = SUBJECT_COLORS[subject] || { bg: "transparent", text: "inherit" };
                      return (
                        <td 
                          key={j} 
                          className="border border-blue-100 p-3 text-center font-medium"
                          style={{ backgroundColor: style.bg, color: style.text }}
                        >
                          {subject}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400 italic">* 창주: 창의적 체험활동 / 과탐실: 과학탐구실험</p>
        </div>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2026 이산고등학교 3학년 10반. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
