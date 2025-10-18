import { QuizName } from "@/types/quiz";

function makeQuizTitle<T extends Record<QuizName, string>>(t: T) {
  return t;
}

const QUIZ_TITLE = makeQuizTitle({
  country: "🌎 나라 퀴즈",
  hanja: "👲 한자 퀴즈",
  capital: "🗼 수도 퀴즈",
  sense: "❓ 상식 퀴즈",
} as const);

export default QUIZ_TITLE;
