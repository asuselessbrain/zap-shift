import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/Logo";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { link: "/", name: "Home" },
        { link: "/services", name: "Services" },
        { link: "/coverage", name: "Coverage" },
        { link: "/about", name: "About Us" },
        { link: "/pricing", name: "Pricing" },
        { link: "/be-a-rider", name: "Be a Rider" },
    ]

    return (
        <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
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
                    <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100">
                        Sign In
                    </button>

                    <button className="px-5 py-2 bg-[#c8ea4e] rounded-md text-gray-900 font-medium hover:bg-[#b5dd3c] transition">
                        Be a rider
                    </button>
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
                className={`lg:hidden bg-white w-full shadow-sm transition-all duration-300 overflow-hidden ${open ? "max-h-[450px] py-4" : "max-h-0"
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
                    <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium">
                        Sign In
                    </button>

                    <Button className="px-5 py-2 rounded-md text-secondary font-medium">
                        Be a rider
                    </Button>
                </div>
            </div>
        </nav>
    );
}
