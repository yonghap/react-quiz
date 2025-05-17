// 오늘 날짜 구하기
const getToday = (): string => {
  const today = new Date();
  return (
    today.getFullYear() +
    ("0" + (1 + today.getMonth())).slice(-2) +
    ("0" + today.getDate()).slice(-2)
  );
};

// 0 문자열 추가(날짜)
const addZeroDate = (num: number): string => {
  return ("00" + num.toString()).slice(-2);
};

// 0 문자열 추가(시간)
const addZeroTime = (num: number): string => {
  return ("00" + num.toString()).slice(-2) + "00";
};

// 초단기 예보 시간 날짜/시간 구하기
export const getShortestRangeDate = (): Array<string> => {
  // 현재 시간에서 -30분
  const today = new Date();
  const foreCastTime = new Date(today.setMinutes(today.getMinutes() - 30));
  const currentHours = foreCastTime.getHours();
  const currentMinutes = foreCastTime.getMinutes();
  return [
    foreCastTime.getFullYear() +
      ("0" + (1 + foreCastTime.getMonth())).slice(-2) +
      ("0" + foreCastTime.getDate()).slice(-2),
    addZeroDate(currentHours) + addZeroDate(currentMinutes),
  ];
};

// 단기 예보 시간 날짜/시간 구하기
export const getShortRangeDate = (): Array<string> => {
  const today = new Date();
  const yesterDayDate = new Date(today.setDate(today.getDate() - 1));
  const currentHours = today.getHours();
  const currentMinutes = today.getMinutes();
  const forecastTimes = [2, 5, 8, 11, 14, 17, 20, 23];
  const isCurrentAPI = currentMinutes >= 15 ?? false;
  const isYesterDay = currentHours <= 1;

  if (isYesterDay) {
    return [
      yesterDayDate.getFullYear() +
        ("0" + (1 + yesterDayDate.getMonth())).slice(-2) +
        addZeroDate(yesterDayDate.getDate()),
      "2300",
    ];
  } else {
    for (let i = 0; i < forecastTimes.length; i++) {
      if (currentHours === forecastTimes[i]) {
        if (isCurrentAPI) {
          return [getToday(), addZeroTime(forecastTimes[i])];
        } else {
          if (currentHours === 2) {
            return [
              yesterDayDate.getFullYear() +
                ("0" + (1 + yesterDayDate.getMonth())).slice(-2) +
                addZeroDate(yesterDayDate.getDate()),
              "2300",
            ];
          } else {
	          return [getToday(), addZeroTime(forecastTimes[i - 1])];;
          }
        }
      } else if (currentHours < forecastTimes[i]) {
        return [getToday(), addZeroTime(forecastTimes[i - 1])];
      }
    }
  }
};

// 중기 예보 시간 날짜/시간 구하기
export const getLongRangeDate = (): Object => {
  const today = new Date();
  const yesterDayDate = new Date();
  yesterDayDate.setDate(today.getDate() - 1);
  const currentHours = today.getHours();
  const currentMinutes = today.getMinutes();
  const currentTime =
    currentHours < 6 ? "yesterday" : currentHours < 18 ? "day" : "night";
  switch (currentTime) {
    case "yesterday":
      return {
	      'date' : yesterDayDate.getFullYear() +
		      ("0" + (1 + yesterDayDate.getMonth())).slice(-2) +
		      addZeroDate(yesterDayDate.getDate()) +
		      "1800",
	      'fcstDays' : 5
      }
      break;
    case "day":
      return {
	      'date' : today.getFullYear() +
		      ("0" + (1 + today.getMonth())).slice(-2) +
		      addZeroDate(today.getDate()) +
		      "0600",
	      'fcstDays' : 4
      };
      break;
    case "night":
      return {
	      'date' : today.getFullYear() +
		      ("0" + (1 + today.getMonth())).slice(-2) +
		      addZeroDate(today.getDate()) +
		      "1800",
	      'fcstDays' : 5
      }
      break;
  }
};

// 중기 예보 시간 날짜/시간 구하기
export const getAirDate = (): string => {
	var date = new Date(), newDate;

	if (date.getHours() < 6) {
		newDate = new Date(date.setDate(date.getDate() - 1));
	} else {
		newDate = date;
	}
	var year = newDate.getFullYear();
	var month = ("0" + (1 + newDate.getMonth())).slice(-2);
	var day = ("0" + newDate.getDate()).slice(-2);

	return year + "-" + month + "-" + day;
}