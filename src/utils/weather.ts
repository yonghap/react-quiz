// 오늘 날짜 구하기
import * as code from "@/constants/code";

const setPtyValue = (val : string)  : string => {
	const newValue = Number(val) + 4;
	return newValue.toString();
}

export const setCurrentWeather = (data : Array<object>) : object => {
	const t1h = data.find(i => i.category === 'T1H');
	const sky = data.find(i => i.category === 'SKY');
	const pty = data.find(i => i.category === 'PTY');

	if (pty.fcstValue === '0') {
		return {
			'T1H' : t1h.fcstValue,
			'SKY' : sky.fcstValue
		}
	} else {
		return {
			'T1H' : t1h.fcstValue,
			'SKY' : setPtyValue(pty.fcstValue)
		}
	}
}

export const setHourlyWeather = (data: Array<string>) : object => {
	let returnData = new Object();
	const lastIndex = data.reduce((acc, cur, idx) => {
		if (cur["category"] === "SKY") {
			acc = idx;
		}
		return acc;
	}, null);

	for(let i = 12;i <= lastIndex; i++) {
		if (data[i].category === "TMP") {
			returnData[data[i].fcstDate + "_" + data[i].fcstTime] = {
				DATE: data[i].fcstDate,
				TMP: data[i].fcstValue,
			};
		}
		if (data[i].category === "SKY") {
			returnData[data[i].fcstDate + "_" + data[i].fcstTime]["SKY"] = data[i].fcstValue;
		}
		if (data[i].category === "PTY" && data[i].fcstValue !== '0') {
			returnData[data[i].fcstDate + "_" + data[i].fcstTime]["SKY"] = setPtyValue(data[i].fcstValue);
		}
	}
	return returnData;
}