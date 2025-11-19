import Footer from "@/Component/Shared/Footer/Footer";
import NavBar from "@/Component/Shared/NavBar/NavBar";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <div className="bg-gray-100">
            <div className="h-20">
                <NavBar />
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;