import amazon from "../../assets/brands/amazon.png"
import amazon_vector from "../../assets/brands/amazon_vector.png"
import casio from "../../assets/brands/casio.png"
import moonstar from "../../assets/brands/moonstar.png"
import randstad from "../../assets/brands/randstad.png"
import star from "../../assets/brands/star.png"
import start_people from "../../assets/brands/start_people.png"
import Marquee from "react-fast-marquee";
import live_tracking from "../../assets/live-tracking.png"
import safe_delivery from "../../assets/safe-delivery.png"

const bandsImages = [
    {
        img: amazon,
        alt: "Amazon"
    },
    {
        img: amazon_vector,
        alt: "Amazon Vector"
    },
    {
        img: casio,
        alt: "Casio"
    },
    {
        img: moonstar,
        alt: "MoonStar"
    },
    {
        img: randstad,
        alt: "Randstad"
    },
    {
        img: star,
        alt: "Star"
    },
    {
        img: start_people,
        alt: "Start People"
    }
]

const parcelFeatures = [
    {
        img: live_tracking,
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
        img: safe_delivery,
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
    },
    {
        img: safe_delivery,
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
    }
]

const BandsSlider = () => {
    return (
        <div className="py-24 max-w-[1440px] mx-auto overflow-hidden px-6 2xl:px-0">
            <h3 className="text-secondary text-3xl font-bold text-center mb-10">We've helped thousands of sales teams</h3>
            <div
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0px, black 128px, black calc(100% - 128px), transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, transparent 0px, black 128px, black calc(100% - 128px), transparent 100%)",
                }}
            >
                <Marquee>
                    {[...bandsImages, ...bandsImages].map((band, i) => (
                        <img key={i} src={band.img} className="shrink-0 px-8" alt={band.alt} />
                    ))}
                </Marquee>
            </div>
            <div className="border-b border-t border-secondary py-20 mt-20 border-dashed">

                <div className="flex flex-col gap-6">
                    {
                        parcelFeatures.map((feature, i) => (<div key={i} className="bg-white p-8 rounded-2xl flex items-center justify-between md:gap-10 xl:gap-20">
                            <img className="hidden md:block" src={feature?.img} alt={feature?.title} />
                            <svg className="hidden md:block" width="1" height="150" viewBox="0 0 1 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.5" y1="150" x2="0.5" stroke="#03464D" stroke-dasharray="5 5" />
                            </svg>

                            <div>
                                <h3 className="text-secondary text-xl font-extrabold mb-4">{feature?.title}</h3>
                                <p className="text-gray-500">{feature?.description}</p>
                            </div>
                        </div>))
                    }
                </div>
            </div>
        </div>
    );
};

export default BandsSlider;