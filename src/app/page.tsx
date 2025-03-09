"use client"

import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import GoNext from "../assets/imgs/nextMonth.svg";
import GoLast from "../assets/imgs/lastMonth.svg";
import { changeDate } from "@/utils/getCalender";
import EventModal from "@/components/main/eventModal";
import EventList from "@/components/main/eventList";
import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [, setCurrentDate] = useState<number>(today.getDate());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [dragStartDate, setDragStartDate] = useState<number | null>(null);
  const [dragEndDate, setDragEndDate] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDates, setDragDates] = useState<number[]>([]);

  // 이벤트 등록 모달 값들 정리
  const [eventData, setEventData] = useState({
    newEventText: "",
    description: "",
    location: "",
    time: "",
    target: "",
  });

  const monthsInEnglish = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  const sampleEventData = [
    {
      start: "2025-03-05", end: "2025-03-14", title: "금연예방교육" 
    },
    {
      start: "2025-04-22", end: "2025-04-29", title: "오늘 저녁 뭐지"
    },
  ]

  // 일단은 필요 없을 듯
  // interface eventDateListDatum {
  //   starteDate : string,
  //   endDate: string
  // }

  // sampleEventData 사용 시 필요
  // 
  // const getEventDateList = (start: string, end: string) => {
  //   const startDate = new Date(start);
  //   const endDate = new Date(end);
  //   const eventDates: eventDateListDatum = {
  //     starteDate: `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
  //                 .toString()
  //                 .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
  //     endDate: `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
  //                 .toString()
  //                 .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`,
  //   };
  //   return eventDates;
  // };

  const getEventDateList = (start: string, end: string) => {
    return {starteDate: start, endDate: end}
  }

  // sampleEventData에서 시작날짜, 끝날짜 받아와서 eventDateList에 저장
  const eventDateList = sampleEventData.flatMap(event => 
    getEventDateList(event.start, event.end)
  );

  // weeks는 주 별로 배열을 저장한 변수
  const weeks = changeDate(year, month);
  
  // 상태 업데이트 그냥 해주는건데
  // 오늘 요일로 업데이트해주고 선택된 날짜 없을때 초기화 시켜주고 이벤트 모달 글자들 인풋 기준으로 업데이트
  useEffect(() => {
    const today = new Date();
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

  // 
  const getDate = (date: number, weekIndex: number, month: number, year: number) => {
    // 저번달일 경우의 날짜는 어짜피 7일보다 클 수 밖에 없음
    const isPrevMonth = weekIndex === 0 && date > 7;
    // 다음달일 경우의 날짜는 7일 이하
    const isNextMonth = weekIndex > 3 && date <= 7;
    const isCurrentMonth = !(isPrevMonth || isNextMonth);

    const today = new Date()
    const currentDate = today.getDate();
    const isToday =
      isCurrentMonth &&
      date === currentDate &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear();

    // padStart로 3월 2일일때 03-02로 표시되는 날짜 형식을 맞춰둠
    // fullDate 변수는 그 달의 날짜를 모두 저 형식으로 띄워줌
    const fullDate = `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`

    return {
      className: `
        relative w-[100%] h-[100%] pt-[10px] pl-[20px] cursor-pointer border-t border-primary-gray-300
        ${isPrevMonth || isNextMonth ? "text-primary-gray-400 bg-primary-gray-50 cursor-not-allowed" : ""}
        ${isToday ? "z-[100] text-primary-orange-normal bg-primary-orange-light" : ""}
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
  const handleDateClick = (date: number, weekIndex: number, event: React.MouseEvent<HTMLDivElement>) => {
    const { isCurrentMonth } = getDate(date, weekIndex, month, year);

    // 일단 이번달이 아니면 이벤트 못하게 막아둠
    if (!isCurrentMonth) {
      event.preventDefault(); 
      return;
    }

    // 날짜가 선택한 날짜면 그 날짜로 상태 업데이트, 아니면 null
    setSelectedDate(date === selectedDate ? date : null);
    // 여기서도 모달 뜨니까 이벤트 등록 모달 상태 업데이트 시켜줌
    setEventData({
      newEventText: "",
      description: "",
      location: "",
      time: "",
      target: "",
    });
  
    // 🧯🧯🧯 이부분 바꿔야함, 여기서 모달을 내 마우스가 끝난 위치랑 맞춰둬서 위에서 시작하면 그만큼 위에 모달이 뜸 🧯🧯🧯
    if (event.target) {
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      setModalPosition({
        top: rect.top + rect.height - 155,
        left: rect.left + 150,
      });
    }
  };
  
  // 이벤트 모달 텍스트들 상태 변경
  const handleEventDataChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEventData({
      ...eventData,
      [field]: e.target.value,
    });
  };

// 마우스 드레그 이벤트들 모음..!
  const handleMouseEvents = (date: number, weekIndex: number, event: React.MouseEvent<HTMLDivElement>, action: "down" | "move" | "up") => {
    const { isCurrentMonth } = getDate(date, weekIndex, month, year);
    if (!isCurrentMonth) return;
  
    // 마우스 눌렀을때 이벤트
    // isDragging true로 바구고 드레그 시작일자랑 선택일자 업데이트해주고 드레그된 날짜 모아놓는 배열에 날짜 넣어둠
    if (action === "down") {
      setIsDragging(true);
      setDragStartDate(date);
      setSelectedDate(date); 
      setDragDates([date]);
    // 마우스 움직일때 이벤트
    } else if (action === "move") {
      if (dragStartDate !== null) {
        setDragEndDate(date);
        // end랑 start는 math.min이랑 math.max써서 드레그 첫번째 날짜랑 끝내는 날짜 받아와서 저장
        const start = Math.min(dragStartDate, date);
        const end = Math.max(dragStartDate, date);
        // range는 start가 3이고 end가 7이면 7-3+1 = 5가 length가 되는거임
        // 첫번째 매개변수는 필요없어서 무시하고 i가 0부터 4까지 증가 -> [3, 4, 5, 6, 7]
        const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);

        setDragDates(range);
      }
    // 마우스 드래그 끝날 때 이벤트
    } else if (action === "up" && isDragging) {
      // 우선 isDragging false로 바꿔주고
      setIsDragging(false);
  
      if (dragStartDate !== null && dragEndDate !== null) {
        // 이때 모달이 뜨니까 모달 관련 상태 업데이트 처리
        setEventData({
          newEventText: "",
          description: "",
          location: "",
          time: "",
          target: "",
        });

         // 🧯🧯🧯 이부분 바꿔야함, 여기서 모달을 내 마우스가 끝난 위치랑 맞춰둬서 위에서 시작하면 그만큼 위에 모달이 뜸 🧯🧯🧯
        const rect = (event.target as HTMLDivElement).getBoundingClientRect();
        setModalPosition({
          top: rect.top + rect.height - 155,
          left: rect.left + 150,
        });
      }
      // 상태 초기화
      setDragStartDate(null);
      setDragEndDate(null);
    }
  };

  return (
    <div className="flex h-[100vh]" onClick={() => setSelectedDate(null)} >
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
            {monthsInEnglish[month - 1]}
          </p>
        </div>
        <div className="w-full flex">
          <div className="w-[76%] grid grid-cols-7 grid-rows-[40px_auto] min-w-[860px]" onClick={(e) => e.stopPropagation()}>
            {daysOfWeek.map((day, index) => (
              <div key={index} className="ml-[20px] font-bold text-primary-gray-500 flex items-center">
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((date, dateIndex) => {
                  const { className, isCurrentMonth, fullDate } = getDate(date, weekIndex, month, year); 

                  // eventDateList: 이벤트 시작날짜 끝날짜 받아와서 저장한거 (위에 있음)
                  // 
                  const filteredEventDateList = eventDateList.filter(date => {
                    // eventMonth: 시작날짜의 월을 구함
                    const eventMonth = new Date(date.starteDate).getMonth();
                    return eventMonth === month - 1;
                  });
                  
                  let isWeeksFirstEventDay
                  let isLastWeekOfEnvent
                  let leftDates = 0
                  let barLength = 0
                  
                  if (filteredEventDateList.length > 0){
                    const dateTypeFullDate = new Date(fullDate);
                    isWeeksFirstEventDay = fullDate === filteredEventDateList[0].starteDate || 
                    new Date(filteredEventDateList[0].starteDate) < dateTypeFullDate
                      && dateTypeFullDate < new Date(filteredEventDateList[0].endDate)
                      && dateTypeFullDate.getDay() === 1;
                    isLastWeekOfEnvent = new Date(filteredEventDateList[0].endDate).getDate() - dateTypeFullDate.getDate() < 7
                    leftDates = new Date(filteredEventDateList[0].endDate).getDate() - dateTypeFullDate.getDate() + 1
                    barLength = (7 - new Date(fullDate).getDay() + 1)
                  }

                  return (
                    <div key={dateIndex} className="relative flex flex-col">
                      <div
                        className={className}
                        onMouseDown={(e) => handleMouseEvents(date, weekIndex, e, "down")}
                        onMouseMove={(e) => handleMouseEvents(date, weekIndex, e, "move")}
                        onMouseUp={(e) => handleMouseEvents(date, weekIndex, e, "up")}
                        onClick={(e) => handleDateClick(date, weekIndex, e)}
                      >
                        <p className="select-none">{date > 0 ? date : ""}</p>
                      </div>
                      {(isWeeksFirstEventDay && isCurrentMonth) && (
                        <div
                          className="cursor-pointer absolute mt-[40px] z-[1000] flex flex-col gap-[5px]"
                          style={{width: isLastWeekOfEnvent ? leftDates * 100 + '%' : barLength * 100 + '%'}}
                        >
                          {sampleEventData
                            .filter((event) => {
                              const eventMonth = new Date(event.start).getMonth();
                              return eventMonth === month - 1;
                            })
                            .map((event, index) => (
                              <div
                                key={index}
                                className="flex items-center mt-[2px] w-[100%] h-[20px] bg-primary-orange-lightActive rounded-[100px] gap-[6px] pl-[10px]"
                              >
                                <div className="w-[7px] h-[7px] rounded-[100px] bg-primary-orange-normal flex-shrink-0" />
                                <p className="text-[12px] pr-[10px] truncate select-none">
                                  {event.title}
                                </p>
                              </div>
                            ))}
                        </div>
                      )}
                      {selectedDate === date && isCurrentMonth && (
                        <div 
                          className="z-[1000] absolute mt-[40px]"
                            style={{
                              width: isLastWeekOfEnvent ? dragDates.length * 100 + "%" : barLength * 100 + '%',
                            }}
                        >
                          <div 
                            className="flex items-center mt-[2px] h-[20px] bg-primary-orange-normal rounded-[100px]"
                          >
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
            <EventList />
          </div>
        </div>
      </div>
      {selectedDate && (
        <div 
          style={{ zIndex: "2000", position: "absolute", top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
          className="z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <EventModal
              eventData={eventData}
              onChange={handleEventDataChange}
            />
        </div>
      )}
    </div>
  );
}