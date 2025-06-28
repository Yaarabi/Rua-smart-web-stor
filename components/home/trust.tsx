import {
    FaTruck,
    FaHeadset,
    FaCreditCard,
    FaCheckCircle,
    FaShieldAlt,
} from "react-icons/fa";

export default function TrustSection() {
    const features = [
        { icon: <FaTruck size={36} />, title: "Free Delivery", desc: "Free shipping for orders over $20" },
        { icon: <FaHeadset size={36} />, title: "Support 24/7", desc: "Available anytime you need us" },
        { icon: <FaCreditCard size={36} />, title: "Secure Payment", desc: "Multiple trusted payment options" },
        { icon: <FaCheckCircle size={36} />, title: "Reliability", desc: "Trusted by over 2,000+ customers" },
        { icon: <FaShieldAlt size={36} />, title: "30-Day Guarantee", desc: "Exchange or return within 30 days" },
    ];

    return (
        <section className="py-16 px-6 bg-gray-800 text-white">
            <h3 className="text-4xl font-bold text-center mb-12">Why Trust in Us?</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-screen-xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 bg-gray-100 text-gray-900 border border-gray-300 rounded-2xl p-6 hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                    >
                        <div className="text-gray-800">{feature.icon}</div>
                        <h4 className="text-lg font-semibold">{feature.title}</h4>
                        <p className="text-sm text-gray-600 text-center">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
