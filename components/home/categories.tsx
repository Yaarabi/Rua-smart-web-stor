
"use client"

import { FaMobileAlt, FaTabletAlt, FaMouse, FaCamera, FaLaptop, FaDesktop, FaPrint, FaHeadphones, FaWatchmanMonitoring } from "react-icons/fa";
import { useRouter } from "next/navigation"; 
import { FaEarListen } from "react-icons/fa6";
const categories = [
    { name: "Smart Phones", category: "phones", icon: <FaMobileAlt size={32} /> },
    { name: "Tablets", category: "tablet", icon: <FaTabletAlt size={32} /> },
    { name: "Mouses", category: "mouse", icon: <FaMouse size={32} /> },
    { name: "Cameras", category: "camera", icon: <FaCamera size={32} /> },
    { name: "Smart Watches", category: "watch", icon: <FaWatchmanMonitoring size={32} /> },
    { name: "Laptops", category: "pc prtable", icon: <FaLaptop size={32} /> },
    { name: "PCs", category: "pc", icon: <FaDesktop size={32} /> },
    { name: "Printers", category: "printer", icon: <FaPrint size={32} /> },
    { name: "Earbuds", category: "earPudes", icon: <FaEarListen size={32} /> },
    { name: "Head Phones", category: "phones", icon: <FaHeadphones size={32} /> },
];

export default function Categories() {
    
    const router = useRouter()
    return (
        <section id="categories" className="py-12 px-6 max-w-screen-xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Browse Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <div
                    onClick={() => router.push(`/categories/${category.category}`)}
                    key={index} className="bg-white text-gray-900 p-6 rounded-lg flex flex-col items-center justify-center shadow hover:bg-gray-200 cursor-pointer">
                        <div className="mb-2">{category.icon}</div>
                        <span className="font-semibold">{category.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
