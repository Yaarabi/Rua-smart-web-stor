"use client";

import Image from "next/image";
import { useState } from "react";
import useStore from "@/zustand/store";
import { FaStar, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    rating: number;
    createdAt: Date;
    quantity: number;
}

interface ProductCardProps {
    product: Product;
}

const Card = ({ product }: ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const add = useStore((state) => state.addProduct);
    const router = useRouter();

    return (
        <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.4)" }}
        className="relative flex flex-col h-[360px] bg-gray-800 border border-gray-600 p-5 transition-shadow duration-300 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
        {hovered && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 z-20 bg-gray-900 bg-opacity-90 p-2 rounded-full shadow-lg"
            >
            <FaEye
                size={20}
                className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                onClick={() => router.push(`/categories/details/${product._id}`)}
            />
            </motion.div>
        )}

        <div className="relative h-44 w-full overflow-hidden bg-gray-900 flex items-center justify-center mb-5">
            <Image
            src={`data:image/png;base64,${product.images}`}
            alt={product.name}
            width={260}
            height={200}
            unoptimized
            className="object-contain max-h-40 transition-transform duration-300 hover:scale-110"
            />
        </div>

        <div className="flex flex-col text-center flex-grow">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
            </h3>

            <div className="flex justify-center items-center gap-1 text-yellow-400 text-sm mb-2">
            {[...Array(4)].map((_, i) => (
                <FaStar key={i} />
            ))}
            </div>

            <p className="text-blue-400 font-semibold text-lg mb-5">${product.price}</p>

            <div className="flex-grow" />
        </div>

        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => add(product)}
            className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-2xl shadow-md transition-colors duration-300"
        >
            Add to Cart
        </motion.button>
        </motion.div>
    );
};

export default Card;
