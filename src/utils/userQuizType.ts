import { QuizName } from "@/types/quiz";

export const isQuizName = (name: string | null): name is QuizName => {
  return ["country", "hanja", "capital", "sense"].includes(name ?? "");
};
