type countryQuizItem = {
	"content_ty": string,
	"country_eng_nm": string,
	"country_iso_alp2": string,
	"country_nm": string,
	"download_url": string,
	"origin_file_nm": string,
}

/**
 * 전체 퀴즈 데이터 중 정답과 보기 3개 추출
 * @param {code} url 감정 날씨 번호,
 * @param {count} url 감정 날씨 수정 횟수
 */
export function generateMultipleQuiz(data:countryQuizItem[]) : { selected: countryQuizItem, shuffled: countryQuizItem[] } {
	// 정답과 보기
	const selected = data[Math.floor(Math.random() * data.length)];
	const sampled: Set<countryQuizItem> = new Set([selected]);

	// 보기로 쓸 나라 2개 추출
	while (sampled.size < 3) {
    sampled.add(data[Math.floor(Math.random() * data.length)]);
	}

	// 랜덤하게 섞기
	const shuffled = [...sampled].sort(() => Math.random() - 0.5);

	return { selected, shuffled }
}