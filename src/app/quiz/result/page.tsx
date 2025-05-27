"use client"
import Link from "next/link";
import { usePathname, useRouter  } from 'next/navigation';
import { useQuizStore } from 'src/store/quiz';

export default function QuizResult() {
  const router = useRouter();
  const { quizResult, addQuiz } = useQuizStore();
  return (
    <div id="quizResult">
      <div className="p-4">        
        <ul>
          {quizResult.map((quiz, quizIdx) => (
            <li className="py-2 border-b border-slate-200" key={quizIdx}>
              <div className="flex flex-1 justify-between relative ">
                {quiz.shuffled.map((option, optionIdx) => (
                  <p className="relative w-[33%] py-4 text-center text-sm" key={optionIdx}>                   
                    <span className={`relative z-10 ${option.country_eng_nm === quiz.selected.country_eng_nm && "text-white text-shadow-sm text-shadow-black"} ${quiz.choiceName === option.country_eng_nm && 'text-red-500'}`}>
                      {option.country_nm}
                    </span>
                    { 
                      option.country_eng_nm === quiz.selected.country_eng_nm && 
                      <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[100%] bg-size-[100%_100%] border border-slate-200 rounded-xl" 
                        style={{ backgroundImage: `url(${quiz.selected.download_url})` }} 
                      />
                    }
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center text-center mt-8 gap-2">
          <Link className="rounded-sm bg-slate-300 text-slate-500 text-sm py-2 px-4" href="/">HOME</Link>
          <Link className="rounded-sm bg-slate-600 text-white text-sm py-2 px-4" href="/quiz">다시하기</Link>
        </div>
      </div>
    </div>
  );
}