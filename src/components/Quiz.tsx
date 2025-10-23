"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuizStore } from "@/store/quiz";
import { isQuizName } from "@/utils/userQuizType";
import { COMMON_CODE } from "@/constants/code";
import { renderQuizByType } from "@/components/QuizRenderer";
import { useQuizData } from "@/hooks/useQuizData";
import { useQuizProgress } from "@/hooks/useQuizProgress";
import { QuizName } from "@/types/quiz";

/** -------------------------------
 *  가이드 텍스트
 *  ------------------------------- */
const guideText: Record<QuizName, string> = {
  country: "나라를 맞춰보세요!",
  hanja: "무슨 뜻일까요?",
  capital: "수도는 어디일까요?",
  sense: "정답을 맞춰보세요!",
};

/** -------------------------------
 *  메인 퀴즈 컴포넌트
 *  ------------------------------- */
export default function Quiz() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name");
  const name = isQuizName(rawName) ? rawName : null;

  if (!name) return <p>잘못된 퀴즈 타입입니다.</p>;

  const { quizName } = useQuizStore();
  const { quizData, allQuizData, isLoading, error, setQuizData } =
    useQuizData(name);
  const { quizIndex, handleClick } = useQuizProgress(
    name,
    allQuizData,
    quizData,
    setQuizData
  );

  if (isLoading) return <p className="py-5 text-center">Loading...</p>;
  if (error)
    return <p className="py-5 text-center">에러: {(error as Error).message}</p>;
  if (!quizData) return <p className="py-5 text-center">퀴즈 데이터 로딩중</p>;
  if (!quizName || !isQuizName(quizName))
    return <p>올바른 퀴즈 타입이 아닙니다.</p>;

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-7 text-center">
        <div className="relative text-xl font-bold">
          {name && guideText[name]}
        </div>
        <div className="text-xs text-gray-400">
          <strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
        </div>
      </div>
      {quizName && renderQuizByType(quizName, quizData, handleClick)}
    </div>
  );
}
