export const SUBJECT_COLORS: Record<string, { bg: string, text: string }> = {
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

export type SubjectName = keyof typeof SUBJECT_COLORS;
