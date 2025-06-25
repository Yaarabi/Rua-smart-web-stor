"use client";

import Image from "next/image";
import { useState } from "react";
import useStore from "@/zustand/store";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    createdAt: Date;
    quantity: number;
}

interface ProductCardProps {
    product: Product;
}

const Card = ({ product }: ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const add = useStore((state)=> state.addProduct)

    return (
        <div
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-300 relative group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="w-full h-40 relative mb-4">
                <Image
                    src={`data:image/png;base64,${product.images[0]}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                />
            </div>
            <h2 className="text-lg font-semibold">
                {product.name}<sup className="text-xs">8</sup>
            </h2>
            <p className="text-gray-500 text-sm">{product.title}</p>
            <div className="mt-4 flex items-center justify-between text-gray-700">
                <span className="font-semibold">${product.price}</span>
                <button
                    onClick={()=> add(product)}
                    className={`px-3 py-1 bg-gray-900 text-white text-sm rounded-md transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;
