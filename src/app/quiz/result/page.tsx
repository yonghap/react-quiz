"use client"
import Link from "next/link";
import { usePathname, useRouter  } from 'next/navigation';
import { useQuizStore } from 'src/store/quiz';

export default function QuizResult() {
  const router = useRouter();
	const { quizResult, quizName, setName, addQuiz, reset } = useQuizStore();
  console.log(quizResult)
  
  const renderByType = {
    country: renderCountryQuiz,
    hanja: renderHanjaQuiz,
  };
  const renderQuiz = renderByType[quizName];

  // 나라 맞추기 퀴즈
  function renderCountryQuiz(quiz) {
    return (
      <ul>
        {quiz.map((quiz, quizIdx) => (
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
    );
  }
  // 한자 맞추기 퀴즈
  function renderHanjaQuiz(quiz) {
    return (
      <ul>
        {quiz.map((quiz, quizIdx) => (
          <li className="py-2 border-b border-slate-200" key={quizIdx}>
            <div className="flex flex-1 items-center justify-between relative text-xs">
              <span className="text-2xl font-bold">{quiz.selected.hanja}</span>
              <span>
                {quiz.selected.meaning}
              </span>
              <span className="text-red-500 line-through opacity-80">
                {quiz.choiceName}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div id="quizResult">      
      <div className="p-4">        
		    {renderQuiz ? renderQuiz(quizResult) : <p>퀴즈 타입이 올바르지 않습니다.</p>}      
        <div className="flex justify-center text-center mt-8 gap-2">
          <Link className="rounded-sm bg-slate-300 text-slate-500 text-sm py-2 px-4" href="/">HOME</Link>
          <Link className="rounded-sm bg-slate-600 text-white text-sm py-2 px-4" href={{ pathname: '/quiz', query: { name: quizName } }}>다시하기</Link>
        </div>
      </div>
    </div>
  );
}