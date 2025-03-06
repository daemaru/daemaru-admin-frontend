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
      start: "2025-03-05", end: "2025-03-09", title: "금연예방교육" 
    },
    {
      start: "2025-04-22", end: "2025-04-24", title: "오늘 저녁 뭐지"
    },
  ]

  const getEventDateList = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const eventDates: string[] = [];
  
    while (startDate <= endDate) {
      eventDates.push(
        `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`
      );
      startDate.setDate(startDate.getDate() + 1); 
    }

    return eventDates;
  };

  const eventDateList = sampleEventData.flatMap(event => 
    getEventDateList(event.start, event.end)
    
  );

  const weeks = changeDate(year, month);

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

  const getDate = (date: number, weekIndex: number, month: number, year: number) => {
    const isPrevMonth = weekIndex === 0 && date > 7;
    const isNextMonth = weekIndex > 3 && date <= 7;
    const isCurrentMonth = !(isPrevMonth || isNextMonth);

    const today = new Date()
    const currentDate = today.getDate();
    const isToday =
      isCurrentMonth &&
      date === currentDate &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear();

    const fullDate = isCurrentMonth
      ? `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`
      : null;

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

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleLastMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleDateClick = (date: number, weekIndex: number, event: React.MouseEvent<HTMLDivElement>) => {
    const { isCurrentMonth } = getDate(date, weekIndex, month, year);

    if (!isCurrentMonth) {
      event.preventDefault(); 
      return;
    }

    setSelectedDate(date === selectedDate ? date : null);
    setEventData({
      newEventText: "",
      description: "",
      location: "",
      time: "",
      target: "",
    });
  
    if (event.target) {
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      setModalPosition({
        top: rect.top + rect.height - 155,
        left: rect.left + 150,
      });
    }
  };
  
  const handleEventDataChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEventData({
      ...eventData,
      [field]: e.target.value,
    });
  };

  const handleMouseEvents = (date: number, weekIndex: number, event: React.MouseEvent<HTMLDivElement>, action: "down" | "move" | "up") => {
    const { isCurrentMonth } = getDate(date, weekIndex, month, year);
    if (!isCurrentMonth) return;
  
    if (action === "down") {
      setIsDragging(true);
      setDragStartDate(date);
      setSelectedDate(date); 
      setDragDates([date]);
    } else if (action === "move") {
      if (dragStartDate !== null) {
        setDragEndDate(date);
        const start = Math.min(dragStartDate, date);
        const end = Math.max(dragStartDate, date);
        const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  
        setDragDates(range);
      }
    } else if (action === "up" && isDragging) {
      setIsDragging(false);
  
      if (dragStartDate !== null && dragEndDate !== null) {
        setEventData({
          newEventText: "",
          description: "",
          location: "",
          time: "",
          target: "",
        });

        const rect = (event.target as HTMLDivElement).getBoundingClientRect();
        setModalPosition({
          top: rect.top + rect.height - 155,
          left: rect.left + 150,
        });
      }
      setDragStartDate(null);
      setDragEndDate(null);
    }
  };

  // const getWeekBoundaries = (weekDates: (number | string)[]) => {
  //   const firstValidDate = weekDates.find((date) => date !== '') as number;
  //   const weekStart = new Date(year, month -1, firstValidDate)
  //   const weekEnd = new Date(weekStart);
  //   weekEnd.setDate(weekStart.getDate() + 6);
  //   return {weekStart, weekEnd};
  // }

  // const getWeekEvents = (weekDates: (number | string)[]) => {
  //   if (!weekDates.some((date) => date !== "")) return []

  //   const {weekStart, weekEnd} = getWeekBoundaries(weekDates)

  //   return events.filter((event) => {
  //     const eventStart = new Date(event.start);
  //     const eventEnd = new Date(event.end)
  //     return eventStart <= weekEnd && eventEnd >= weekStart
  //   })
  // }

  // const calculateEventPosition = (event: Event, weekDates: (number | string)[]) => {
  //   const { weekStart } = getWeekBoundaries(weekDates)
  //   const eventStart = new Date(event.start)
  //   const eventEnd = new Date(event.end)

  //   const startOffset = Math.max(
  //     0,
  //     Math.floor((eventStart.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24))
  //   )

  //   const duration = Math.min(
  //     7 - startOffset,
  //     Math.floor((eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
  //   )

  //   return { startOffset, duration }
  // }

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
                  const filteredEventDateList = eventDateList.filter(date => {
                    const eventMonth = new Date(date).getMonth();
                    return eventMonth === month - 1;
                  });
                  const isFirstEventDay = fullDate === filteredEventDateList[0];
                  
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
                      {isFirstEventDay && (
                        <div
                          className="cursor-pointer absolute mt-[40px] z-[1000] flex flex-col gap-[5px]"
                          style={{width: (7 - new Date(fullDate).getDay() + 1) * 100 + '%'}}
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
                              width: dragDates.length * 100 + "%",
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
          style={{ zIndex: "2000", position: "absolute", top:  `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
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

