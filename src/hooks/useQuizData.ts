/**
 * 퀴즈 데이터 관련 (전체/현재 퀴즈 생성)
 */
"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/quizData";
import { useQuizStore } from "@/store/quiz";
import { generateMultipleQuiz } from "@/utils/common";
import { QuizName, QuizItem, QuizResult } from "@/types/quiz";

/* 전체 데이터 1문제 생성 */
const BuildQuizFromData = (name: QuizName, data: QuizItem[]): QuizResult => {
  return generateMultipleQuiz(data) as QuizResult;
};

export const useQuizData = (name: QuizName | null) => {
  /* 스토어 리셋, 퀴즈 이름 저장 */
  const { resetQuiz, setName } = useQuizStore();
  /* 전체 퀴즈 데이터 */
  const [allQuizData, setAllQuizData] = useState<QuizItem[] | null>(null);
  /* 현재 퀴즈 데이터 */
  const [currentQuizData, setCurrentQuizData] = useState<QuizResult | null>(
    null
  );

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
    setCurrentQuizData(BuildQuizFromData(name, data));
  }, [data]);

  return { currentQuizData, allQuizData, isLoading, error, setCurrentQuizData };
};
