import { useState } from "react";
import Logo from "@/Component/Shared/Logo/Logo";
import useAuth from "@/hooks/useAuth";
import { NavLink } from "react-router";
import { FiHome, FiUsers, FiTruck, FiBarChart, FiLogOut, FiMenu, FiBox, FiDollarSign, FiSettings, FiPlus, FiCreditCard, FiClock } from 'react-icons/fi';
import { IoLocationOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import useRole from "@/hooks/useRole";

const Sidebar = () => {
    const auth = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const {role, isLoading} = useRole(auth?.user?.email as string);

    if(isLoading){
        return <div>Loading...</div>
    }

    console.log(role)




    if (!auth) return null;

    const { user } = auth;

    const adminRoutesLinks = [
        { name: "Dashboard", path: "/sidebar", icon: <FiHome size={24} /> },
        { name: "Manage Users", path: "/admin/manage-users", icon: <FiUsers size={24} /> },
        { name: "Manage Riders", path: "/admin/manage-riders", icon: <FiTruck size={24} /> },
        { name: "Delivery Management", path: "/admin/manage-delivery", icon: <BsBoxSeam size={24} /> },
        { name: "Analytics", path: "/admin/analytics", icon: <FiBarChart size={24} /> },
    ];

    const riderRoutesLinks = [
        {name: "Dashboard", path: "/rider/dashboard", icon: <FiHome size={24} /> },
        { name: "Parcel to PickUp", path: "/rider/parcel-to-pickup", icon: <FiBox size={24} /> },
        { name: "Parcel to Deliver", path: "/rider/parcel-to-deliver", icon: <FiTruck size={24} /> },
        {name: "Earnings", path: "/rider/earnings", icon: <FiDollarSign size={24} /> },
        {name: "Settings", path: "/rider/settings", icon: <FiSettings size={24} /> },
    ];

    const userRoutesLinks = [
        { name: "Dashboard", path: "/user/dashboard", icon: <FiHome size={24} /> },
        {name: "Add Parcel", path: "/send-parcel", icon: <FiPlus size={24} /> },
        {name: "Parcel to Pay", path: "/user/parcel-to-pay", icon: <FiCreditCard size={24} /> },
        {name: "Manage Parcels", path: "/user/manage-parcels", icon: <FiBox size={24} /> },
        {name: "Payment History", path: "/user/payment-history", icon: <FiClock size={24} /> },
        {name: "Settings", path: "/user/settings", icon: <FiSettings size={24} /> },

    ];

    const commonRoutesLinks = [
        { name: "Home", path: "/", icon: <FiHome size={24} /> },
        { name: "Coverage", path: "/coverage", icon: <IoLocationOutline size={24} /> },
    ];

    return (
        <>
            <div className="flex md:hidden items-center justify-between px-6 pt-6">
                <Logo />
                <button
                    className="md:hidden sticky top-4 left-4 z-50 text-white p-2 bg-primary rounded-md"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FiMenu size={28} />
                </button>
            </div>

            <div
                className={`
                    fixed top-0 left-0 h-full bg-secondary text-white p-6 
                    z-40 w-64 transform transition-transform duration-300 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    md:translate-x-0 md:sticky md:flex md:flex-col md:justify-between md:min-h-screen overflow-y-auto
                `}
            >
                <div>
                    <Logo />
                    <div className="flex items-center gap-3 py-6">
                        <img src={user?.photoURL as string} alt={user?.displayName as string} className="w-12 h-12 rounded-full" />
                        <div>
                            <h2>{user?.displayName}</h2>
                            <p className="text-white/60">{user?.email}</p>
                        </div>
                    </div>
                    <p className="bg-primary py-2 px-4 rounded-full text-secondary text-sm font-semibold inline-block uppercase">{role}</p>
                    <div className="border-t border-gray-600 my-6"></div>

                    {role === "admin" && (
                        <ul>
                            {adminRoutesLinks.map((link, index) => (
                                <li key={index} className="font-semibold">
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-4 ${isActive ? "bg-primary rounded-xl text-secondary" : "text-white/80"}`
                                        }
                                    >
                                        {link.icon} {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    {role === "rider" && (
                        <ul>
                            {riderRoutesLinks.map((link, index) => (
                                <li key={index} className="font-semibold">
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-4 ${isActive ? "bg-primary rounded-xl text-secondary" : "text-white/80"}`
                                        }
                                    >
                                        {link.icon} {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    {role === "user" && (
                        <ul>
                            {userRoutesLinks.map((link, index) => (
                                <li key={index} className="font-semibold">
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-4 ${isActive ? "bg-primary rounded-xl text-secondary" : "text-white/80"}`
                                        }
                                    >
                                        {link.icon} {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="border-t border-gray-600 my-6"></div>
                    <ul>
                        {commonRoutesLinks.map((link, index) => (
                            <li key={index} className="p-4 font-semibold">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 ${isActive ? "bg-primary rounded-xl text-secondary" : "text-white/80"}`
                                    }
                                >
                                    {link.icon} {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="border-t border-gray-600 my-6"></div>
                    <h4 className="flex items-center gap-2 p-4 font-semibold rounded-xl text-white/80 cursor-pointer">
                        <FiLogOut size={24} /> Logout
                    </h4>
                </div>
            </div>

            {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
};

export default Sidebar;
