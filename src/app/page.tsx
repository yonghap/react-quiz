"use client";
import { Suspense } from 'react';
import Link from "next/link";
import Header from "@/components/navigation";
import { QUIZ_LIST } from '@/constants/menu';

export default function Home() {
  return (
    <main id="main">
      <Suspense fallback={<div className="py-t text-center">Loading...</div>}>
        <Header />
      </Suspense>        
      <div className="p-6 sm:p-12">
        <ul className="flex gap-8 justify-center flex-wrap sm:gap-15 text-center">
          {QUIZ_LIST.map((item) => (
            <li key={item.name} className="w-[36%] sm:w-[28%]">
              <Link href={{ pathname: '/quiz', query: { name: item.name } }}>
                <img src={item.image.src} alt="IconGameNation" />
                <span className="block mt-4 sm:text-xl">
                  {item.title}  
                </span>               
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
