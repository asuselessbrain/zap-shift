import Logo from "@/Component/Shared/Logo/Logo";
import authImage from "@/assets/authImage.png"
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen gap-6">
            <div className="my-16 flex flex-col justify-center flex-1 px-16 h-full" >
                <Logo />
                <Outlet />
            </div>
            <div className="bg-[#FAFDF0] h-screen flex items-center justify-center flex-1">
                <img src={authImage} alt="Authentication" />
            </div>
        </div>
    );
};

export default AuthLayout;