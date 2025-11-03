"use client";
import React from "react";
import { COMMON_CODE } from "@/constants/code";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuizStore } from "@/store/quiz";
import { isQuizName } from "@/utils/userQuizType";
import { quizRenderer } from "@/components/quiz/quizRenderer";
import { useQuizData } from "@/hooks/useQuizData";
import { useQuizProgress } from "@/hooks/useQuizProgress";
import { QuizName } from "@/types/quiz";
import QUIZ_TITLE from "@/constants/title";
import { guideText } from "@/constants/guideText";

const renderState = ({
  isLoading,
  error,
  currentQuizData,
  quizName,
  currentQuizName,
}: {
  isLoading: boolean;
  error: unknown;
  currentQuizData: object;
  quizName: string | null;
  currentQuizName: QuizName | null;
}) => {
  if (!currentQuizName)
    return (
      <p className="py-10 text-center text-gray-500">잘못된 퀴즈 타입입니다.</p>
    );
  if (isLoading) return <p className="py-5 text-center">Loading...</p>;
  if (error)
    return <p className="py-5 text-center">에러: {(error as Error).message}</p>;
  if (!currentQuizData)
    return <p className="py-5 text-center">퀴즈 데이터 로딩중</p>;
  if (!quizName || !isQuizName(quizName))
    return <p>올바른 퀴즈 타입이 아닙니다.</p>;

  return null;
};

/** -------------------------------
 *  메인 퀴즈 컴포넌트
 *  ------------------------------- */
export default function Quiz() {
  const searchParams = useSearchParams();
  const rawQuizName = searchParams.get("name");
  const currentQuizName = isQuizName(rawQuizName) ? rawQuizName : null;

  /* 현재 퀴즈 이름 체크 */
  if (!currentQuizName)
    return (
      <p className="py-10 text-center text-gray-500">잘못된 퀴즈 타입입니다.</p>
    );

  const { currentQuizData, allQuizData, isLoading, error, setCurrentQuizData } =
    useQuizData(currentQuizName);
  const { quizName } = useQuizStore();
  const { quizIndex, handleClick } = useQuizProgress(
    currentQuizName,
    allQuizData,
    currentQuizData,
    setCurrentQuizData
  );

  /** 퀴즈 로딩 상태  */
  const state = renderState({
    isLoading,
    error,
    currentQuizData,
    quizName,
    currentQuizName,
  });
  if (state) return state;

  return (
    <Suspense
      fallback={<div className="py-5 text-center">퀴즈를 불러오는 중...</div>}
    >
      <div className="text-center text-3xl pt-8 font-bold">
        {QUIZ_TITLE[quizName]}
      </div>
      <div id="main">
        <div>
          <div className="flex items-center justify-between px-5 py-7">
            <div className="text-xl font-bold">
              {guideText[currentQuizName]}
            </div>
            <div className="text-xs text-gray-400">
              <strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
            </div>
          </div>
          {quizName && quizRenderer(quizName!, currentQuizData, handleClick)}
        </div>
      </div>
    </Suspense>
  );
}
