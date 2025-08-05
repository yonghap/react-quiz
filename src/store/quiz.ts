import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";
import { countryQuizResult } from 'src/types/quiz';

interface QuizState {
  quizName: string,
  quizResult: countryQuizResult[];
  addQuiz: (newResult:countryQuizResult) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizName: '',
      quizResult: [], 
      setName: (newName) => set((state) => ({ quizName: newName })),
      addQuiz: (newResult) => set((state) => ({ quizResult: [...state.quizResult, newResult] })),
      resetQuiz: () => set(() => ({ quizResult: [] })),
    }),
    {
      name: "zustand-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
