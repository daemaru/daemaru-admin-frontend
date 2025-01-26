import Background from "../assets/imgs/backgroud.png";
import Image from "next/image";
import HamburgerIcon from "../assets/imgs/hamburger.svg";
import CircleIcon from "../assets/imgs/circle.svg";

const Sidebar = () => {
    return (
        <div
            className="flex flex-col w-fit h-screen bg-cover bg-center p-[30px] text-white"
            style={{
                backgroundImage: `url(${Background.src})`,
            }}
        >
            <Image src={HamburgerIcon} alt="" />
            <div className="flex flex-col gap-[24px]">
                <h3 className="text-4xl font-semibold mt-[95px]">대마루에서<br />일정을 관리해보세요</h3>
                <p className="text-primary-orange-lightActive font-[500] text-[18px]">꾹 눌러서, 드래그!</p>
                <span className="text-[18px]">대마루에선 간편하게 학생들에게<br />일정을 공지할 수 있어요</span>
            </div>
            <div>캘린더</div>
            <div className="mt-[17px] flex flex-col gap-[4px]">
                <div className="flex gap-[10px]">
                    <Image src={CircleIcon} alt=""/>
                    <span>다문화 이해 교육</span>
                </div>
                <div className="flex gap-[10px]">
                    <Image src={CircleIcon} alt=""/>
                    <span>다문화 이해 교육</span>
                </div>
                <div className="flex gap-[10px]">
                    <Image src={CircleIcon} alt=""/>
                    <span>다문화 이해 교육</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
