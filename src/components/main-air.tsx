// 메인 기본 정보 컴포넌트
import * as code from "@/constants/code";
import * as icon_weather from "@/assets/images/icon_weather/index";
import { QueryClient } from "@tanstack/react-query";
import { getAirDate } from "@/utils/date";


export async function getCurrentWeather() {
  const queryDate = getAirDate();
  const test = await fetch(
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=hhPRU4TihqC7sGrFL7uNTmty4I7Hng2A57yNkCPaRsb%2BbnlxyetnLDADCFy%2FDh0KshzZmRBEyFO1VEMKNHeuPg%3D%3D&returnType=json&numOfRows=10&pageNo=1&searchDate=" +
	  queryDate +
      "&InformCode=PM10"
  );
  const json = await test.json();
  const data = json.response.body;
  return data.items;
}

function translateData(arr: Array<object>): object {
  let pm10 = {}, pm25 = {};

	arr.forEach((i,index) => {
		if (!pm10.hasOwnProperty(i.informData) && i.informCode === 'PM10') {
			pm10[i.informData] = setAir(i.informGrade);
		}
		if (!pm25.hasOwnProperty(i.informData) && i.informCode === 'PM25') {
			pm25[i.informData] = setAir(i.informGrade);
		}
	});

	return {
		'PM10' : pm10,
		'PM25' : pm25
	}
}

function setNumber(str: string): number {
  const cutNumber = str.substr(8, 2);
  return Number(cutNumber);
}
function checkNight(num: number): boolean {
  const nightTime = [19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6];
  return nightTime.includes(num);
}
function setAir(info: string): string {
  const airList = info.split(",");
  const airStats = airList[0].split(":");
  return airStats[1].replace(" ","");
}

export default async function MainHourly() {
  const info = await getCurrentWeather();

  const { PM10, PM25 } = await translateData(info);

  return (
    <div>
      <div>
        <div className={mainCSS.air__wrap}>
	        <div className={mainCSS.air__box}>
		        <h2 className={mainCSS.air__title}>
			        미세먼지
		        </h2>
            <ul className={mainCSS.air__list}>
	          {Object.keys(PM10).map((key, index) => (
		          <li key={index}>
			          <div className={mainCSS.air__date}>
			            {setNumber(key) + '일'}
			          </div>
			          <div className={mainCSS.air__status}>
				          <div className={[
					          mainCSS.icon__air,
					          mainCSS['icon__air__' + code.AIR_CODE[PM10[key]]]
				          ].join(' ')}>
					          {PM10[key]}
				          </div>
			          </div>
		          </li>
	          ))}
          </ul>
	        </div>
	        <div className={mainCSS.air__box}>
		        <h2 className={mainCSS.air__title}>
			        초미세먼지
		        </h2>
	          <ul className={mainCSS.air__list}>
		        {Object.keys(PM25).map((key, index) => (
			        <li key={index}>
				        <div className={mainCSS.air__date}>
					        {setNumber(key) + '일'}
				        </div>
				        <div className={mainCSS.air__status}>
					        <div className={[
						        mainCSS.icon__air,
						        mainCSS['icon__air__' + code.AIR_CODE[PM25[key]]]
					        ].join(' ')}>
					          {PM25[key]}
					        </div>
				        </div>
			        </li>
		        ))}
	        </ul>
	        </div>
        </div>
      </div>
    </div>
  );
}
