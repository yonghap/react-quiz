'use client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateMultipleQuiz } from '@/utils/common';
import { COMMON_CODE } from '@/constants/code';
import { useQuizStore } from '@/store/quiz';
import {
  QuizName,
  QuizResult,
  QuizData,
  CountryQuizItem,
  HanjaQuizItem,
  CapitalQuizItem,
  SenseQuizItem,
} from '@/types/quiz';

/** -------------------------------
 *  파일 데이터 맵
 *  ------------------------------- */
const FILE_MAP: Record<QuizName, string> = {
  hanja: 'hanja.json',
  capital: 'capital.json',
  sense: 'sense.json',
  country: 'country.json',
};

/** -------------------------------
 *  데이터 fetch 함수
 *  ------------------------------- */
async function fetchData(name: QuizName): Promise<any[]> {
  const file = FILE_MAP[name];
  const res = await fetch(`/assets/${file}`);
  if (!res.ok) throw new Error(`${file} 로딩 실패`);
  const data = await res.json();
  return data.data;
}

/** -------------------------------
 *  공통 퀴즈 옵션 렌더링
 *  ------------------------------- */
type QuizOptionsProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (value: string) => void;
};

function QuizOptions<T>({ items, getLabel, onSelect }: QuizOptionsProps<T>) {
  return (
    <ul className="px-5 text-center">
      {items.map((i, idx) => (
        <li key={idx}>
          <button
            className="w-full block py-2 my-5 text-xl text-center bg-slate-100 border border-slate-300 rounded-md shadow-md cursor-pointer active:bg-blue-100"
            onClick={() => onSelect(getLabel(i))}
          >
            {getLabel(i)}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** -------------------------------
 *  퀴즈 타입별 렌더러
 *  ------------------------------- */
function renderQuizByType(
  type: QuizName,
  quizData: QuizResult,
  handleClick: (choice: string) => void
) {
  const { selected, shuffled } = quizData as QuizData<any>;

  const getLabel = {
    country: (i: CountryQuizItem) => i.country_nm,
    hanja: (i: HanjaQuizItem) => i.meaning,
    capital: (i: CapitalQuizItem) => i.capital,
    sense: (i: string) => i,
  }[type] as (item: any) => string;

  const question = {
    country: (
      <div
        className="mx-4 mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200 rounded-md"
        style={{ backgroundImage: `url(${(selected as CountryQuizItem).download_url})` }}
      />
    ),
    hanja: (
      <div className="mb-8 py-8 text-center text-8xl">
        {(selected as HanjaQuizItem).hanja}
      </div>
    ),
    capital: (
      <>
        <div
          className="mx-4 mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200 rounded-md"
          style={{ backgroundImage: `url(${(selected as CapitalQuizItem).flag})` }}
        />
        <h2 className="block w-full my-6 text-3xl text-center">
          [{(selected as CapitalQuizItem).country}]
        </h2>
      </>
    ),
    sense: (
      <div className="mb-8 py-8 px-2 text-center text-2xl">
        {(selected as SenseQuizItem).question}
      </div>
    ),
  }[type];

  const options =
    type === 'sense'
      ? (selected as SenseQuizItem).options
      : shuffled || [];

  return (
    <div>
      {question}
      <QuizOptions items={options} getLabel={getLabel} onSelect={handleClick} />
    </div>
  );
}

/** -------------------------------
 *  메인 컴포넌트
 *  ------------------------------- */
export default function Quiz() {
  const router = useRouter();
  const { quizResult, quizName, setName, addQuiz, resetQuiz } = useQuizStore();
  const searchParams = useSearchParams();
  const rawName = searchParams.get('name');

  const name: QuizName | null = 
    rawName === 'country' || rawName === 'hanja' || rawName === 'capital' || rawName === 'sense'
      ? rawName
      : null;

  if (!name) {
    return <p>잘못된 퀴즈 타입입니다.</p>;
  }


  const [quizIndex, setQuizIndex] = useState(1);
  const [allQuizData, setAllQuizData] = useState<any[] | null>(null);
  const [quizData, setCurrentQuizData] = useState<QuizResult | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['quizData', name],
    queryFn: () => fetchData(name!),
    enabled: !!name,
  });

  useEffect(() => {
    if (!data || !name) return;
    resetQuiz();
    setName(name);
    setAllQuizData(data);
    setCurrentQuizData(generateMultipleQuiz(data));
  }, [data]);

  const handleClick = (choice: string) => {
    if (!quizData || !allQuizData) return;
    addQuiz({ ...quizData, choiceName: choice });
    if (quizIndex === COMMON_CODE.QUIZ_COUNT) {
      alert('퀴즈가 종료되었습니다.\n결과 화면으로 이동합니다.');
      router.push('/quiz/result');
    } else {
      setCurrentQuizData(generateMultipleQuiz(allQuizData));
      setQuizIndex((i) => i + 1);
    }
  };

  if (isLoading) return <p className="py-5 text-center">Loading...</p>;
  if (error) return <p className="py-5 text-center">에러: {(error as Error).message}</p>;
  if (!quizData) return <p className="py-5 text-center">퀴즈 데이터 로딩중</p>;

  const GUIDE_TEXT: Record<QuizName, string> = {
    country: '나라를 맞춰보세요!',
    hanja: '무슨 뜻일까요?',
    capital: '수도는 어디일까요?',
    sense: '정답을 맞춰보세요!',
  };

  function isQuizName(name: string | null): name is QuizName {
    return name === 'country' || name === 'hanja' || name === 'capital' || name === 'sense';
  }

  // 사용
  if (!quizName || !isQuizName(quizName)) {
    return <p>올바른 퀴즈 타입이 아닙니다.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-7 text-center">
        <div className="relative text-xl font-bold">{name && GUIDE_TEXT[name]}</div>
        <div className="text-xs text-gray-400">
          <strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
        </div>
      </div>
      {quizName && renderQuizByType(quizName, quizData, handleClick)}
    </div>
  );
}
