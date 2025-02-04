"use client"

import Background from "../../assets/imgs/backgroud.png";
import Image from "next/image";
import HamburgerIcon from "../../assets/imgs/hamburger.svg";
import CircleIcon from "../../assets/imgs/circle.svg";
import { useState } from "react";
import Modal from "./modal";
import Calender from "./calender/calender";

const Sidebar = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    }

    return (
        <div
            className="relative flex flex-col w-fit h-screen bg-cover bg-center p-[30px] text-white"
            style={{
                backgroundImage: `url(${Background.src})`,
            }}
        >
            <div className="relative">
                <Image src={HamburgerIcon} alt="" className="cursor-pointer" onClick={toggleModal}/>
                {openModal && <Modal />}
            </div>
            <div className="flex flex-col gap-[16px]">
                <h3 className="text-2xl font-semibold mt-[70px]">대마루에서<br />일정을 관리해보세요</h3>
                <p className="text-primary-orange-lightActive font-[500] text-[14px]">꾹 눌러서, 드래그!</p>
                <span className="text-[14px]">대마루에선 간편하게 학생들에게<br />일정을 공지할 수 있어요</span>
            </div>
            <Calender />
            <div className="mt-[17px] flex flex-col gap-[4px]">
                <div className="flex gap-[10px]">
                    <Image src={CircleIcon} alt=""/>
                    <span className="text-[14px]">다문화 이해 교육</span>
                </div>
                <div className="flex gap-[10px]">
                    <Image src={CircleIcon} alt=""/>
                    <span className="text-[14px]">다문화 이해 교육</span>
                </div>
                <div className="flex gap-[10px]">
                    <Image src={CircleIcon} alt=""/>
                    <span className="text-[14px]">다문화 이해 교육</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
