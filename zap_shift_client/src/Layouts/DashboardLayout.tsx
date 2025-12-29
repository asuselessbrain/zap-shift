import Sidebar from "@/pages/Dashboard/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;