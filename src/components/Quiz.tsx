'use client';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter  } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateMultipleQuiz } from 'src/utils/common';
import { COMMON_CODE } from 'src/constants/code';

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
 * 다음 퀴즈로 이동
 */
export default function Quiz() {
	const router = useRouter();
	// 퀴즈 데이터 상태 추가
	const [quizIndex , setQuizIndex] = useState(1); // 현재 퀴즈 번호
	const [allQuizData, setAllQuizData] = useState<QuizItem[] | null>(null) // 모든 퀴즈 데이터
	const [quizData, setCurrentQuizData] = useState<{ selected: QuizItem, shuffled: QuizItem[] } | null>(null) // 현재 퀴즈 데이터
	const [oldQuizData, setOldQuizData] = useState([])

	// 퀴즈 데이터 가져오기
	const { data, error, isLoading } = useQuery({
		queryKey : ['country'],
		queryFn : () => fetchData(),
	});	

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setAllQuizData(data);
			setCurrentQuizData(generateMultipleQuiz(data));
		}
	}, [data]);

	if (isLoading) return <p>로딩 중...</p>;
	if (error) return <p>에러 발생: {(error as Error).message}</p>;
	if (!quizData) return <p>퀴즈 데이터를 불러오는 중...</p>;

	function handleClick(idx:number):void {
		const resultData = {
			...quizData,
			resultNumber : idx
		}
		setOldQuizData([...oldQuizData, resultData])
		if (quizIndex === COMMON_CODE.QUIZ_COUNT) {
			alert('퀴즈가 종료 되었습니다.');
			router.push('/quiz/result')
			return;
		} else {
			setCurrentQuizData(generateMultipleQuiz(allQuizData))
			setQuizIndex(quizIndex+1)
		}
	}

	return (
		<div>
			<div className="p-4 text-center text-gray-500">
				<div className="mb-2 text-xs">
					<strong>{quizIndex}</strong> / {COMMON_CODE.QUIZ_COUNT}
				</div>
				<div className="mb-8 pt-[55%] bg-size-[100%_100%] border border-slate-200" style={{ backgroundImage: `url(${quizData.selected.download_url})` }} />
				<ul>
					{quizData.shuffled.map((i, idx) => {
						return (
							<div key={i.country_eng_nm}>
								<button type="button" className={`block w-full my-4 text-2xl text-center ${quizData.selected.country_eng_nm === i.country_eng_nm ? 'text-red-500' : ''}`} onClick={() => handleClick(idx)}>
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