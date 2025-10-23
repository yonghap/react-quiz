"use client";
import React from "react";

/** -------------------------------
 *  공통 퀴즈 옵션 렌더링 컴포넌트
 *  ------------------------------- */
export type QuizOptionsProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (value: string) => void;
};

export const ShowOptions = <T,>({
  items,
  getLabel,
  onSelect,
}: QuizOptionsProps<T>) => {
  return (
    <ul className="px-5 text-center">
      {items.map((item, index) => (
        <li key={index}>
          <button
            className="w-full block py-2 my-5 text-xl text-center bg-slate-100 border border-slate-300 rounded-md shadow-md cursor-pointer active:bg-blue-100"
            onClick={() => onSelect(getLabel(item))}
          >
            {getLabel(item)}
          </button>
        </li>
      ))}
    </ul>
  );
};
