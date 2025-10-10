/**
 * ===========================
 * 공통 타입 정의 (Quiz Types)
 * ===========================
 */

/** 나라 맞추기 퀴즈 */
export type CountryQuizItem = {
  content_ty: string;
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  download_url: string;
  origin_file_nm: string;
};

export type CountryQuizResult = {
  selected: CountryQuizItem;
  shuffled: CountryQuizItem[];
  choiceName: string;
};

/** 한자 퀴즈 */
export type HanjaQuizItem = {
  main_sound: string;
  level: string;
  hanja: string;
  meaning: string;
  radical: string;
  strokes: number;
  total_strokes: number;
};



export type HanjaQuizResult = {
  selected: HanjaQuizItem;
  shuffled: HanjaQuizItem[];
  choiceName: string;
};

/** 수도 맞추기 퀴즈 */
export type CapitalQuizItem = {
  country: string;
  capital: string;
  flag: string;
};

export type CapitalQuizResult = {
  selected: CapitalQuizItem;
  shuffled: CapitalQuizItem[];
  choiceName: string;
};

/** 상식 퀴즈 */
export type SenseQuizItem = {
  question: string;
  options: string[];
  answer: string;
};

export type SenseQuizResult = {
  selected: SenseQuizItem;
  shuffled?: never; // 상식 퀴즈는 옵션이 이미 selected 안에 포함됨
  choiceName: string;
};

/**
 * ===========================
 * 통합 타입
 * ===========================
 */

/** 모든 퀴즈 아이템의 유니언 타입 */
export type QuizItem =
  | CountryQuizItem
  | HanjaQuizItem
  | CapitalQuizItem
  | SenseQuizItem;

/** 모든 퀴즈 결과 타입의 유니언 */
export type QuizResult =
  | CountryQuizResult
  | HanjaQuizResult
  | CapitalQuizResult
  | SenseQuizResult;

/** 퀴즈 이름(파일명) */
export type QuizName = 'country' | 'hanja' | 'capital' | 'sense';

/**
 * 제너릭 퀴즈 데이터 구조 (공통 사용)
 * 예: generateMultipleQuiz<T>() → QuizData<T> 형태 반환
 */
export type QuizData<T> = {
  selected: T;
  shuffled: T[];
};

/**
 * 선택된 답안과 함께 저장되는 형태 (스토어에 저장용)
 */
export type QuizWithChoice<T> = QuizData<T> & {
  choiceName: string;
};

