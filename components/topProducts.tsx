    "use client";

    import Image from "next/image";
    import {
    FaTruck,
    FaHeadset,
    FaCreditCard,
    FaCheckCircle,
    FaShieldAlt,
    } from "react-icons/fa";

    const Hero = () => {
    return (
        <section className="w-full bg-gray-900 py-8 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="md:col-span-2 relative bg-gray-100 rounded-2xl overflow-hidden group h-[300px] md:h-[400px]">
            <Image
                src="/clavier.jpg"
                alt="Main Hero"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-8 left-8 space-y-3 text-white drop-shadow-md">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                The New Standard
                </h2>
                <p className="text-base md:text-lg">Under favorable 360 cameras</p>
                <span className="block text-sm md:text-base font-medium">
                From $287
                </span>
                <button className="mt-4 bg-white text-gray-900 px-6 py-2 text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
                Shop Now
                </button>
            </div>
            </div>

            <div className="flex flex-col gap-6">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden group h-[150px]">
                <Image
                src="/watch.jpg"
                alt="Promo 1"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 text-white">
                <span className="bg-red-500 px-3 py-1 text-xs rounded-full shadow font-semibold">
                    SALE 17%
                </span>
                <p className="mt-1 text-[11px] font-medium">
                    Catch big deals on the cameras
                </p>
                <button className="text-xs font-semibold underline mt-1">
                    Shop now
                </button>
                </div>
            </div>

            <div className="relative bg-gray-100 rounded-2xl overflow-hidden group h-[150px]">
                <Image
                src="/phone.jpg"
                alt="Promo 2"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 text-white">
                <span className="bg-red-500 px-3 py-1 text-xs rounded-full shadow font-semibold">
                    SALE 10%
                </span>
                <p className="mt-1 text-[11px] font-medium">
                    Catch big deals on the cameras
                </p>
                <button className="text-xs font-semibold underline mt-1">
                    Shop now
                </button>
                </div>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
            { icon: <FaTruck size={28} />, title: "Free Delivery", desc: "Free Shipping for orders over $20" },
            { icon: <FaHeadset size={28} />, title: "Support 24/7", desc: "24 hours a day, 7 days a week" },
            { icon: <FaCreditCard size={28} />, title: "Secure Payment", desc: "Pay with Multiple Credit Cards" },
            { icon: <FaCheckCircle size={28} />, title: "Reliability", desc: "Trusted by 2000+ major brands" },
            { icon: <FaShieldAlt size={28} />, title: "Guarantee", desc: "Within 30 days for an exchange" },
            ].map((feature, index) => (
            <div
                key={index}
                className="flex flex-col items-center gap-3 bg-gray-50 border border-gray-300 rounded-xl p-5 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
                <div className="text-gray-800">{feature.icon}</div>
                <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-xs text-gray-500 text-center">{feature.desc}</p>
            </div>
            ))}
        </div>
        </section>
    );
    };

    export default Hero;
