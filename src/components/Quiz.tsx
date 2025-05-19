'use client';
import { useQuery } from '@tanstack/react-query';

// 데이터 받아오기
async function fetchData() {
	const result = await fetch(`/api/getCountry`);
	if (!result.ok) throw new Error('국가 정보 로딩 실패');
	const data = await result.json();
	return data;
}

function setQuiz(data) {
	console.log(data);
}

export default function Quiz() {
	const { data, error, isLoading } = useQuery({
		queryKey : ['country'],
		queryFn : () => fetchData(),
	});
	if (isLoading) return <p>로딩 중...</p>;
	if (error) return <p>에러 발생: {(error as Error).message}</p>;
	setQuiz(data);
	return (
		<div>
			test
		</div>
	)
}