"use client";

import QuizItem from '@/components/Quiz'
import { Suspense } from "react";
import { QUIZ_TITLE } from '@/constants/title';
import { useQuizStore } from '@/store/quiz';

export default function Quiz() {
  const { quizName } = useQuizStore();
  
  return (
    <Suspense fallback={<div className="py-5 text-center">퀴즈를 불러오는 중...</div>}>
      <div className="text-center text-3xl pt-8 font-bold">
        {QUIZ_TITLE[quizName]}
      </div>
      <div>
        <QuizItem />
      </div>
    </Suspense>
  );
}