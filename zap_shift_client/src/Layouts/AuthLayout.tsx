import Logo from "@/Component/Shared/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <div>
                <Logo />
                {/* <Outlet /> */}
            </div>
            <div className="bg-[#FAFDF0]">

            </div>
        </div>
    );
};

export default AuthLayout;