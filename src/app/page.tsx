"use client"

import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import GoNext from "../assets/imgs/nextMonth.svg";
import GoLast from "../assets/imgs/lastMonth.svg";
import { changeDate } from "@/utils/getCalender";
import { useState } from "react";
import React from "react";

export default function Home() {
  const today = new Date();
  const [year] = useState<number>(today.getFullYear());
  const [month] = useState<number>(today.getMonth() + 1);

  const monthsInEnglish = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

  const currentDate = today.getDate();
  const weeks = changeDate(year, month);
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  const getDate = (date: number) => {
    const isPrevOrNextMonth = date <= 0 || date > lastDayOfMonth;
    const isToday = date === currentDate;
    return `
      pt-[10px] pl-[20px] cursor-pointer border-t border-primary-gray-300
      ${isPrevOrNextMonth ? "text-primary-gray-400 bg-primary-gray-50" : ""}
      ${isToday ? "text-primary-orange-normal bg-primary-orange-light" : ""}
    `;
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
          />
          <Image className="w-[12px] cursor-pointer" src={GoNext} alt=">" />
          <p className="text-[28px] font-semibold text-primary-orange-normal">
            {monthsInEnglish[today.getMonth()]}
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
                  date > 0 && (
                    <div key={dateIndex} className={getDate(date)}>
                      {date}
                    </div>
                  )
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
