import { Carousel } from "react-responsive-carousel";
import Banner1 from "../Shared/BannerSvg/Banner1";
import Banner2 from "../Shared/BannerSvg/Banner2";
import Banner3 from "../Shared/BannerSvg/Banner3";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImage from "@/assets/tiny-deliveryman.png";
import { Button } from "@/components/ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";

const Hero = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} interval={3000} className="bg-linear-to-r from-white via-[#f0fad8] to-primary">
            <div className="flex items-center justify-between max-w-[1440px] mx-auto py-20">
                <div className="max-w-[640px] text-left">
                    <div className="max-w-[210px] max-h-[100px]">
                        <img src={bannerImage} alt="Deliveryman" />
                    </div>
                    <h2 className="text-6xl font-extrabold text-secondary my-4">We Make Sure Your <span className="text-primary">Parcel Arrives</span> On Time – No Fuss.</h2>
                    <p className="text-[#606060]">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

                    <div className="mt-6 flex items-center gap-4">
                        <div>
                            <Button className="text-xl font-semibold text-[#1F1F1F] px-8 py-4 rounded-full">Track Your Parcel</Button>
                            <Button className="p-3 bg-secondary text-primary rounded-full hover:text-secondary"><MdOutlineArrowOutward size={24} /></Button>
                        </div>
                        <Button className="text-xl font-semibold text-[#1F1F1F] px-8 py-4" variant={"outline"}>Track Your Parcel</Button>
                    </div>
                </div>
                <Banner1 />
            </div>
            <div className="flex items-center justify-between max-w-[1440px] mx-auto py-20">
                <div className="max-w-[640px] text-left">
                    <div className="max-w-[210px] max-h-[100px]">
                        <img src={bannerImage} alt="Deliveryman" />
                    </div>
                    <h2 className="text-6xl font-extrabold text-secondary my-4">Fastest <span className="text-primary">Delivery</span> & Easy <span className="text-primary">Pickup</span></h2>
                    <p className="text-[#606060]">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

                    <div className="mt-6 flex items-center gap-4">
                        <div>
                            <Button className="text-xl font-semibold text-[#1F1F1F] px-8 py-4 rounded-full">Track Your Parcel</Button>
                            <Button className="p-3 bg-secondary text-primary rounded-full hover:text-secondary"><MdOutlineArrowOutward size={24} /></Button>
                        </div>
                        <Button className="text-xl font-semibold text-[#1F1F1F] px-8 py-4" variant={"outline"}>Track Your Parcel</Button>
                    </div>
                </div>
                <Banner2 />
            </div>
            <div className="flex items-center justify-between max-w-[1440px] mx-auto py-20">
                <div className="max-w-[640px] text-left">
                    <div className="max-w-[210px] max-h-[100px]">
                        <img src={bannerImage} alt="Deliveryman" />
                    </div>
                    Delivery in 30 Minutes at your doorstep
                    <h2 className="text-6xl font-extrabold text-secondary my-4"> Delivery in <span className="text-primary">30 Minutes</span> at your doorstep</h2>
                    <p className="text-[#606060]">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

                    <div className="mt-6 flex items-center gap-4">
                        <div>
                            <Button className="text-xl font-semibold text-[#1F1F1F] px-8 py-4 rounded-full">Track Your Parcel</Button>
                            <Button className="p-3 bg-secondary text-primary rounded-full hover:text-secondary"><MdOutlineArrowOutward size={24} /></Button>
                        </div>
                        <Button className="text-xl font-semibold text-[#1F1F1F] px-8 py-4" variant={"outline"}>Track Your Parcel</Button>
                    </div>
                </div>
                <Banner3 />
            </div>
        </Carousel>
    );
};

export default Hero;