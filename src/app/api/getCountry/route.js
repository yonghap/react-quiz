import { NextResponse } from 'next/server';

export async function GET(request) {
    try {

      
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const query = new URLSearchParams({
            serviceKey: apiKey,
            pageNo: 1,
            numOfRows: 100,
            returnType: 'JSON'
        });

        console.log("API 요청 URL:", `http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?${query}`);

        const res = await fetch(`http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?${query}`);

        console.log("응답 상태 코드:", res.status);

        if (!res.ok) {
            console.log("API 오류 발생:", await res.text());
            throw new Error(`API 요청 실패 - HTTP 상태 코드: ${res.status}`);
        }

        const data = await res.json();
				const itemsData = data.response.body.items; // `items` 키를 사용하기

				return NextResponse.json(itemsData); // `items` 데이터를 반환
    } catch (error) {
        console.error("API 요청 오류:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}