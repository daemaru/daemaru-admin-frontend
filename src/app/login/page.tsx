import Header from "@/components/header";
import RightArrow from "../../assets/imgs/rightArrow.svg";
import LeftArrow from "../../assets/imgs/leftArrow.svg";
import Image from "next/image";

const Login = () => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-primary-gray-50">
            <Header />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)]">
                <div className="flex flex-col rounded-[40px] bg-primary-gray-white border border-primary-gray-400 pl-[30px] pr-[30px] pt-[40px] pb-[40px]">
                    <button className="flex items-center justify-center w-[40px] h-[40px] border border-primary-gray-400 rounded-[10px]">
                        <Image src={LeftArrow} alt="arrow" />
                    </button>
                    <div className="mt-[20px] flex flex-col gap-[4px]">
                        <p className="font-[600] text-[32px]">로그인</p>
                        <p className="font-[500] text-[14px] text-primary-gray-500">대마루 어드민 페이지에 오신 걸 환영해요!</p>
                    </div>
                    <div className="mt-[50px] flex flex-col gap-[30px]">
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-[700] text-[16px]">아이디</p>
                            <input
                                className="w-full h-[48px] rounded-[12px] bg-[#EFF0F0] pl-[16px] font-[500] text-[16px]"
                                type="text"
                                placeholder="아이디"
                            />
                        </div>
                        <div className="flex flex-col gap-[6px]">
                            <p className="font-[700] text-[16px]">비밀번호</p>
                            <div className="flex flex-col gap-[4px]">
                                <input
                                    className="w-full h-[48px] rounded-[12px] bg-[#EFF0F0] pl-[16px] font-[500] text-[16px]"
                                    type="password"
                                    placeholder="비밀번호"
                                />
                                <div className="flex gap-[4px]">
                                    <span className="font-[500] text-[14px] text-primary-orange-dark">아이디가 없으시다면?</span>
                                    <span className="font-[500] text-[14px] text-primary-orange-normal">회원가입</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary-orange-normal w-[400px] h-[60px] rounded-[12px] font-semibold text-lg text-primary-gray-white mt-[50px]">
                        <div className="flex items-center justify-center gap-[8px]">
                            <p>로그인</p>
                            <Image src={RightArrow} alt="arrow" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
