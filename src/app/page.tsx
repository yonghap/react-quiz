"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useQuizStore } from 'src/store/quiz';
import IconGameNation from '@/assets/images/icon_game_nation.svg'

export default function Home() {
  const { reset } = useQuizStore();
  useEffect(() => {
    reset();
  }, []);
  return (
    <main id="main">        
      <div className="p-6">
        <ul className="flex gap-3">
          <li className="w-[25%]">
            <Link href="/quiz">
              <button type="button">
                <img src={IconGameNation.src} alt="IconGameNation" />
                <span className="block mt-2 text-xs">나라 맞추기</span>
              </button>
            </Link>
          </li>        
        </ul>
      </div>
    </main>
  );
}
