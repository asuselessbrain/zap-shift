import { Carousel } from "react-responsive-carousel";
import Banner1 from "../Shared/BannerSvg/Banner1";
import Banner2 from "../Shared/BannerSvg/Banner2";
import Banner3 from "../Shared/BannerSvg/Banner3";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
    return (
            <Carousel autoPlay={true} infiniteLoop={true} interval={3000}>
                <div>
                    <Banner1 />
                </div>
                <div>
                    <Banner2 />
                </div>
                <div>
                    <Banner3 />
                </div>
            </Carousel>
    );
};

export default Hero;