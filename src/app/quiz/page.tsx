import QuizItem from '@/components/Quiz'
import Link from 'next/link';
import { Suspense } from "react";
import Home from '@/assets/images/home.svg'


export default async function Quiz() {
  return (
    <Suspense fallback={<div className="py-5 text-center">결과를 불러오는 중...</div>}>
      <div className="text-center pt-8">
        <Link href="/">
          <img src={Home.src} className="inline-block max-w-12 opacity-80" alt="ggYu" />     
        </Link> 
      </div>
      <div>
        <QuizItem></QuizItem>
      </div>
    </Suspense>
  );
}
