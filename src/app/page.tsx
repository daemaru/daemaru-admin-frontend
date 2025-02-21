"use client"

import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import GoNext from "../assets/imgs/nextMonth.svg";
import GoLast from "../assets/imgs/lastMonth.svg";
import { changeDate } from "@/utils/getCalender";
import EventModal from "@/components/main/eventModal";
import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [currentDate, setCurrentDate] = useState<number>(today.getDate());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const monthsInEnglish = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

  const weeks = changeDate(year, month);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.getDate());
    setSelectedDate(null);
  }, [month, year]);

  const getDate = (date: number, weekIndex: number) => {
    const isPrevMonth = weekIndex === 0 && date > 7;
    const isNextMonth = weekIndex > 3 && date <= 7;

    const isCurrentMonth = !(isPrevMonth || isNextMonth);
    const isToday =
      date === currentDate &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear();

    return {
      className: `
        relative w-[100%] h-[100%] pt-[10px] pl-[20px] cursor-pointer border-t border-primary-gray-300
        ${isPrevMonth || isNextMonth ? "text-primary-gray-400 bg-primary-gray-50 cursor-not-allowed" : ""}
        ${isToday ? "text-primary-orange-normal bg-primary-orange-light" : ""}
      `,
      isCurrentMonth,
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
    const isPrevMonth = weekIndex === 0 && date > 7;
    const isNextMonth = weekIndex > 3 && date <= 7;
    
    if (date > 0 && !isPrevMonth && !isNextMonth) {
      setSelectedDate(date === selectedDate ? null : date);
      if (event.target) {
        const rect = (event.target as HTMLDivElement).getBoundingClientRect();
        setModalPosition({
          top: rect.top + rect.height - 175, 
          left: rect.left + 150, 
        });
      }
    }
  };

  return (
    <div className="flex h-[100vh]">
      <Sidebar className="lg:block hidden" />
      <div className="flex flex-col w-full">
        <div className="flex gap-[40px] h-[20%] items-center">
          <Image
            className="ml-[40px] w-[12px] cursor-pointer"
            src={GoLast}
            alt="<"
            onClick={handleLastMonth}
          />
          <Image 
            className="w-[12px] cursor-pointer" 
            src={GoNext} 
            alt=">"
            onClick={handleNextMonth} 
          />
          <p className="text-[28px] font-semibold text-primary-orange-normal">
            {monthsInEnglish[month - 1]}
          </p>
        </div>
        <div className="w-full flex">
          <div className="w-[76%] grid grid-cols-7 grid-rows-[40px_auto] min-w-[860px]">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="ml-[20px] font-bold text-primary-gray-500 flex items-center">
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((date, dateIndex) => {
                  const { className, isCurrentMonth } = getDate(date, weekIndex);
                  return (
                    <div key={dateIndex} className="flex flex-col">
                      <div
                        key={dateIndex}
                        className={className}
                        onClick={(event) => handleDateClick(date, weekIndex, event)}
                      >
                        {date > 0 ? date : ""}
                      </div>
                      {selectedDate === date && isCurrentMonth && (
                        <div className="absolute mt-[40px] w-[123px] flex-1 overflow-y-auto">
                          <div className="flex items-center mt-[2px] w-[100%] h-[20px] bg-primary-orange-normal rounded-[100px]">
                            <p className="text-[12px] ml-[20px] text-primary-gray-white">New Event</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="w-[24%] h-[90vh]"></div>
        </div>
      </div>
      {selectedDate && (
        <div 
          style={{ position: "absolute", top:  `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
          className="z-50"
        >
          <EventModal />
        </div>
      )}
    </div>
  );
}