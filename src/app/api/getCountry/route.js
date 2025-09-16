import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
      
			const apiKey = process.env.NEXT_PUBLIC_API_KEY;
			let allResults = [], page = 1;

			while(page < 4) {
				const query = new URLSearchParams({
						serviceKey: apiKey,
						pageNo: page,
						numOfRows: 100,
						returnType: 'JSON'
				});

				const res = await fetch(`http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?${query}`);
				if (!res.ok) {
						console.log("API 오류 발생:", await res.text());
						throw new Error(`API 요청 실패 - HTTP 상태 코드: ${res.status}`);
				}
				const data = await res.json();

				if (data.response.body.items.item && Array.isArray(data.response.body.items.item)) {
					allResults = [...allResults, ...data.response.body.items.item]
				}
				page++;
			}
			return NextResponse.json(allResults);
    } catch (error) {
        console.error("API 요청 오류:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}