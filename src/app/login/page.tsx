import Header from "@/components/header";
import RightArrow from "../../assets/imgs/rightArrow.svg";
import LeftArrow from "../../assets/imgs/leftArrow.svg";
import Image from "next/image";

const Login = () => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-primary-gray-50" >
            <Header />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)]">
                <div className="flex flex-col rounded-[40px] bg-primary-gray-white border border-primary-gray-400 pl-[40px] pr-[40px] pt-[60px] pb-[60px]">
                    <button className="flex items-center justify-center w-[50px] h-[50px] border border-primary-gray-400 rounded-[10px]">
                        <Image src={LeftArrow} alt="arrow"/>
                    </button>
                    <div className="mt-[26px] flex flex-col gap-[4px]">
                        <p className="font-[600] text-[40px]">로그인</p>
                        <p className="font-[500] text-[16px] text-primary-gray-500">대마루 어드민 페이지에 오신 걸 환영해요!</p>
                    </div>
                    <div className="mt-[70px] flex flex-col gap-[40px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="font-[700] text-[20px]">아이디</p>
                            <input className="w-full h-[56px] rounded-[12px] bg-[#EFF0F0] pl-[24px] font-[500] text-[20px]" type="text" placeholder="아이디"/>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <p className="font-[700] text-[20px]">비밀번호</p>
                            <div className="flex flex-col gap-[4px]">
                                <input className="w-full h-[56px] rounded-[12px] bg-[#EFF0F0] pl-[24px] font-[500] text-[20px]" type="password" placeholder="비밀번호"/>
                                <div className="flex gap-[4px]">
                                    <span className="font-[500] text-[16px] text-primary-orange-dark">아이디가 없으시다면?</span>
                                    <span className="font-[500] text-[16px] text-primary-orange-normal">회원가입</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary-orange-normal w-[500px] h-[76px] rounded-[12px] font-semibold text-xl text-primary-gray-white mt-[70px]">
                        <div className="flex items-center justify-center gap-[12px]">
                            <p>로그인</p>
                            <Image src={RightArrow} alt="arrow"/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;