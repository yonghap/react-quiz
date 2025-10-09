export const QUIZ_TITLE = {
  country: "🌎 나라 퀴즈",
  hanja: "👲 한자 퀴즈",
  capital: "🗼 수도 퀴즈",
  sense: "❓ 상식 퀴즈"
} as const;

export type QUIZ_TITLE_KEY = keyof typeof QUIZ_TITLE;
export type QUIZ_TITLE_VALUE = typeof QUIZ_TITLE[QUIZ_TITLE_KEY];