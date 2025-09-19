import QuizItem from '@/components/Quiz'
import { Suspense } from "react";

export default async function Quiz() {
  return (
    <Suspense fallback={<div className="py-5 text-center">결과를 불러오는 중...</div>}>
      <div>
        <QuizItem></QuizItem>
      </div>
    </Suspense>
  );
}
