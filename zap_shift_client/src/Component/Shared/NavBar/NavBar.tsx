import { use, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/Logo";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";
import { AuthContext } from "@/Context/Providers/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const authContext = use(AuthContext);

    if (!authContext) {
        return null;
    }

    const { user, logOut } = authContext;

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const navItems = [
        { link: "/", name: "Home" },
        { link: "/send-parcel", name: "Send Parcel" },
        { link: "/coverage", name: "Coverage" },
        { link: "/about", name: "About Us" },
        { link: "/pricing", name: "Pricing" },
        { link: "/admin/dashboard", name: "Dashboard" },
    ]

    return (
        <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-100">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between py-4 px-6">

                {/* Logo */}
                <Logo />

                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
                    {navItems.map((item, i) => (
                        <li key={i}>
                            <NavLink
                                to={item?.link}
                                className="hover:text-black">{item?.name}</NavLink>
                        </li>
                    ))}
                </ul>

                {/* Buttons (Desktop only) */}
                <div className="hidden lg:flex items-center gap-4">
                    {
                        user ?
                            <button onClick={handleLogout} className="px-5 py-2 border border-gray-300 rounded-md bg-red-400 text-white font-medium">
                                Sign Out
                            </button>
                            : <Link to="/auth/login">
                                <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium">
                                    Sign In
                                </button>
                            </Link>
                    }
                    <Link to="/be-a-rider">
                        <button className="px-5 py-2 cursor-pointer bg-[#c8ea4e] rounded-md text-gray-900 font-medium hover:bg-[#b5dd3c] transition">
                            Be a rider
                        </button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-2"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-white w-full shadow-sm transition-all duration-300 overflow-hidden ${open ? "py-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col gap-4 text-gray-700 font-medium px-6">
                    {navItems.map((item, i) => (
                        <li key={i}>
                            <NavLink
                                to={item?.link}
                                className="block py-2 text-lg border-b border-gray-100"
                                onClick={() => setOpen(false)}
                            >
                                {item?.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Mobile Buttons */}
                <div className="flex flex-col mt-4 gap-3 px-6">
                    {
                        user ?
                            <button onClick={handleLogout} className="px-5 bg-red-500 hover:bg-red-600 text-white py-2 border border-gray-300 rounded-md font-medium">
                                Sign Out
                            </button>
                            : <Link to="/auth/login">
                                <button className="px-5 py-2 border w-full border-gray-300 rounded-md text-gray-700 font-medium">
                                    Sign In
                                </button>
                            </Link>
                    }

                    <Link to="/be-a-rider" onClick={() => setOpen(false)}>
                        <Button className="px-5 py-2 w-full rounded-md text-secondary font-medium">
                            Be a rider
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
