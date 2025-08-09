"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useQuizStore } from 'src/store/quiz';
import IconGameNation from '@/assets/images/icon_game_nation.png'
import IconGameHan from '@/assets/images/icon_game_han.png'
import IconGameCapital from '@/assets/images/icon_game_capital.png'

export default function Home() {
  return (
    <main id="main">        
      <div className="p-6">
        <ul className="flex gap-8">
          <li className="w-[25%]">
             <Link href={{ pathname: '/quiz', query: { name: 'country' } }}>
              <button type="button">
                <img src={IconGameNation.src} alt="IconGameNation" />
                <span className="block mt-2 text-sm">나라 퀴즈</span>
              </button>
            </Link>
          </li>  
          <li className="w-[25%]">
            <Link href={{ pathname: '/quiz', query: { name: 'hanja' } }}>
              <button type="button">
                <img src={IconGameHan.src} alt="IconGameHan" />     
                <span className="block mt-2 text-sm">한문 퀴즈</span>          
              </button>
            </Link>
          </li>  
          <li className="w-[25%]">
            <Link href={{ pathname: '/quiz', query: { name: 'capital' } }}>
              <button type="button">
                <img src={IconGameCapital.src} alt="IconGameCapital" />     
                <span className="block mt-2 text-sm">수도 퀴즈</span>          
              </button>
            </Link>
          </li>           
        </ul>
      </div>
    </main>
  );
}
