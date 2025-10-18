import { QuizName, QuizDataMap } from "@/types/quiz";

export const fileMap: Record<QuizName, string> = {
  hanja: "hanja.json",
  capital: "capital.json",
  sense: "sense.json",
  country: "country.json",
};

export async function fetchData<T extends QuizName>(
  name: T
): Promise<QuizDataMap[T]> {
  const file = fileMap[name];
  const res = await fetch(`/assets/${file}`);
  if (!res.ok) throw new Error(`${file} 로딩 실패`);
  const data = await res.json();
  return data.data;
}
