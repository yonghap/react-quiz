import { useQuery } from "@tanstack/react-query";

const fetchMainInfo = async () => {
  // 오늘 날짜 구하기 0000
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const setDate =
    ("00" + month.toString()).slice(-2) + ("00" + day.toString()).slice(-2);

  console.log("&&&");

  const response = await fetch(
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=hhPRU4TihqC7sGrFL7uNTmty4I7Hng2A57yNkCPaRsb%2BbnlxyetnLDADCFy%2FDh0KshzZmRBEyFO1VEMKNHeuPg%3D%3D&numOfRows=10&pageNo=1&base_date=20250120&base_time=0500&nx=55&ny=127&dataType=json";
	const json = await response.json();
	const data = json.response.body;
	return data.items.item;
};

const useMainInfo = () => {
	return useQuery({
		queryKey: ['mainInfo'],
		queryFn: () => fetchMainInfo(),
	})
}

export { useMainInfo, fetchMainInfo }