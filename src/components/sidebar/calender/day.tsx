interface PropsType {
    date: number
    week: number
    month: number
    year: number
  }
  
  const today = new Date()
  
  const Day = ({ date, week, month, year }: PropsType) => {
    const isInactive = (week === 0 && date >= 23) || (week >= 3 && date <= 6);
    const isToday = !isInactive && today.toDateString() === new Date(year, month - 1, date).toDateString();

  
    return (
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-md text-[12px] 
        ${isToday ? 'bg-[#FF8A3D]' : ''} 
        ${isInactive ? 'text-[#a1a1aa]' : ''}`}
      >
        {date}
      </div>
    );
  };
  
  export default Day