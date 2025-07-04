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
            whileHover={{ scale: 1.02 }}
            className="relative p-4 shadow-md hover:shadow-xl cursor-pointer flex flex-col rounded-2xl bg-white transition-all duration-300 h-[370px] border hover:border-blue-500"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md"
                >
                    <FaEye
                        size={20}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        onClick={() => router.push(`/categories/details/${product._id}`)}
                    />
                </motion.div>
            )}

            <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                    src={`data:image/png;base64,${product.images}`}
                    alt={product.name}
                    width={300}
                    height={250}
                    unoptimized
                    className="object-contain max-h-40 transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="flex flex-col flex-grow text-center">
                <h4 className="font-semibold text-lg mb-1 line-clamp-2 text-gray-800">{product.title}</h4>
                <p className="mb-2 text-blue-600 font-bold text-lg">${product.price}</p>

                <div className="flex justify-center mb-3">
                    {Array.from({ length: product.rating }).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                    ))}
                </div>

                <div className="flex-grow" />
            </div>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => add(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 w-full rounded-xl transition-all duration-300 mt-3"
            >
                Add to Cart
            </motion.button>
        </motion.div>
    );
};

export default Card;
