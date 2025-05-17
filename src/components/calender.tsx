// Calendar.js
import React, { useState } from 'react';
import { convertSlugToPlatform } from "@/utils/common";

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({ eventMap }) => {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const prevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};

	const nextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};

	const prevMonthLastDay = new Date(year, month, 0).getDate(); // 이전 달의 마지막 날짜
	const firstDay = new Date(year, month, 1).getDay(); // 이번 달의 첫째 날 (요일)
	const daysInMonth = new Date(year, month + 1, 0).getDate(); // 이번 달의 총 날짜 수

	const dates = [];

// 🔹 **이전 달의 마지막 며칠 추가**
	for (let i = firstDay - 1; i >= 0; i--) {
		dates.push({
			date: prevMonthLastDay - i,
			text: `${year}-${(month).toString().padStart(2, "0")}-${(prevMonthLastDay - i).toString().padStart(2, "0")}`,
			isPrevMonth: true,
		});
	}

// 🔹 **이번 달 날짜 추가**
	for (let d = 1; d <= daysInMonth; d++) {
		dates.push({
			date: d,
			text: `${year}-${(month + 1).toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`,
			isCurrentMonth: true,
		});
	}

// 🔹 **다음 달의 첫 며칠 추가 (총 42칸 맞추기)**
	const totalDays = 42; // 달력은 일반적으로 6주(6x7=42칸)로 구성됨
	const remainingDays = totalDays - dates.length; // 남은 칸 계산

	for (let i = 1; i <= remainingDays; i++) {
		dates.push({
			date: i,
			text: `${year}-${(month + 2).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`,
			isNextMonth: true,
		});
	}

	return (
		<div>
			<div className="text-center flex justify-center text-slate-50">
				<button onClick={prevMonth}>◀</button>
				<h2 className="mx-6 text-3xl">{year} - {month + 1}</h2>
				<button onClick={nextMonth}>▶</button>
			</div>
			<div className="grid grid-cols-[repeat(7,1fr)] mt-4">
				{DAYS.map(day => (
					<div key={day} className="text-slate-200 font-bold py-6 text-center text-2xl">
						{day}
					</div>
				))}
				{dates.map((date, idx) => {
					const dayEvents = eventMap.get(date.text) || []
					const maxVisible = 3;
					const visibleEvents = dayEvents.slice(0, maxVisible);
					const extraCount = dayEvents.length - maxVisible;
					return (
						<div
							key={idx}
							className={`overflow-hidden m-1 mb-4 pb-4 rounded-sm ${
								date.isPrevMonth || date.isNextMonth ? "text-gray-400" : "text-black"
							}`}
						>
							<div >
								<strong className={`block px-2 text-md bg-gradient-to-r from-slate-50 to-slate-300 ${
									(date.isPrevMonth || date.isNextMonth) && "opacity-30"
									}`}
								>
									{date['date']}
								</strong>
								<div>
									{visibleEvents.map((event) => {
										console.log(event.platforms);
										return (
										<div key={event.id} className="relative mb-2 text-xs">
											<div className="w-full pt-[60%] opacity-70 rounded-b-sm shadow-md" style={{
												background: `url(${event.background_image}) no-repeat 50% 50%`,
												backgroundSize: 'cover',
											}}/>
											<div className="absolute bottom-1 left-1 text-sm text-slate-50 p-2 font-semibold leading-4">
												<h2 className="text-base leading-none">
													{event.name}
												</h2>
												<div className="mt-1">
													{event.platforms?.map((platform, index) => (
														convertSlugToPlatform(platform.platform.slug) &&
														<span className={`badge badge--${convertSlugToPlatform(platform.platform.slug)}`} key={index}>
                              {convertSlugToPlatform(platform.platform.slug)}
                            </span>
													))}
												</div>
											</div>
										</div>
										)
									})}
									{extraCount > 0 && (
										<div className="event-more mt-2 text-3xl text-slate-100 text-center opacity-70">+</div>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Calendar;