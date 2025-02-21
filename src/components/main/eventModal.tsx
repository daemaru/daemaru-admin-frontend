const EventModal = () => {
    return (
        <div className="relative flex flex-col h-[200px] border border-primary-orange-normal rounded-[14px] shadow-[0px_4px_10px_4px_rgba(48,48,48,0.12)] bg-white">
            <div className="absolute left-[-10px] top-[50%] transform translate-y-[-50%] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-primary-orange-normal border-b-[10px] border-b-transparent box-shadow-[-4px_0px_10px_0pxrgba(0,0,0,0.1)]" />
            <div className="absolute left-[-8.5px] top-[50%] transform translate-y-[-50%] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-white border-b-[10px] border-b-transparent z-20" />
            <div className="flex flex-col w-[100%] p-[15px] border-b border-primary-orange-normal">
                <input
                    type="text"
                    placeholder="New Event"
                    className="text-[20px] font-semibold text-primary-orange-normal border-none bg-transparent focus:outline-none placeholder-primary-orange-normal"
                />
                <input
                    type="text"
                    placeholder="설명을 입력해주세요"
                    className="text-[12px] text-primary-gray-500 border-none bg-transparent focus:outline-none placeholder-primary-gray-500"
                />
            </div>
            <div className="flex flex-col w-[100%] p-[15px] gap-[10px]">
                <p className="text-[12px] text-primary-gray-500 border-none bg-transparent focus:outline-none">2024년 12월 4일 ~ 2024년 12월 4일</p>
                <div className="flex flex-col gap-[3px]">
                    <div className="flex gap-[10px] items-center">
                        <div className="w-[3px] h-[3px] rounded-[50%] bg-primary-gray-500"></div>
                        <input
                            type="text"
                            placeholder="장소를 입력해주세요"
                            className="placeholder-primary-gray-500 w-[100%] text-[12px] text-primary-gray-500 border-none bg-transparent focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <div className="w-[3px] h-[3px] rounded-[50%] bg-primary-gray-500"></div>
                        <input
                            type="text"
                            placeholder="시간을 입력해주세요"
                            className="placeholder-primary-gray-500 w-[100%] text-[12px] text-primary-gray-500 border-none bg-transparent focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <div className="placeholder-primary-gray-500 w-[3px] h-[3px] rounded-[50%] bg-primary-gray-500"></div>
                        <input
                            type="text"
                            placeholder="대상을 입력해주세요"
                            className="placeholder-primary-gray-500 w-[100%] text-[12px] text-primary-gray-500 border-none bg-transparent focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
