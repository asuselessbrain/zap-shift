import { Button } from "@/components/ui/button";
import location_merchant from "../../assets/location-merchant.png"
import be_a_merchant_bg from "../../assets/be-a-merchant-bg.png"
const MerchantAndCustomerSatisfaction = () => {
    return (
        <section className="bg-secondary py-24 relative">
            <img src={be_a_merchant_bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between px-6 2xl:px-0 gap-12 relative">
                <div>
                    <h2 className="text-[40px] font-extrabold text-white mb-4 max-w-[670px]">Merchant and Customer Satisfaction is Our First Priority</h2>
                    <p className="text-gray-400">We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className="mt-8">
                        <Button className="rounded-full px-8 py-4 text-xl font-bold">Become a Merchant</Button>
                        <Button className="rounded-full px-8 py-4 text-xl font-bold bg-transparent text-primary border-primary mt-4 md:mt-0 md:ml-4" variant="outline">Earn with ZapShift Courier</Button>
                    </div>
                </div>
                <div>
                    <img src={location_merchant} alt="Merchant and Customer Satisfaction" />
                </div>
            </div>
        </section>
    );
};

export default MerchantAndCustomerSatisfaction;