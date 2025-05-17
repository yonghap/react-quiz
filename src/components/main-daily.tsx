// 메인 일별 날짜 예보
import * as code from "@/constants/code";
import { getLongRangeDate } from "@/utils/date";
import {SKY_CODE_LONG} from "@/constants/code";

// 중기 기온 예보
export async function getMidTaFcst() {
  const queryData = getLongRangeDate();
  const test = await fetch(
    "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=hhPRU4TihqC7sGrFL7uNTmty4I7Hng2A57yNkCPaRsb%2BbnlxyetnLDADCFy%2FDh0KshzZmRBEyFO1VEMKNHeuPg%3D%3D&numOfRows=10&pageNo=1&regId=11B10101&tmFc=" +
      queryData.date +
      "&dataType=json"
  );

  const json = await test.json();
  const data = json.response.body;
	return {
		'taData' : data.items.item[0],
		'fcstDays' : queryData.fcstDays
	};
}
// 중기 육상 예보
async function getMidLandFcst() {
  const queryData = getLongRangeDate();
  const test = await fetch(
    "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=hhPRU4TihqC7sGrFL7uNTmty4I7Hng2A57yNkCPaRsb%2BbnlxyetnLDADCFy%2FDh0KshzZmRBEyFO1VEMKNHeuPg%3D%3D&numOfRows=10&pageNo=1&regId=11B00000&tmFc=" +
	  queryData.date +
      "&dataType=json"
  );

  const json = await test.json();
  const data = json.response.body;
  return {
		'fcstData' : data.items.item[0],
	  'fcstDays' : queryData.fcstDays
  };
}

function translateTaData(obj: object, days : number): object {
	let tempData = [];
	for (const key in obj) {
		if (key.length <= 7 && key !== "regId") {
			var regex = /[^0-9]/g;
			var result = key.replace(regex, "");

			if (key.includes("Min")) {
				tempData[parseInt(result) - days] = [];
				tempData[parseInt(result) - days].push(obj[key]);
			}
			if (key.includes("Max")) {
				tempData[parseInt(result) - days].push(obj[key]);
			}
		}
	}
	return tempData;
}
function translateLandData(obj: object, days : number): object {
  let tempData = [];

  for (const key in obj) {
    if (key.includes("wf")) {
      var regex = /[^0-9]/g;
      var result = key.replace(regex, "");
	    if (key.includes("Am")) {
		    tempData[parseInt(result) - days] = [];
		    tempData[parseInt(result) - days].push(obj[key]);
	    } else if (key.includes("Pm")) {
		    tempData[parseInt(result) - days].push(obj[key]);
	    } else {
		    tempData[parseInt(result) - days] = [];
		    tempData[parseInt(result) - days].push(obj[key]);
	    }
    }
  }
  return tempData;
}
function setDate(days) {
	let week = new Array('일','월','화','수','목','금','토');
	let dateList = [];

	for(let i = days;i <= 10;i++) {
		const nd = new Date();
		const nextDate = new Date(nd.setDate(nd.getDate() + i));
		dateList.push({
			'date' : nextDate.getDate(),
			'day' : week[nextDate.getDay()]
		});
	}

	return dateList;
}

function setNumber(str: string): number {
  const cutNumber = str.substr(9, 2);
  return Number(cutNumber);
}
function checkNight(sky:string): number {
	const weatherText = code.SKY_CODE_LONG[sky];
	return weatherText;
}

export default async function MainHourly() {
  const { taData, fcstDays } = await getMidTaFcst();
  const { fcstData } = await getMidLandFcst();
  const taList = await translateTaData(taData, fcstDays);
  const landList = await translateLandData(fcstData, fcstDays);
	const dataList = setDate(fcstDays);

  return (
    <div>
      <div>
        <div>
          <ul>
            {dataList.map((i, index) => {
              return (
                <li key={index} className={mainCSS.daily__listwrap}>
                  <span className={mainCSS.daily__listday}>
                    {i.date}일
	                  <span className={mainCSS.daily__textday}>
		                  ({i.day})
	                  </span>
                  </span>
                  <div>
	                  <div className={[
		                  mainCSS.icon__weather,
		                  mainCSS.icon__weather__small,
		                  mainCSS['icon__weather__' + checkNight(landList[index][0])]
	                  ].join(' ')}>
	                  </div>
	                  { landList[index][1] !== undefined &&
		                  <div className={[
		                  mainCSS.icon__weather__bar,
		                  mainCSS.icon__weather,
		                  mainCSS.icon__weather__small,
		                  mainCSS['icon__weather__' + checkNight(landList[index][1])]
		                  ].join(' ')}>
		                  </div>
										}
                  </div>
                  <span className={mainCSS.daily__listtemp}>
	                  <span className={commonCSS.blue}>
		                  {taList[index][0]}{code.WEATHER_UNIT["TMP"]}
	                  </span>
	                  <small className={commonCSS.bar}>/</small>
	                  <span className={commonCSS.red}>
		                  {taList[index][1]}{code.WEATHER_UNIT["TMP"]}
	                  </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
