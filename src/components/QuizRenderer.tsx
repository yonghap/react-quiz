"use client";
import React from "react";
import { ShowOptions } from "@/components/ShowOptions";
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

/** -------------------------------
 *  퀴즈 문제 + 보기 렌더링
 *  ------------------------------- */
export const renderQuizByType = (
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
