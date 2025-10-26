"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quiz";
import { COMMON_CODE } from "@/constants/code";
import { QuizName, QuizItem, QuizResult } from "@/types/quiz";
import { generateMultipleQuiz } from "@/utils/common";

const BuildQuizFromData = (name: QuizName, data: QuizItem[]): QuizResult => {
  return generateMultipleQuiz(data) as QuizResult;
};

export const useQuizProgress = (
  name: QuizName,
  allQuizData: QuizItem[] | null,
  currentQuizData: QuizResult | null,
  setCurrentQuizData: (data: QuizResult) => void
) => {
  const router = useRouter();
  const { addQuiz } = useQuizStore();
  const [quizIndex, setQuizIndex] = useState(1);

  const handleClick = (choice: string) => {
    if (!currentQuizData || !allQuizData) return;
    addQuiz({ ...currentQuizData, choiceName: choice });

    if (quizIndex === COMMON_CODE.QUIZ_COUNT) {
      alert("퀴즈가 종료되었습니다.\n결과 화면으로 이동합니다.");
      router.push("/quiz/result");
    } else {
      setCurrentQuizData(BuildQuizFromData(name, allQuizData));
      setQuizIndex((i) => i + 1);
    }
  };

  return { quizIndex, handleClick };
};
