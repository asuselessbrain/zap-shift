import Header from "@/Component/Shared/Header/Header";
import { Button } from "@/components/ui/button";
import deliveryVan from "@/assets/delivery-van.png";
import safeDelivery from "@/assets/safe-delivery.png";
import liveTracking from "@/assets/live-tracking.png";
import runningGif from "@/assets/running.gif";

const About = () => {
    const values = [
        {
            title: "Reliability",
            description: "We ensure your parcels arrive on time, every time, with our proven track record of punctual deliveries.",
            icon: safeDelivery,
        },
        {
            title: "Security",
            description: "Your packages are handled with utmost care and security throughout the entire delivery process.",
            icon: deliveryVan,
        },
        {
            title: "Innovation",
            description: "We leverage cutting-edge technology for real-time tracking and efficient logistics solutions.",
            icon: liveTracking,
        },
    ];

    const stats = [
        { number: "500K+", label: "Parcels Delivered" },
        { number: "98%", label: "On-Time Delivery" },
        { number: "50+", label: "Cities Covered" },
        { number: "24/7", label: "Customer Support" },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="max-w-[1440px] mx-auto py-20 px-14 lg:px-24 rounded-2xl bg-white my-8">
                <Header title="About Us" description="Learn more about our mission, values, and the team behind our success." />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
                    <div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-secondary mb-6">
                            Revolutionizing Delivery Across Bangladesh
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Founded with a vision to make parcel delivery seamless and reliable, Zap Shift has become
                            Bangladesh's trusted logistics partner. We connect businesses with customers through fast,
                            secure, and transparent delivery solutions.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            From express deliveries in major cities to nationwide coverage, we ensure your packages
                            reach their destination safely and on time. Our commitment to excellence drives everything we do.
                        </p>
                        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold">
                            Learn More About Our Services
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src={deliveryVan}
                            alt="Delivery Van"
                            className="w-full max-w-md h-auto rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-secondary">
                <div className="max-w-[1440px] mx-auto px-6 2xl:px-0">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Our Story</h2>
                        <p className="text-white/80 max-w-3xl mx-auto text-lg">
                            From humble beginnings to becoming Bangladesh's leading delivery network
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="space-y-6">
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-3">The Beginning</h3>
                                    <p className="text-white/90">
                                        Started in 2020 with a small team and big dreams, Zap Shift began as a solution
                                        to the growing e-commerce delivery challenges in Bangladesh.
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-3">Rapid Growth</h3>
                                    <p className="text-white/90">
                                        Through innovation and dedication, we expanded our network to cover all major
                                        cities and districts, serving thousands of businesses daily.
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-3">Future Forward</h3>
                                    <p className="text-white/90">
                                        Today, we're not just delivering packages – we're building the future of
                                        logistics in Bangladesh with technology and trust.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={runningGif}
                                alt="Delivery in Action"
                                className="w-full max-w-md h-auto rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-6 2xl:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold text-xl">M</span>
                                </div>
                                <h3 className="text-3xl font-extrabold text-secondary">Our Mission</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To provide fast, reliable, and secure delivery services that empower businesses
                                and connect communities across Bangladesh. We strive to exceed expectations
                                through innovation, transparency, and exceptional customer service.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold text-xl">V</span>
                                </div>
                                <h3 className="text-3xl font-extrabold text-secondary">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To be Bangladesh's most trusted logistics partner, revolutionizing the delivery
                                industry through technology, sustainability, and unparalleled service excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 2xl:px-0">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary mb-4">Our Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-gray-50 hover:bg-primary/5 transition-all duration-300 p-8 rounded-2xl text-center group">
                                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300">
                                    <img src={value.icon} alt={value.title} className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-secondary">
                <div className="max-w-[1440px] mx-auto px-6 2xl:px-0">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">By The Numbers</h2>
                        <p className="text-white/80 max-w-2xl mx-auto text-lg">
                            Our commitment to excellence in action
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-white/80 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 2xl:px-0">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary mb-4">Why Choose Zap Shift?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            What sets us apart in the delivery industry
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Real-Time Tracking</h3>
                                    <p className="text-gray-600">Track your parcels in real-time from pickup to delivery with our advanced tracking system.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Nationwide Coverage</h3>
                                    <p className="text-gray-600">We deliver to every district in Bangladesh, ensuring your packages reach anywhere.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Secure & Safe</h3>
                                    <p className="text-gray-600">Your packages are insured and handled with care throughout the delivery process.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">24/7 Support</h3>
                                    <p className="text-gray-600">Our customer support team is available around the clock to assist you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={safeDelivery}
                                alt="Safe Delivery"
                                className="w-full max-w-md h-auto rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-secondary">
                <div className="max-w-[1440px] mx-auto px-6 2xl:px-0 text-center">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                        Ready to Experience the Difference?
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
                        Join thousands of businesses that trust Zap Shift for their delivery needs.
                        Get started today and see why we're Bangladesh's preferred logistics partner.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg">
                            Start Shipping Today
                        </Button>
                        <Button variant="outline" className="border-white hover:bg-white hover:text-secondary px-8 py-4 rounded-full font-semibold text-lg">
                            Contact Our Team
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;