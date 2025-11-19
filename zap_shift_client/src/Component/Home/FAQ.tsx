import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
    const faqs = [
        {
            question: "How does this posture corrector work?",
            answer:
                "The posture corrector gently aligns your shoulders and upper back to encourage a natural, upright posture. It provides light pressure and support, reminding your muscles to stay in the correct position throughout the day. With consistent use, it helps train your body to maintain proper posture even when you're not wearing it.",
        },
        {
            question: "Is it suitable for all ages and body types?",
            answer:
                "Yes, the posture corrector is designed to fit most age groups and body types. It features adjustable straps that allow you to customize the fit for comfort, making it suitable for teenagers, adults, and seniors.",
        },
        {
            question: "Does it really help with back pain and posture improvement?",
            answer:
                "Absolutely. By keeping your shoulders aligned and reducing slouching, it helps relieve pressure on your neck, shoulders, and upper back. Many users experience noticeable improvement in posture and reduced discomfort within a few weeks of regular use.",
        },
        {
            question: "Does it have smart features like vibration alerts?",
            answer:
                "Yes! This smart posture corrector includes a built-in sensor that detects slouching. When your posture deviates from the correct angle, it sends a gentle vibration alert to remind you to straighten up.",
        },
        {
            question: "How will I be notified when the product is back in stock?",
            answer:
                "Once you enter your email or phone number in the notification form, you’ll receive an instant alert as soon as the product is restocked. We’ll notify you via SMS or email—whichever you prefer.",
        },
    ];

    return (
        <section className="py-24 text-gray-700 max-w-[1440px] mx-auto px-6 2xl:px-0">
            <h2 className="text-[40px] font-extrabold mb-8 text-center text-secondary">Frequently Asked Question (FAQ)</h2>
            <p className="max-w-[820px] mx-auto text-center">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

            <Accordion type="single" collapsible className="w-full space-y-4 mt-10" defaultValue="item-1">
                {
                    faqs.map((faq, index) => (<AccordionItem key={index} value={`item-${index+1}`} className="bg-white data-[state=open]:bg-[#E6F2F3] rounded-2xl px-6 py-2">
                    <AccordionTrigger className="text-secondary font-bold text-xl">{faq?.question}</AccordionTrigger>
                    <AccordionContent>
                        <p>{faq?.answer}</p>
                    </AccordionContent>
                </AccordionItem>))
                }
                
            </Accordion>
        </section>
    );
};

export default FAQ;