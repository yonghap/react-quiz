import { NextResponse } from 'next/server';

// 날짜 받아오기
const getMonth = () => {
	const today = new Date();
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	function formatDate(date) {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 1 더하고 두 자리로!
		const day = date.getDate().toString().padStart(2, '0');         // 일도 두 자리로!

		return `${year}-${month}-${day}`;
	}

	const formattedFirstDay = formatDate(firstDayOfMonth);
	const formattedLastDay = formatDate(lastDayOfMonth);

	return formattedFirstDay + ',' + formattedLastDay;
}

export async function GET(request) {
	try {
		const apiKey = process.env.RAWG_API_KEY;
		const { searchParams } = new URL(request.url);

		let allResults = [];
		let page = 1;
		let hasNext = true;

		while (hasNext) {
			const query = new URLSearchParams({
				key: apiKey,
				page: page,
				page_size: 100,
				ordering: '-added',
				language: 'ko',
				dates: searchParams.get('dates'),
			});

			const res = await fetch(`https://api.rawg.io/api/games?${query}`);
			if (!res.ok) throw new Error('API 요청 실패');
			const data = await res.json();

			// 반환된 데이터에서 results 배열을 가져와 합칩니다
			if (data.results && Array.isArray(data.results)) {
				allResults = [...allResults, ...data.results]; // 배열을 합침
			}

			// 다음 페이지가 있으면 page를 증가시키고, 없으면 종료
			hasNext = data.next !== null;
			page++;

			// 2페이지까지만 가져오기
			if (page > 2) break;
		}
		return NextResponse.json(allResults);
	} catch (error) {
		return NextResponse.json({ error: '데이터를 가져오는 데 실패했습니다.' }, { status: 500 });
	}
}