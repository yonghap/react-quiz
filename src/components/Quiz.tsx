'use client';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';

// 데이터 받아오기
async function fetchData() {
	const result = await fetch(`/api/getCountry`);
	if (!result.ok) throw new Error('국가 정보 로딩 실패');
	const data = await result.json();
	return data;
}

type QuizItem = {
	"content_ty": string,
	"country_eng_nm": string,
	"country_iso_alp2": string,
	"country_nm": string,
	"download_url": string,
	"origin_file_nm": string,
}

/**
 * 배열 데이터로 정답과 보기3개 추출
 */
function setMultipleQuiz(data: QuizItem[]): { selected: QuizItem, shuffled: QuizItem[] } {
	// 정답과 보기
	const selected = data[Math.floor(Math.random() * data.length)];
	const sampled: Set<QuizItem> = new Set([selected]);

	// 보기로 쓸 나라 2개 추출
	while (sampled.size < 3) {
    sampled.add(data[Math.floor(Math.random() * data.length)]);
	}

	// 랜덤하게 섞기
	const shuffled = [...sampled].sort(() => Math.random() - 0.5);

	return { selected, shuffled }
}

/**
 * 다음 퀴즈로 이동
 */
export default function Quiz() {
	// 퀴즈 데이터 상태 추가
	const [allQuizData, setAllQuizData] = useState<QuizItem[] | null>(null)
	const [quizData, setCurrentQuizData] = useState<{ selected: QuizItem, shuffled: QuizItem[] } | null>(null)

	// 퀴즈 데이터 가져오기
	const { data, error, isLoading } = useQuery({
		queryKey : ['country'],
		queryFn : () => fetchData(),
	});	

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setAllQuizData(data);
			setCurrentQuizData(setMultipleQuiz(data));
		}
	}, [data]);

	if (isLoading) return <p>로딩 중...</p>;
	if (error) return <p>에러 발생: {(error as Error).message}</p>;
	if (!quizData) return <p>퀴즈 데이터를 불러오는 중...</p>;

	function handleClick() {
		setCurrentQuizData(setMultipleQuiz(allQuizData))
	}

	return (
		<div>
			<div className="p-4 text-center">				
				<div className="mb-8 pt-[55%] bg-size-[100%_100%]" style={{ backgroundImage: `url(${quizData.selected.download_url})` }} />
				<ul>
					{quizData.shuffled.map((i) => {
						return (
							<div key={i.country_eng_nm}>
								<button type="button" className={`block w-full my-4 text-2xl text-center ${quizData.selected.country_eng_nm === i.country_eng_nm ? 'text-red-500' : ''}`} onClick={handleClick}>
									{i.country_nm}
								</button>
							</div>
						)
					})}
				</ul>
			</div>
		</div>
	)
}