import { countryQuizItem, hanjaQuizItem } from '@/types/quiz';
type QuizItem = countryQuizItem | hanjaQuizItem;

export function generateMultipleQuiz(data: QuizItem[]): { selected: QuizItem, shuffled: QuizItem[] } {
	// 정답과 보기
	const selected = data[Math.floor(Math.random() * data.length)];
	const sampled = new Set<countryQuizItem | hanjaQuizItem>([selected as countryQuizItem | hanjaQuizItem]);

	// 보기로 쓸 나라 2개 추출
	while (sampled.size < 3) {
    sampled.add(data[Math.floor(Math.random() * data.length)]);
	}

	// 랜덤하게 섞기
	const shuffled = [...sampled].sort(() => Math.random() - 0.5);
	return { selected, shuffled }
}