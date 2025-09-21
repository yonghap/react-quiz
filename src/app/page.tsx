"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useQuizStore } from '@/store/quiz';
import IconGameNation from '@/assets/images/icon_game_nation.png'
import IconGameHan from '@/assets/images/icon_game_han.png'
import IconGameCapital from '@/assets/images/icon_game_capital.png'
import IconGameSense from '@/assets/images/icon_game_sense.png'
import { Suspense } from 'react';
import Header from "@/components/navigation";

export default function Home() {
  return (
    <main id="main">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>        
      <div className="p-6 sm:p-12">
        <ul className="flex gap-8 justify-center flex-wrap sm:gap-15">
          <li className="w-[36%] sm:w-[28%]">
             <Link href={{ pathname: '/quiz', query: { name: 'country' } }}>
              <button type="button">
                <img src={IconGameNation.src} alt="IconGameNation" />
                <span className="block mt-4 sm:text-xl">나라 퀴즈</span>
              </button>
            </Link>
          </li>  
          <li className="w-[36%] sm:w-[28%]">
            <Link href={{ pathname: '/quiz', query: { name: 'hanja' } }}>
              <button type="button">
                <img src={IconGameHan.src} alt="IconGameHan" />     
                <span className="block mt-4 sm:text-xl">한문 퀴즈</span>          
              </button>
            </Link>
          </li>  
          <li className="w-[36%] sm:w-[28%]">
            <Link href={{ pathname: '/quiz', query: { name: 'capital' } }}>
              <button type="button">
                <img src={IconGameCapital.src} alt="IconGameCapital" />     
                <span className="block mt-4 sm:text-xl">수도 퀴즈</span>          
              </button>
            </Link>
          </li>
          <li className="w-[36%] sm:w-[28%]">
            <Link href={{ pathname: '/quiz', query: { name: 'sense' } }}>
              <button type="button">
                <img src={IconGameSense.src} alt="IconGameCapital" />     
                <span className="block mt-4 sm:text-xl">상식 퀴즈</span>          
              </button>
            </Link>
          </li>  
        </ul>
      </div>
    </main>
  );
}
