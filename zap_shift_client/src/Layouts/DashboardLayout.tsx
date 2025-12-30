import Sidebar from "@/pages/Dashboard/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <div className="p-8 w-full bg-gray-50/60">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;