"use client";

import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import GoNext from "../assets/imgs/nextMonth.svg";
import GoLast from "../assets/imgs/lastMonth.svg";
import { changeDate } from "@/utils/getCalender";
import EventModal from "@/components/main/eventModal";
import EventList from "@/components/main/eventList";
import { useState, useEffect } from "react";
import { getSchedules, deleteSchedules } from "@/apis/schedules";
import { getSchedulesResponseArray } from "@/apis/schedules/type";
import React from "react";

export default function Home() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [, setCurrentDate] = useState<number>(today.getDate());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [dragStartDate, setDragStartDate] = useState<number | null>(null);
  const [dragEndDate, setDragEndDate] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDates, setDragDates] = useState<number[]>([]);
  const [schedules, setSchedules] = useState<getSchedulesResponseArray[]>([]);

  // 이벤트 등록 모달 값들 정리
  const [eventData, setEventData] = useState({
    newEventText: "",
    description: "",
    location: "",
    time: "",
    target: "",
  });

  const monthsInEnglish = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];

  // 일정 조회 api 연동
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await getSchedules();
        setSchedules(data.schedules);
      } catch (error) {
        console.error("일정 조회 오류: ", error);
      }
    };

    fetchSchedules();
  }, []);

  // 일정 삭제 로직
  const handleDeleteKeyClick = async (e: React.KeyboardEvent<HTMLDivElement>, scheduleId: string) => {
    if (e.key === 'Delete' || e.key === "Backspace") {
      try {
        await deleteSchedules(scheduleId);
      } catch (error) {
        console.error(error);
      }
    }
  }

  // 일정의 날짜 범위를 올바르게 계산하는 함수로 수정
  const getEventDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return {
      startDate,
      endDate,
      startDateStr: start,
      endDateStr: end,
    };
  };

  // 모든 일정의 날짜 범위 정보 가져오기
  const eventDateRanges = schedules.map((event) =>
    getEventDateRange(event.start, event.end)
  );

  // weeks는 주 별로 배열을 저장한 변수
  const weeks = changeDate(year, month);

  // 상태 업데이트
  useEffect(() => {
    setCurrentDate(today.getDate());
    setSelectedDate(null);
    setEventData({
      newEventText: "",
      description: "",
      location: "",
      time: "",
      target: "",
    });
  }, [month, year]);

  const getDate = (
    date: number,
    weekIndex: number,
    month: number,
    year: number
  ) => {
    const isPrevMonth = weekIndex === 0 && date > 7;
    const isNextMonth = weekIndex > 3 && date <= 7;
    const isCurrentMonth = !(isPrevMonth || isNextMonth);

    const today = new Date();
    const currentDate = today.getDate();
    const isToday =
      isCurrentMonth &&
      date === currentDate &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear();

    // 날짜 포맷 (YYYY-MM-DD)
    let formattedMonth = month;
    let formattedYear = year;

    // 이전 달의 날짜인 경우
    if (isPrevMonth) {
      formattedMonth = month - 1;
      if (formattedMonth === 0) {
        formattedMonth = 12;
        formattedYear = year - 1;
      }
    }
    // 다음 달의 날짜인 경우
    else if (isNextMonth) {
      formattedMonth = month + 1;
      if (formattedMonth === 13) {
        formattedMonth = 1;
        formattedYear = year + 1;
      }
    }

    const fullDate = `${formattedYear}-${formattedMonth
      .toString()
      .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

    return {
      className: `
        relative w-[100%] h-[100%] pt-[10px] pl-[20px] cursor-pointer border-t border-primary-gray-300
        ${
          isPrevMonth || isNextMonth
            ? "text-primary-gray-400 bg-primary-gray-50 cursor-not-allowed"
            : ""
        }
        ${
          isToday
            ? "z-[100] text-primary-orange-normal bg-primary-orange-light"
            : ""
        }
      `,
      isCurrentMonth,
      fullDate,
    };
  };

  // 다음달로 이동하는 함수
  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // 전 달로 이동하는 함수
  const handleLastMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // 날짜 선택했을 때 쓰이는 함수
  const handleDateClick = (
    date: number,
    weekIndex: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { isCurrentMonth } = getDate(date, weekIndex, month, year);

    if (!isCurrentMonth) {
      event.preventDefault();
      return;
    }

    // 날짜가 선택한 날짜면 그 날짜로 상태 업데이트, 아니면 null
    setSelectedDate(selectedDate === date ? null : date);
    // 여기서도 모달 뜨니까 이벤트 등록 모달 상태 업데이트 시켜줌
    setEventData({
      newEventText: "",
      description: "",
      location: "",
      time: "",
      target: "",
    });

    const rect = (
      event.currentTarget as HTMLDivElement
    ).getBoundingClientRect();

    setModalPosition({
      top: rect.top + window.scrollY - 48,
      left: rect.left + rect.width + 20,
    });

    // 이벤트 버블링 방지
    event.stopPropagation();
  };

  // 이벤트 모달 텍스트들 상태 변경
  const handleEventDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEventData({
      ...eventData,
      [field]: e.target.value,
    });
  };

  // 마우스 드레그 이벤트들 모음
  const handleMouseEvents = (
    date: number,
    weekIndex: number,
    event: React.MouseEvent<HTMLDivElement>,
    action: "down" | "move" | "up"
  ) => {
    const { isCurrentMonth } = getDate(date, weekIndex, month, year);
    if (!isCurrentMonth) return;

    // 마우스 눌렀을때 이벤트
    if (action === "down") {
      setIsDragging(true);
      setDragStartDate(date);
      setSelectedDate(date);
      setDragDates([date]);
      event.stopPropagation();
      // 마우스 움직일때 이벤트
    } else if (action === "move") {
      if (isDragging && dragStartDate !== null) {
        setDragEndDate(date);
        const start = Math.min(dragStartDate, date);
        const end = Math.max(dragStartDate, date);
        const range = Array.from(
          { length: end - start + 1 },
          (_, i) => start + i
        );
        setDragDates(range);
      }
      // 마우스 드래그 끝날 때 이벤트
    } else if (action === "up" && isDragging) {
      setIsDragging(false);

      if (dragStartDate !== null && dragEndDate !== null) {
        // 마우스 업 시 선택된 날짜를 마지막으로 드래그한 날짜로 설정
        setSelectedDate(dragEndDate);

        // 이때 모달이 뜨니까 모달 관련 상태 업데이트 처리
        setEventData({
          newEventText: "",
          description: "",
          location: "",
          time: "",
          target: "",
        });

        const rect = (
          event.currentTarget as HTMLDivElement
        ).getBoundingClientRect();

        setModalPosition({
          top: rect.top + window.scrollY - 48,
          left: rect.left + rect.width + 20,
        });

        event.stopPropagation();
      }

      // 상태 초기화하지 않고 유지
      // setDragStartDate(null);
      // setDragEndDate(null);
    }
  };

  // 특정 날짜에 이벤트가 있는지 확인하는 함수
  const hasEventOnDate = (fullDate: string) => {
    const currentDate = new Date(fullDate);

    return schedules.some((event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  // 특정 날짜의 이벤트 정보를 가져오는 함수
  const getEventsForDate = (fullDate: string) => {
    const currentDate = new Date(fullDate);

    return schedules.filter((event) => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  // 날짜가 이벤트의 첫째 날 또는 주의 첫째 날인지 확인
  const isEventStartOrWeekStart = (
    fullDate: string,
    event: getSchedulesResponseArray
  ) => {
    const currentDate = new Date(fullDate);
    const startDate = new Date(event.start);

    // 이벤트 시작일이거나 월요일(1)인 경우 true 반환
    return (
      currentDate.toDateString() === startDate.toDateString() ||
      (currentDate > startDate && currentDate.getDay() === 1)
    );
  };

  // 해당 날짜부터 이벤트 종료일까지 남은 날짜 수 계산
  const getDaysRemaining = (
    fullDate: string,
    event: getSchedulesResponseArray
  ) => {
    const currentDate = new Date(fullDate);
    const endDate = new Date(event.end);

    // 날짜 차이를 일 단위로 계산 (+1은 당일 포함)
    const diffTime = endDate.getTime() - currentDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // 주의 남은 날짜 수 계산 (현재 요일부터 일요일까지)
  const getDaysRemainingInWeek = (fullDate: string) => {
    const currentDate = new Date(fullDate);
    // 일요일(0)을 기준으로 계산하기 위해 7 - 요일
    return 7 - currentDate.getDay();
  };

  return (
    <div className="flex h-[100vh]" onClick={() => setSelectedDate(null)}>
      <Sidebar className="lg:block hidden" />
      <div className="flex flex-col w-full">
        <div className="flex gap-[40px] h-[20%] items-center">
          <Image
            className="ml-[40px] w-[12px] cursor-pointer"
            src={GoLast}
            alt="<"
            onClick={(e) => {
              e.stopPropagation();
              handleLastMonth();
            }}
          />
          <Image
            className="w-[12px] cursor-pointer"
            src={GoNext}
            alt=">"
            onClick={(e) => {
              e.stopPropagation();
              handleNextMonth();
            }}
          />
          <p className="text-[28px] font-semibold text-primary-orange-normal">
            {monthsInEnglish[month - 1]} {year}
          </p>
        </div>
        <div className="w-full flex">
          <div
            className="w-[76%] grid grid-cols-7 grid-rows-[40px_auto] min-w-[860px]"
            onClick={(e) => e.stopPropagation()}
          >
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="ml-[20px] font-bold text-primary-gray-500 flex items-center"
              >
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((date, dateIndex) => {
                  const { className, isCurrentMonth, fullDate } = getDate(
                    date,
                    weekIndex,
                    month,
                    year
                  );

                  // 해당 날짜의 이벤트 목록 가져오기
                  const dateEvents = getEventsForDate(fullDate);

                  return (
                    <div key={dateIndex} className="relative flex flex-col">
                      <div
                        className={className}
                        onMouseDown={(e) =>
                          handleMouseEvents(date, weekIndex, e, "down")
                        }
                        onMouseMove={(e) =>
                          handleMouseEvents(date, weekIndex, e, "move")
                        }
                        onMouseUp={(e) =>
                          handleMouseEvents(date, weekIndex, e, "up")
                        }
                        onClick={(e) => handleDateClick(date, weekIndex, e)}
                      >
                        <p className="select-none">{date > 0 ? date : ""}</p>
                      </div>

                      {/* 각 이벤트를 날짜에 표시 */}
                      {isCurrentMonth &&
                        dateEvents.map((event, eventIndex) => {
                          // 이벤트의 시작일 또는 주의 시작일인 경우만 바 렌더링
                          if (isEventStartOrWeekStart(fullDate, event)) {
                            const daysRemaining = getDaysRemaining(
                              fullDate,
                              event
                            );
                            const daysInWeek = getDaysRemainingInWeek(fullDate);
                            const barLength = Math.min(
                              daysRemaining,
                              daysInWeek
                            );

                            return (
                              <div
                                key={eventIndex}
                                className="cursor-pointer absolute mt-[40px] z-[100]"
                                style={{
                                  width: `${barLength * 100}%`,
                                  top: `${25 + eventIndex * 25}px`,
                                }}
                                tabIndex={0}
                                onKeyDown={(e) => handleDeleteKeyClick(e, event.id)}
                              >
                                <div className="flex items-center mt-[2px] w-[100%] h-[20px] bg-primary-orange-lightActive rounded-[100px] gap-[6px] pl-[10px]">
                                  <div className="w-[7px] h-[7px] rounded-[100px] bg-primary-orange-normal flex-shrink-0" />
                                  <p className="text-[12px] pr-[10px] truncate select-none">
                                    {event.title}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}

                      {/* 선택된 날짜 또는 드래그 중인 날짜에 대한 표시 */}
                      {dragDates.includes(date) && isCurrentMonth && (
                        <div
                          className="z-[1001] absolute mt-[40px] w-full"
                          style={{
                            top: "0px",
                          }}
                        >
                          <div className="flex items-center mt-[2px] w-[100%] h-[20px] bg-primary-orange-normal rounded-[100px]">
                            <p className="text-[12px] pl-[10px] pr-[10px] text-primary-gray-white truncate select-none">
                              {eventData.newEventText || "New Event"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div
            className="w-[24%] h-[90vh]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDate(null);
            }}
          >
            <EventList selectedMonth={month} />
          </div>
        </div>
      </div>
      {selectedDate && (
        <div
          style={{
            zIndex: "2000",
            position: "absolute",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
          className="z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <EventModal eventData={eventData} onChange={handleEventDataChange} />
        </div>
      )}
    </div>
  );
}
