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
            whileHover={{ scale: 1.01 }}
            className="relative bg-white text-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg cursor-pointer flex flex-col transition-all duration-300 h-[350px] border"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4 z-50"
                >
                    <FaEye
                        size={26}
                        className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
                        onClick={() => router.push(`/categories/details/${product._id}`)}
                    />
                </motion.div>
            )}

            <div className="h-48 w-full mb-4 relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                <Image
                    src={`data:image/png;base64,${product.images}`}
                    alt={product.name}
                    width={160}
                    height={160}
                    unoptimized
                    className="object-contain max-h-44"
                />
            </div>

            <div className="flex flex-col flex-grow text-center">
                <h4 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h4>
                <p className="mb-2 text-blue-600 font-semibold">${product.price}</p>

                <div className="flex justify-center mb-4">
                    {Array.from({ length: product.rating }).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                    ))}
                </div>

                <div className="flex-grow" />
            </div>

            <button
                onClick={() => add(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 w-full rounded-lg transition-all duration-300 mt-2"
            >
                Add to Cart
            </button>
        </motion.div>
    );
};

export default Card;
