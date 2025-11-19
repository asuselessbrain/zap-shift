import bookingIcon from '../../assets/bookingIcon.png'
const HowItWorks = () => {

    const bookingProcess = [
        {
            title: "Booking Pick & Drop",
            description: "Schedule a pickup from your location and have your packages delivered safely to the destination.",
            icon: bookingIcon
        },
        {
            title: "Cash On Delivery",
            description: "We collect payments from customers at delivery, ensuring secure and hassle-free transactions.",
            icon: bookingIcon
        },
        {
            title: "Delivery Hub",
            description: "Your parcels are sorted and processed through our advanced delivery hubs for fast and efficient dispatch.",
            icon: bookingIcon
        },
        {
            title: "Booking SME & Corporate",
            description: "Custom logistics solutions for SMEs and corporate clients, designed to support business growth.",
            icon: bookingIcon
        }
    ];

    return (
        <section className="max-w-[1440px] mx-auto py-24 px-6 2xl:px-0">
            <h2 className="text-secondary text-3xl font-bold mb-8">How it Works</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    bookingProcess.map(process => (<div key={process?.title} className="p-8 bg-white rounded-2xl">
                        <img src={bookingIcon} alt="bookingIcon" />
                        <h3 className="text-xl font-bold text-secondary mt-6 mb-4">{process?.title}</h3>
                        <p>{process?.description}</p>
                    </div>))
                }
            </div>

        </section>
    );
};

export default HowItWorks;