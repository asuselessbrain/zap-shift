import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-black py-20 px-6 2xl:px-0 text-white">
            <div className="max-w-[1440px] mx-auto flex flex-col items-center">
                <Logo />
                <p className="text-gray-300 text-sm max-w-[600px] text-center mt-10">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <ul className="text-gray-300 text-sm border-t border-b border-dashed border-secondary my-8 py-8 flex items-center justify-center gap-8 w-full px-6 2xl:px-0 flex-wrap">
                    <li>Services</li>
                    <li>Coverage</li>
                    <li>About Us</li>
                    <li>Pricing</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
                <div className="flex items-center gap-8">
                    <FaLinkedin size={30} />
                    <FaXTwitter size={30} />
                    <FaFacebookSquare size={30} />
                    <FaYoutube size={30} />
                </div>
                <p className="text-gray-300 text-sm mt-8">&copy; 2024 ZapShift Courier. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;