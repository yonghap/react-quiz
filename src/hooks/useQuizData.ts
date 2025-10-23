"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/quizData";
import { useQuizStore } from "@/store/quiz";
import { generateMultipleQuiz } from "@/utils/common";
import { QuizName, QuizItem, QuizResult } from "@/types/quiz";

const BuildQuizFromData = (name: QuizName, data: QuizItem[]): QuizResult => {
  return generateMultipleQuiz(data) as QuizResult;
};

export const useQuizData = (name: QuizName | null) => {
  const { resetQuiz, setName } = useQuizStore();
  const [allQuizData, setAllQuizData] = useState<QuizItem[] | null>(null);
  const [quizData, setQuizData] = useState<QuizResult | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["quizData", name],
    queryFn: () => fetchData(name!),
    enabled: !!name,
  });

  useEffect(() => {
    if (!data || !name) return;
    resetQuiz();
    setName(name);
    setAllQuizData(data);
    setQuizData(BuildQuizFromData(name, data));
  }, [data]);

  return { quizData, allQuizData, isLoading, error, setQuizData };
};
