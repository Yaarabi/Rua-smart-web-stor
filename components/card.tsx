"use client";

import Image from "next/image";
import { useState } from "react";
import useStore from "@/zustand/store";
import { FaStar, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
        <div
            className="relative bg-gray-900 text-white p-4 shadow hover:bg-gray-800 cursor-pointer flex flex-col items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered && (
                <FaEye
                    size={30}
                    className="absolute z-50 top-6 right-4 text-gray-100 rounded-full text-xl cursor-pointer hover:text-gray-400 transition"
                    onClick={() => router.push(`/details/${product._id}`)}
                />
            )}

            <div className="h-50 w-60 mb-4 relative">
                <Image
                    src={`data:image/png;base64,${product.images}`}
                    alt={product.name}
                    fill
                    unoptimized
                    style={{ objectFit: "contain" }}
                    className="object-cover"
                />
            </div>

            <h4 className="font-semibold mb-1">{product.name}</h4>
            <p className="mb-2">${product.price}</p>
            <div className="flex mb-4">
                {Array.from({ length: product.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                ))}
            </div>

            <button
                onClick={() => {
                    alert("hello");
                    add(product);
                }}
                className="bg-blue-700 hover:bg-gray-600 text-white py-2 px-4 w-full"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default Card;
