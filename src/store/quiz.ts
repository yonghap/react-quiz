import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QuizResult, QuizName } from "@/types/quiz";

interface QuizState {
  quizName: QuizName | null;
  quizResult: QuizResult[];
  addQuiz: (newResult: QuizResult) => void;
  resetQuiz: () => void;
  setName: (newName: QuizName) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizName: null,
      quizResult: [],
      setName: (newName) => set(() => ({ quizName: newName })),
      addQuiz: (newResult) =>
        set((state) => ({ quizResult: [...state.quizResult, newResult] })),
      resetQuiz: () => set(() => ({ quizResult: [] })),
    }),
    {
      name: "zustand-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
