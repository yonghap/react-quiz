'use client';
import { countryQuizItem, hanjaQuizItem } from 'src/types/quiz';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams , useRouter  } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateMultipleQuiz } from 'src/utils/common';
import { COMMON_CODE } from 'src/constants/code';
import { useQuizStore } from 'src/store/quiz';
import scratch1 from 'src/assets/images/bg_scratch1.png'

// 데이터 받아오기
async function fetchData(name: string | null) {
  if (name === 'hanja') {
    const result = await fetch('/assets/hanja.json');
    if (!result.ok) throw new Error('hanja.json 로딩 실패');
		const data = await result.json();
		return data.data;
  }
  if (name === 'capital') {
    const result = await fetch('/assets/capital.json');
    if (!result.ok) throw new Error('capital.json 로딩 실패');
		const data = await result.json();
		return data.data;
  }
  if (name === 'sense') {
    const result = await fetch('/assets/sense.json');
    if (!result.ok) throw new Error('sense.json 로딩 실패');
		const data = await result.json();
		return data.data;
  }
  // 기본은 country
  const result = await fetch('/api/getCountry');
  if (!result.ok) throw new Error('국가 정보 로딩 실패');
  return await result.json();
}

/**
 * 다음 퀴즈로 이동
 */
export default function Quiz() {
	const router = useRouter();
	const { quizResult, quizName, setName, addQuiz, resetQuiz } = useQuizStore();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

	// 퀴즈 데이터 상태 추가
	const [quizIndex , setQuizIndex] = useState(1); // 현재 퀴즈 번호
	const [allQuizData, setAllQuizData] = useState<countryQuizItem[] | hanjaQuizItem[] | null>(null) // 모든 퀴즈 데이터
	const [quizData, setCurrentQuizData] = useState<{ selected: countryQuizItem | hanjaQuizItem, shuffled: countryQuizItem[] | hanjaQuizItem[] } | null>(null) // 현재 퀴즈 데이터

	// 퀴즈 데이터 가져오기
  const { data, error, isLoading } = useQuery({
    queryKey: ['quizData', name], // name을 queryKey에 포함해야 refetch됨
    queryFn: () => fetchData(name),
    enabled: !!name, // name이 null이 아닐 때만 실행
  });
	// 
	const ANSWER_COLUMN = {
		country : "country_eng_nm",
		hanja : "meaning",
		capital : "capital",
	}
	const GUIDE_TEXT = {
		country : "어느 나라일까요?",
		hanja : "무슨 뜻일까요?",
		capital : "수도는 어디일까요?"
	}

	useEffect(() => {
		resetQuiz()
		setName(name)
		if (data && Array.isArray(data)) {
			setAllQuizData(data);
			setCurrentQuizData(generateMultipleQuiz(data));
		}
	}, [data]);

	if (isLoading) return <p className='py-5 text-center'>Loading...</p>;
	if (error) return <p className='py-5 text-center'>에러 발생: {(error as Error).message}</p>;
	if (!quizData) return <p className='py-5 text-center'>퀴즈 데이터를 불러오는 중입니다.</p>;
	// 채점해서 스토어에 집어 넣음
	function gradingQuiz(name:string):void {
		const resultData = {
			...quizData,
			choiceName : name
		}
		addQuiz(resultData);		
	}

	// 정답선택
	function handleClick(name:string):void {
		gradingQuiz(name)		
		if (quizIndex === COMMON_CODE.QUIZ_COUNT) {
			alert('퀴즈가 종료 되었습니다.\n결과 화면으로 이동합니다.');
			router.push('/quiz/result')
			return;
		} else {
			setCurrentQuizData(generateMultipleQuiz(allQuizData))
			setQuizIndex(quizIndex+1)
		}
	}

// 나라 맞추기 퀴즈
function renderCountryQuiz(quizData) {
  return (
    <div>
      <div className="mx-4 mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200 rounded-md" style={{ backgroundImage: `url(${quizData.selected.download_url})` }} />
      <ul className="px-5 text-center">
        {quizData.shuffled.map((i,idx) => (
          <li key={idx}>
            <button  className="w-full block py-2 my-5 text-xl text-center bg-slate-100 border border-slate-300 rounded-md shadow-md" onClick={() => handleClick(i.country_eng_nm)}>{i.country_nm}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// 한자 퀴즈 
function renderHanjaQuiz(quizData) {
  return (
    <div>
      <div className="mb-8 py-8 text-center text-8xl">
				{quizData.selected.hanja}
			</div>
      <ul className="px-5 text-center">
        {quizData.shuffled.map((i,idx) => (
          <li key={idx}>
            <button className="w-full block py-2 my-5 text-xl text-center bg-slate-100 border border-slate-300 rounded-md shadow-md" onClick={() => handleClick(i.meaning)}>{i.meaning}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// 수도 퀴즈
function renderCapitalQuiz(quizData) {
  return (
    <div>
      <div className="mx-4 mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200" style={{ backgroundImage: `url(${quizData.selected.flag})` }} />
			<h2 className={`block w-full my-6 text-3xl text-center`}>
				[{quizData.selected.country}]
			</h2>
      <ul className="px-5 text-center">
        {quizData.shuffled.map((i,idx) => (
          <li key={idx}>
            <button  className="w-full block py-2 my-5 text-xl text-center bg-slate-100 border border-slate-300 rounded-md shadow-md" onClick={() => handleClick(i.capital)}>{i.capital}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// 상식 퀴즈
function renderSenseQuiz(quizData) {
  return (
    <div>
      <div className="mb-8 py-8 text-center text-2xl">
				{quizData.selected.question}
			</div>
      <ul className="px-5 text-center">
        {quizData.selected.options.map((i,idx) => (
          <li key={idx}>
            <button className="w-full block py-2 my-5 text-xl text-center bg-slate-100 border border-slate-300 rounded-md shadow-md" onClick={() => handleClick(i)}>{i}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const renderByType = {
  country: renderCountryQuiz,
  hanja: renderHanjaQuiz,
  capital: renderCapitalQuiz,
  sense: renderSenseQuiz,
};
const renderQuiz = renderByType[quizName];
return (
	<div>
		<div className="flex items-center justify-between px-5 py-7 text-center">
			<div className="relative pb-3 text-xl font-bold">
				<div className="absolute inset-0 opacity-70" style={{
					backgroundImage: `url(${scratch1.src})`,
					backgroundSize: '100% auto',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'bottom',
				}}>
				</div>
				{GUIDE_TEXT[name]}
			</div>
			<div className="text-xs text-gray-400">
				<strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
			</div>
		</div>
		{renderQuiz ? renderQuiz(quizData) : <p>퀴즈 타입이 올바르지 않습니다.</p>}
	</div>
)
}