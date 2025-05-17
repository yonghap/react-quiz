/* 시간별 날씨 */

import * as code from "@/constants/code";
import { getShortRangeDate } from "@/utils/date";
import { setHourlyWeather } from "@/utils/weather";


export async function getCurrentWeather() {
  const queryDate = getShortRangeDate();
  const result = await fetch(
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=hhPRU4TihqC7sGrFL7uNTmty4I7Hng2A57yNkCPaRsb%2BbnlxyetnLDADCFy%2FDh0KshzZmRBEyFO1VEMKNHeuPg%3D%3D&numOfRows=250&pageNo=1&base_date=" +
      queryDate[0] +
      "&base_time=" +
      queryDate[1] +
      "&nx=55&ny=127&dataType=json"
  );
	const json = await result.json();
  return json.response.body.items.item;
}

function setNumber(str: string): number {
  const cutNumber = str.substr(9, 2);
  return Number(cutNumber);
}
function checkNight(sky:number, num: number): string {
  const nightTime = [19, 20, 21, 22, 23, 24, 0, 1, 2, 3, 4, 5, 6];
	return nightTime.includes(num) ? sky + '__night' : sky;
}

export default async function MainHourly() {
  const info = await getCurrentWeather();
  const weatherData = setHourlyWeather(info);
  return (
    <div>
      <div>
        <div>
          <ul className={mainCSS.hourly__list}>
            {Object.keys(weatherData).map((key, index) => (
              <li key={index} className={mainCSS.hourly__listwrap}>
	              <div>
                  <div className={mainCSS.hourly__listtime}>
                    {setNumber(key) + "시"}
                  </div>
                  <div className={mainCSS.hourly__icon}>
	                  <div className={[
											mainCSS.icon__weather,
		                  mainCSS.icon__weather__small,
		                  mainCSS['icon__weather__' + checkNight(weatherData[key].SKY, setNumber(key))]
	                  ].join(' ')}>
		                  {code.SKY_CODE[weatherData['SKY']]}
	                  </div>
                  </div>
                  <div>
                    {weatherData[key].TMP}
                    {code.WEATHER_UNIT["TMP"]}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
