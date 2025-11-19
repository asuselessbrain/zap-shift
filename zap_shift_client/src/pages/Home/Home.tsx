import BandsSlider from "@/Component/Home/BandsSlider";
import Hero from "@/Component/Home/Hero";
import HowItWorks from "@/Component/Home/HowItWorks";
import OurServices from "@/Component/Home/OurServices";

const Home = () => {
    return (
        <div>
            <Hero />
            <HowItWorks />
            <OurServices />
            <BandsSlider />
        </div>
    );
};

export default Home;