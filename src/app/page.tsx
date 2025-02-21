"use client"

import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import GoNext from "../assets/imgs/nextMonth.svg";
import GoLast from "../assets/imgs/lastMonth.svg";
import { changeDate } from "@/utils/getCalender";
import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [currentDate, setCurrentDate] = useState<number>(today.getDate());

  const monthsInEnglish = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

  const weeks = changeDate(year, month);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.getDate());
  }, [month, year]); 

  const getDate = (date: number, weekIndex: number, dateIndex: number) => {
  
    const isPrevMonth = weekIndex === 0 && date > 7; 
    const isNextMonth = weekIndex > 3 && date <= 7;
  
    const isToday =
      date === currentDate &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear();
  
    return `
      pt-[10px] pl-[20px] cursor-pointer border-t border-primary-gray-300
      ${isPrevMonth || isNextMonth ? "text-primary-gray-400 bg-primary-gray-50" : ""}
      ${isToday ? "text-primary-orange-normal bg-primary-orange-light" : ""}
    `;
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

  return (
    <div className="flex h-[100vh]">
      <Sidebar />
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
          <div className="w-[76%] grid grid-cols-7 grid-rows-[40px_auto]">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="ml-[20px] font-bold text-primary-gray-500 flex items-center">
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((date, dateIndex) => (
                  <div key={dateIndex} className={getDate(date, weekIndex, dateIndex)}>
                    {date > 0 ? date : ""}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="w-[24%] h-[90vh]"></div>
        </div>
      </div>
    </div>
  );
}
