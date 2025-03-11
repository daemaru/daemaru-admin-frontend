"use client"

import { useState, useEffect } from "react";
import { getSchedules } from "@/apis/schedules";
import { getSchedulesResponseArray } from "@/apis/schedules/type";


const EventList = ({selectedMonth}: {selectedMonth: number}) => {
    const [schedules, setSchedules] = useState<getSchedulesResponseArray[]>([]);

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

    return (
        <div className="flex flex-col gap-[30px] pt-[40px] pl-[20px] pr-[20px] pb-[40px] overflow-y-auto max-h-[90vh] min-w-[200px]">
            {schedules.length > 0 ? (
                schedules
                    .filter((event) => {
                        const eventMonth = new Date(event.start).getMonth();
                        return eventMonth === selectedMonth - 1;
                    })
                    .map((event) => (
                        <div key={event.id} className="flex flex-col gap-[8px]">
                            <div className="flex items-center gap-[10px]">
                                <div className="w-[7px] h-[7px] bg-primary-orange-normal rounded-[50%]" />
                                <h3 className="text-primary-gray-700">{event.title}</h3>
                            </div>
                            <div className="ml-[14px] flex flex-col gap-[4px]">
                                <p className="text-[15px] text-primary-gray-700">{event.description}</p>
                                <p className="text-[13px] text-primary-gray-500">시간 : {event.period}</p>
                                <p className="text-[13px] text-primary-gray-500">장소 : {event.location}</p>
                                <p className="text-[13px] text-primary-gray-500">대상 : {event.target}</p>
                            </div>
                        </div>
                    ))
            ) : (
                <p className="text-center text-primary-gray-500">일정이 없습니다.</p>
            )}
        </div>
    )
}

export default EventList;