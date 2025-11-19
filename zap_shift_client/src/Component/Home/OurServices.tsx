import service from "../../assets/service.png"
const OurServices = () => {
    const services = [
        {
            title: "Express & Standard Delivery",
            description:
                "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
            icon: service,
        },
        {
            title: "Nationwide Delivery",
            description:
                "Fast and reliable parcel delivery to all districts across Bangladesh, ensuring consistent service no matter where your customers are located.",
            icon: service,
        },
        {
            title: "Fulfillment Solution",
            description:
                "End-to-end warehouse, inventory, and packaging support designed to streamline your eCommerce operations and speed up order processing.",
            icon: service,
        },
        {
            title: "Cash on Home Delivery",
            description:
                "We collect payments directly at the customer’s doorstep, making transactions simple and secure for both sellers and buyers.",
            icon: service,
        },
        {
            title: "Corporate Service / Contract In Logistics",
            description:
                "Custom logistics contracts tailored for enterprises, offering scalable, cost-effective delivery and supply chain solutions for business growth.",
            icon: service,
        },
        {
            title: "Parcel Return",
            description:
                "Seamless return handling from your customer’s location back to your store or warehouse, ensuring a smooth and hassle-free return process.",
            icon: service,
        },
    ];

    return (
        <section className="py-24 bg-secondary">
            <div className="max-w-[1440px] mx-auto px-6 2xl:px-0">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-white mb-4">Our Services</h2>
                <p className="text-center text-white max-w-2xl mx-auto mb-8">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        services.map((service, i) => (<div key={i} className="bg-white hover:bg-primary transition-all duration-500 p-8 rounded-2xl flex flex-col items-center justify-center group text-center">
                            <div className="p-6 bg-linear-to-b from-gray-300 to-white group-hover:bg-linear-to-b group-hover:from-gray-300 group-hover:to-primary rounded-full block transition-all duration-500">
                                <img src={service?.icon} alt="Service Icon" />
                            </div>
                            <h2 className="text-secondary text-2xl font-bold my-4 max-w-[330px] mx-auto">{service?.title}</h2>
                            <p className="text-gray-500">{service?.description}</p>
                        </div>))
                    }
                </div>

            </div>
        </section>
    );
};

export default OurServices;