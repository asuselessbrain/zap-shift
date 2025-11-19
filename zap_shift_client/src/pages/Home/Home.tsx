import BandsSlider from "@/Component/Home/BandsSlider";
import FAQ from "@/Component/Home/FAQ";
import Hero from "@/Component/Home/Hero";
import HowItWorks from "@/Component/Home/HowItWorks";
import MerchantAndCustomerSatisfaction from "@/Component/Home/MerchantAndCustomerSatisfaction";
import OurServices from "@/Component/Home/OurServices";

const Home = () => {
    return (
        <div>
            <Hero />
            <HowItWorks />
            <OurServices />
            <BandsSlider />
            <MerchantAndCustomerSatisfaction />
            <FAQ />
        </div>
    );
};

export default Home;