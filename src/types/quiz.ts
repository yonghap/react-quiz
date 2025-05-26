// 나라 맞추기 퀴즈
export type countryQuizItem = {
	content_ty: string,
	country_eng_nm: string,
	country_iso_alp2 : string,
	country_nm : string,
	download_url : string,
	origin_file_nm : string,
}
export type countryQuizResult = {
  selected : countryQuizItem,
  shuffled : countryQuizItem[],
  choiceName : string
}