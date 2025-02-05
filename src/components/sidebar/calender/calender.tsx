import { changeDate } from "../../../utils/getCalender"
import Day from "../calender/day"

const Calendar = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const DayOfTheWeek = ['월', '화', '수', '목', '금', '토', '일']
  const calendarData = changeDate(year, month)

  return (
    <div className="flex flex-col mt-[30px]">
        <span className="text-[20px] font-semibold">{year}년 {month}월 {day}일</span>
        <div className="flex justify-between w-full mt-3">
        {DayOfTheWeek.map((day, i) => (
            <div key={i} className="flex items-center justify-center w-9 h-9 text-[12px]">{day}</div>
        ))}
        </div>
        <div className="flex flex-col justify-between w-full h-full bg-transparent/5">
        {calendarData.map((week, i) => (
            <div className="flex justify-between" key={i}>
                {week.map((date, j) => (
                    <Day date={date} week={i} key={`${i}-${j}`} month={month} year={year} />
                ))}
            </div>
        ))}
        </div>
    </div>
  )
}

export default Calendar
