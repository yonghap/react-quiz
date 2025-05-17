/* 현재 날씨 */
'use client';

import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/utils/common';
import Calendar from '@/components/calender';

async function fetchData() {
	const params = new URLSearchParams({
		dates: '2025-05-01,2025-05-31'
	});
	const result = await fetch(`/api/topSellers?${params}`);
	if (!result.ok) throw new Error('인기 게임 목록 요청 실패');
	const data = await result.json();
	return data || [];
}
const groupEventsByDate = (events) => {
	const map = new Map();

	events.forEach((event) => {
		const date = event.released; // 예: '2025-05-07'
		if (!map.has(date)) {
			map.set(date, []);
		}
		map.get(date).push(event);
	});

	return map;
};
export default function MainInfo() {
	const { data, error, isLoading } = useQuery({
		queryKey : ['user'],
		queryFn : () => fetchData(),
	});
	if (isLoading) return <p>로딩 중...</p>;
	if (error) return <p>에러 발생: {(error as Error).message}</p>;
	const eventMap = groupEventsByDate(data);
	console.log(data);
  return (
		<div className="max-w-[90%] m-auto">
			<div>
				<Calendar eventMap={eventMap}></Calendar>
			</div>
		</div>
	);
}