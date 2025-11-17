"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useQuizStore } from "@/store/quiz";
import answerImage from "@/assets/images/bg_scratch2.png";
import wrongImage from "@/assets/images/bg_scratch3.png";
import type { QuizResult } from "@/types/quiz";

export default function QuizResult() {
  const { quizResult, quizName } = useQuizStore();

  const renderByType = {
    country: renderCountryQuiz,
    hanja: renderHanjaQuiz,
    capital: renderCapitalQuiz,
    sense: renderSenseQuiz,
  };
  const renderQuiz = renderByType[quizName];

  const ANSWER_COLUMN = {
    country: "country_nm",
    hanja: "meaning",
    capital: "capital",
    sense: "answer",
  };

  const correctLength = quizResult.filter(
    (item) => item.choiceName === item.selected[ANSWER_COLUMN[quizName]]
  ).length;
  // 나라 퀴즈 결과
  function renderCountryQuiz(resultList): JSX.Element {
    return (
      <ul className="mx-4">
        {resultList.map((item, quizIdx) => (
          <li className="py-2 border-b border-slate-200" key={quizIdx}>
            <div className="flex flex-1 justify-between relative items-center">
              <div className="relative w-[50px] text-center">
                {item.selected[ANSWER_COLUMN[quizName]] === item.choiceName ? (
                  <div className="absolute w-[48px] -bottom-4 -left-1 z-10">
                    <img src={`${answerImage.src}`} alt="맞혔어요!"></img>
                  </div>
                ) : (
                  <div className="absolute w-[42px] -bottom-2 left-2 z-10">
                    <img src={`${wrongImage.src}`} alt="틀렸어요!"></img>
                  </div>
                )}
                {quizIdx + 1}
              </div>
              {item.shuffled.map((option, optionIdx) => (
                <div
                  className="relative w-[33%] py-4 text-center text-sm"
                  key={optionIdx}
                >
                  <span
                    className={`relative z-10 ${option.country_eng_nm === item.selected.country_eng_nm && "text-white text-shadow-sm text-shadow-black"} ${item.choiceName === option.country_eng_nm && "text-red-500"}`}
                  >
                    {option.country_nm}
                  </span>
                  {option.country_eng_nm === item.selected.country_eng_nm && (
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[100%] bg-size-[100%_auto] rounded-md bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${item.selected.download_url})`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  // 한자 퀴즈 결과
  function renderHanjaQuiz(resultList): JSX.Element {
    return (
      <ul className="mx-4">
        {resultList.map((item, quizIdx) => (
          <li className="p-3 pl-10 border-b border-slate-200" key={quizIdx}>
            <div className="relative text-md">
              <div className="relative inline-block w-[40px] text-lg pr-2">
                {quizIdx + 1}
                {item.selected.meaning === item.choiceName ? (
                  <div className="absolute w-[44px] -bottom-3 -left-4 z-10">
                    <img src={`${answerImage.src}`} alt="맞혔어요"></img>
                  </div>
                ) : (
                  <div className="absolute w-[40px] -bottom-1 -left-3 z-10">
                    <img src={`${wrongImage.src}`} alt="틀렸어요!"></img>
                  </div>
                )}
              </div>
              <span className="text-4xl font-bold text-slate-700">
                {item.selected.hanja}
              </span>
              <span className="mx-5">{item.selected.meaning}</span>
              {item.choiceName !== item.selected.meaning && (
                <span className="text-red-500 line-through opacity-80">
                  {item.choiceName}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  // 수도 퀴즈 결과
  function renderCapitalQuiz(resultList): JSX.Element {
    return (
      <ul className="mx-4">
        {resultList.map((item, quizIdx) => (
          <li className="py-4 border-b border-slate-200" key={quizIdx}>
            <div className="mb-2 text-center text-xl underline">
              {item.selected.country}
            </div>
            <div className="flex flex-1 justify-between relative items-center">
              <div className="relative w-[50px] text-center">
                {item.selected.capital === item.choiceName ? (
                  <div className="absolute w-[48px] -bottom-4 -left-1 z-10">
                    <img src={`${answerImage.src}`} alt="맞혔어요"></img>
                  </div>
                ) : (
                  <div className="absolute w-[42px] -bottom-2 left-2 z-10">
                    <img src={`${wrongImage.src}`} alt="틀렸어요!"></img>
                  </div>
                )}
                {quizIdx + 1}
              </div>
              {item.shuffled.map((option, optionIdx) => (
                <div
                  className="relative w-[33%] py-4 text-center text-sm"
                  key={optionIdx}
                >
                  <span
                    className={`relative z-10 ${option.country === item.selected.country && "text-white text-shadow-sm text-shadow-black"} ${item.choiceName === option.capital && "text-red-500"}`}
                  >
                    {option.capital}
                  </span>
                  {option.country === item.selected.country && (
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[100%] bg-size-[100%_auto] rounded-md bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${item.selected.flag})` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  // 상식 퀴즈 결과
  function renderSenseQuiz(resultList): JSX.Element {
    return (
      <ul className="mx-4">
        {resultList.map((item, quizIdx) => (
          <li
            className="p-4 pr-0 sm:pl-10 border-b border-slate-200"
            key={quizIdx}
          >
            <div className="relative text-md">
              <div className="flex items-center">
                <div className="relative inline-block w-[30px] text-lg">
                  {quizIdx + 1}
                  {item.selected.answer === item.choiceName ? (
                    <div className="absolute w-[44px] -bottom-4 -left-5 z-10">
                      <img src={`${answerImage.src}`} alt="맞혔어요"></img>
                    </div>
                  ) : (
                    <div className="absolute w-[40px] -bottom-3 -left-3 z-10">
                      <img src={`${wrongImage.src}`} alt="틀렸어요!"></img>
                    </div>
                  )}
                </div>
                <span className="text-md font-bold text-slate-700">
                  {item.selected.question}
                </span>
              </div>
              <div className="mt-1 pl-[30px]">
                <span className="mr-5">{item.selected.answer}</span>
                {item.choiceName !== item.selected.answer && (
                  <span className="text-red-500 line-through opacity-80">
                    {item.choiceName}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Suspense
      fallback={<div className="text-center py-5">결과를 불러오는 중...</div>}
    >
      <div id="quizResult">
        <div className="pt-4">
          <div className="py-5 text-center text-2xl font-bold text-slate-700">
            10개중 <strong className="text-blue-700">{correctLength}</strong>
            개를 맞췄어요!
          </div>
          {renderQuiz ? (
            renderQuiz(quizResult)
          ) : (
            <p className="py-5 text-center">퀴즈 타입이 올바르지 않습니다.</p>
          )}
          <div className="flex justify-center text-center mt-8 gap-2">
            <Link
              className="rounded-sm bg-slate-300 text-slate-500 text-sm py-3 px-5"
              href="/"
            >
              HOME
            </Link>
            <Link
              className="rounded-sm bg-slate-500 text-white text-sm py-3 px-5"
              href={{ pathname: "/quiz", query: { name: quizName } }}
            >
              다시하기
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
