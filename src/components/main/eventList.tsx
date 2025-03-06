const EventList = () => {
    return (
        <div className="flex flex-col gap-[30px] pt-[40px] pl-[20px] pr-[20px] pb-[40px] overflow-y-auto max-h-[90vh] min-w-[200px]">
            <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[10px]">
                    <div className="w-[7px] h-[7px] bg-primary-orange-normal rounded-[50%]"/>
                    <h3 className="text-primary-gray-700">다문화 이해 교육</h3>
                </div>
                <div className="ml-[14px] flex flex-col gap-[4px]">
                    <p className="text-[15px] text-primary-gray-700">다문화 이해 교육 영상 시청 및 소감문 작성</p>
                    <p className="text-[13px] text-primary-gray-500">시간 : 6교시 ~ 7교시</p>
                    <p className="text-[13px] text-primary-gray-500">장소 : 각 반 교실</p>
                    <p className="text-[13px] text-primary-gray-500">대상 : 2학년 학생 전체</p>
                </div>
            </div>
        </div>
    )
}

export default EventList;