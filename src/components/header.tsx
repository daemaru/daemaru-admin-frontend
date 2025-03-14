import Logo from "../assets/imgs/logo.svg";
import Image from "next/image";

const Header = () => {
    return (
        <div className="flex w-screen h-[70px] items-center bg-primary-gray-50 pl-[40px]">
            <Image src={Logo} alt="logo" className="w-[82px] h-[28px] pl-[40px] box-content"/>
        </div>
    )
}

export default Header;