"use client";
import React from "react";
import Link from "next/link";
import { useQuizStore } from "@/store/quiz";
import answerImage from "@/assets/images/bg_scratch2.png";
import wrongImage from "@/assets/images/bg_scratch3.png";
import { Suspense } from "react";

// 퀴즈 결과 페이지
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
    country: "country_eng_nm",
    hanja: "meaning",
    capital: "capital",
    sense: "answer",
  };

  const wrongLength = quizResult.filter(
    (item) => item.choiceName === item.selected[ANSWER_COLUMN[quizName]]
  ).length;
  // 나라 맞추기
  function renderCountryQuiz(quiz) {
    return (
      <ul className="mx-4">
        {quiz.map((quiz, quizIdx) => (
          <li className="py-2 border-b border-slate-200" key={quizIdx}>
            <div className="flex flex-1 justify-between relative items-center">
              <div className="relative w-[50px] text-center">
                {quiz.selected.country_eng_nm === quiz.choiceName ? (
                  <div className="absolute w-[48px] -bottom-4 -left-1 z-10">
                    <img src={`${answerImage.src}`}></img>
                  </div>
                ) : (
                  <div className="absolute w-[42px] -bottom-2 left-2 z-10">
                    <img src={`${wrongImage.src}`}></img>
                  </div>
                )}
                {quizIdx + 1}
              </div>
              {quiz.shuffled.map((option, optionIdx) => (
                <div
                  className="relative w-[33%] py-4 text-center text-sm"
                  key={optionIdx}
                >
                  <span
                    className={`relative z-10 ${option.country_eng_nm === quiz.selected.country_eng_nm && "text-white text-shadow-sm text-shadow-black"} ${quiz.choiceName === option.country_eng_nm && "text-red-500"}`}
                  >
                    {option.country_nm}
                  </span>
                  {option.country_eng_nm === quiz.selected.country_eng_nm && (
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[100%] bg-size-[100%_auto] rounded-md bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${quiz.selected.download_url})`,
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
  // 한자 맞추기
  function renderHanjaQuiz(quiz) {
    return (
      <ul className="mx-4">
        {quiz.map((quiz, quizIdx) => (
          <li className="p-3 pl-10 border-b border-slate-200" key={quizIdx}>
            <div className="relative text-md">
              <div className="relative inline-block w-[40px] text-lg pr-2">
                {quizIdx + 1}
                {quiz.selected.meaning === quiz.choiceName ? (
                  <div className="absolute w-[44px] -bottom-3 -left-4 z-10">
                    <img src={`${answerImage.src}`}></img>
                  </div>
                ) : (
                  <div className="absolute w-[40px] -bottom-1 -left-3 z-10">
                    <img src={`${wrongImage.src}`}></img>
                  </div>
                )}
              </div>
              <span className="text-4xl font-bold text-slate-700">
                {quiz.selected.hanja}
              </span>
              <span className="mx-5">{quiz.selected.meaning}</span>
              {quiz.choiceName !== quiz.selected.meaning && (
                <span className="text-red-500 line-through opacity-80">
                  {quiz.choiceName}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  // 수도 맞추기
  function renderCapitalQuiz(quiz) {
    return (
      <ul className="mx-4">
        {quiz.map((quiz, quizIdx) => (
          <li className="py-4 border-b border-slate-200" key={quizIdx}>
            <div className="mb-2 text-center text-xl underline">
              {quiz.selected.country}
            </div>
            <div className="flex flex-1 justify-between relative items-center">
              <div className="relative w-[50px] text-center">
                {quiz.selected.capital === quiz.choiceName ? (
                  <div className="absolute w-[48px] -bottom-4 -left-1 z-10">
                    <img src={`${answerImage.src}`}></img>
                  </div>
                ) : (
                  <div className="absolute w-[42px] -bottom-2 left-2 z-10">
                    <img src={`${wrongImage.src}`}></img>
                  </div>
                )}
                {quizIdx + 1}
              </div>
              {quiz.shuffled.map((option, optionIdx) => (
                <div
                  className="relative w-[33%] py-4 text-center text-sm"
                  key={optionIdx}
                >
                  <span
                    className={`relative z-10 ${option.country === quiz.selected.country && "text-white text-shadow-sm text-shadow-black"} ${quiz.choiceName === option.capital && "text-red-500"}`}
                  >
                    {option.capital}
                  </span>
                  {option.country === quiz.selected.country && (
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[100%] bg-size-[100%_auto] rounded-md bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${quiz.selected.flag})` }}
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
  // 상식 맞추기
  function renderSenseQuiz(quiz) {
    return (
      <ul className="mx-4">
        {quiz.map((quiz, quizIdx) => (
          <li
            className="p-4 pr-0 sm:pl-10 border-b border-slate-200"
            key={quizIdx}
          >
            <div className="relative text-md">
              <div className="flex items-center">
                <div className="relative inline-block w-[30px] text-lg">
                  {quizIdx + 1}
                  {quiz.selected.answer === quiz.choiceName ? (
                    <div className="absolute w-[44px] -bottom-4 -left-5 z-10">
                      <img src={`${answerImage.src}`}></img>
                    </div>
                  ) : (
                    <div className="absolute w-[40px] -bottom-3 -left-3 z-10">
                      <img src={`${wrongImage.src}`}></img>
                    </div>
                  )}
                </div>
                <span className="text-md font-bold text-slate-700">
                  {quiz.selected.question}
                </span>
              </div>
              <div className="mt-1 pl-[30px]">
                <span className="mr-5">{quiz.selected.answer}</span>
                {quiz.choiceName !== quiz.selected.answer && (
                  <span className="text-red-500 line-through opacity-80">
                    {quiz.choiceName}
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
            10개중 <strong className="text-blue-700">{wrongLength}</strong>개를
            맞췄어요!
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
