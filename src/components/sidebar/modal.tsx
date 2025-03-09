const Modal = () => {
    return (
        <div className="absolute bg-primary-gray-100 border border-[#C9C9C9] rounded-[8px] pl-1.5 pr-1.5 pt-2 pb-2" >
            <div className="flex flex-col gap-[6px]">
                <span className="text-primary-gray-black text-[12px] cursor-pointer rounded-[2px] hover:bg-primary-orange-normal hover:text-primary-gray-white pl-[4px]">로그아웃</span>
                <div className="w-[143px] h-[1px] bg-[#D6D7D7]"></div>
                <span className="text-primary-gray-black text-[12px] cursor-pointer rounded-[2px] hover:bg-primary-orange-normal hover:text-primary-gray-white pl-[4px]">문의하기</span>
            </div>
        </div>
    )
}

export default Modal;