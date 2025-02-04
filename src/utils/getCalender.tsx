export const changeDate = (year: number, month: number) => {
    // 이전 달의 마지막 날짜와 요일
    const PVLastDate = new Date(year, month - 1, 0).getDate()
    const PVLastDay = new Date(year, month - 1, 0).getDay()
  
    // 현재 달의 마지막 날짜와 요일
    const ThisLastDay = new Date(year, month, 0).getDay()
    const ThisLastDate = new Date(year, month, 0).getDate()
  
    // 이전 달의 날짜 배열 생성
    let PVLD: number[] = []
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; i++) {
        PVLD.unshift(PVLastDate - i)
      }
    }
  
    // 다음 달의 날짜 배열 생성 (1부터 필요한 만큼)
    let TLD: number[] = []
    for (let i = 1; i < 7 - ThisLastDay; i++) {
      TLD.push(i)
    }
  
    // 현재 달의 날짜 배열 생성
    let TD = Array.from(Array(ThisLastDate + 1).keys()).slice(1)
  
    // 전체 날짜 배열 생성
    const allDates = PVLD.concat(TD, TLD)
  
    // 주별로 분리
    const weeks: number[][] = []
    let week: number[] = []
  
    allDates.forEach((date, index) => {
      week.push(date)
  
      // 일주일이 되었거나 마지막 날짜인 경우
      if (week.length === 7 || index === allDates.length - 1) {
        if (week.length < 7) {
          // 마지막 주차에서 7일이 안 되는 경우, 다음 달의 날짜로 채움
          const remainingDays = 7 - week.length
          for (let i = 1; i <= remainingDays; i++) {
            week.push(TLD[TLD.length - 1] + i)
          }
        }
        weeks.push([...week])
        week = []
      }
    })
  
    return weeks
  }