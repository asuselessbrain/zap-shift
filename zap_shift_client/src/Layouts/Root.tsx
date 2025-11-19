import Footer from "@/Component/Shared/Footer/Footer";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <div className="bg-gray-100">
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;