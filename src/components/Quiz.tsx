"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { generateMultipleQuiz } from "@/utils/common";
import { COMMON_CODE } from "@/constants/code";
import { useQuizStore } from "@/store/quiz";
import { isQuizName } from "@/utils/userQuizType";

import {
  QuizName,
  QuizResult,
  QuizData,
  QuizItem,
  CountryQuizItem,
  HanjaQuizItem,
  CapitalQuizItem,
  SenseQuizItem,
} from "@/types/quiz";

import { fetchData } from "@/utils/quizData";

/** -------------------------------
 *  가이드 텍스트
 *  ------------------------------- */
const guideText: Record<QuizName, string> = {
  country: "나라를 맞춰보세요!",
  hanja: "무슨 뜻일까요?",
  capital: "수도는 어디일까요?",
  sense: "정답을 맞춰보세요!",
};

/** -------------------------------
 *  공통 퀴즈 옵션 렌더링
 *  ------------------------------- */
type QuizOptionsProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (value: string) => void;
};

/** -------------------------------
 *  데이터 > 퀴즈 생성 함수
 *  ------------------------------- */
const BuildQuizFromData = (name: QuizName, data: QuizItem[]): QuizResult => {
  switch (name) {
    case "country":
      return generateMultipleQuiz(data as CountryQuizItem[]) as QuizResult;
    case "hanja":
      return generateMultipleQuiz(data as HanjaQuizItem[]) as QuizResult;
    case "capital":
      return generateMultipleQuiz(data as CapitalQuizItem[]) as QuizResult;
    case "sense":
      return generateMultipleQuiz(data as SenseQuizItem[]) as QuizResult;
  }
};

/** -------------------------------
 *  퀴즈 보기
 *  ------------------------------- */
const ShowOptions = <T,>({
  items,
  getLabel,
  onSelect,
}: QuizOptionsProps<T>) => {
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
};

/** -------------------------------
 *  퀴즈 문제 + 보기
 *  ------------------------------- */
const renderQuizByType = (
  type: QuizName,
  quizData: QuizResult,
  handleClick: (choice: string) => void
) => {
  const { selected, shuffled } = quizData as QuizData<QuizItem>;

  const getLabel = {
    country: (i: CountryQuizItem) => i.country_nm,
    hanja: (i: HanjaQuizItem) => i.meaning,
    capital: (i: CapitalQuizItem) => i.capital,
    sense: (i: string) => i,
  }[type] as (item: QuizItem | string) => string;

  // 문제
  const question = {
    country: (
      <div
        className="mx-4 mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200 rounded-md"
        style={{
          backgroundImage: `url(${(selected as CountryQuizItem).download_url})`,
        }}
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
          style={{
            backgroundImage: `url(${(selected as CapitalQuizItem).flag})`,
          }}
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
    type === "sense" ? (selected as SenseQuizItem).options : shuffled || [];

  return (
    <div>
      {question}
      <ShowOptions items={options} getLabel={getLabel} onSelect={handleClick} />
    </div>
  );
};

/** -------------------------------
 *  메인 컴포넌트
 *  ------------------------------- */
export default function Quiz() {
  const router = useRouter();
  const { quizName, setName, addQuiz, resetQuiz } = useQuizStore();
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name");

  const name = isQuizName(rawName) ? rawName : null;

  if (!name) {
    return <p>잘못된 퀴즈 타입입니다.</p>;
  }

  const [quizIndex, setQuizIndex] = useState(1);
  const [allQuizData, setAllQuizData] = useState<QuizItem[] | null>(null);
  const [quizData, setCurrentQuizData] = useState<QuizResult | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["quizData", name],
    queryFn: () => fetchData(name!),
    enabled: !!name,
  });

  useEffect(() => {
    if (!data || !name) return;
    resetQuiz();
    setName(name);
    setAllQuizData(data);
    if (!name || !data) return;

    setCurrentQuizData(BuildQuizFromData(name, data));
  }, [data]);

  const handleClick = (choice: string) => {
    if (!quizData || !allQuizData) return;
    addQuiz({ ...quizData, choiceName: choice });
    if (quizIndex === COMMON_CODE.QUIZ_COUNT) {
      alert("퀴즈가 종료되었습니다.\n결과 화면으로 이동합니다.");
      router.push("/quiz/result");
    } else {
      if (!name || !allQuizData) return;
      setCurrentQuizData(BuildQuizFromData(name, allQuizData));
      setQuizIndex((i) => i + 1);
    }
  };

  if (isLoading) return <p className="py-5 text-center">Loading...</p>;
  if (error)
    return <p className="py-5 text-center">에러: {(error as Error).message}</p>;
  if (!quizData) return <p className="py-5 text-center">퀴즈 데이터 로딩중</p>;

  // 사용
  if (!quizName || !isQuizName(quizName)) {
    return <p>올바른 퀴즈 타입이 아닙니다.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-7 text-center">
        <div className="relative text-xl font-bold">
          {name && guideText[name]}
        </div>
        <div className="text-xs text-gray-400">
          <strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
        </div>
      </div>
      {quizName && renderQuizByType(quizName, quizData, handleClick)}
    </div>
  );
}
