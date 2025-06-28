"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation"; 
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useStore from "@/zustand/store";
import Loader from "@/components/loader";

// interface Product {
//     _id: string;
//     name: string;
//     title: string;
//     description: string;
//     price: number;
//     category: string;
//     stock: string;
//     images: string;
//     rating: number;
//     createdAt: Date;
//     quantity: number;
// }

const ProductPage = () => {
    const add = useStore((state) => state.addProduct);
    const [hovered, setHovered] = useState(false);
    const params = useParams(); 
    const id = params?.id as string;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/products?id=${id}`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
        enabled: !!id, 
    });

    if (isLoading) return <main className="max-w-screen-xl mx-auto py-12 px-6 min-h-screen bg-gray-100"><Loader />
    </main>;
    if (isError || !data.product)
        return <p className="text-red-500 text-center mt-6">Failed to load product.</p>;

    return (
        <main className="max-w-screen-xl mx-auto py-12 px-6 min-h-screen mt-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <Image
                        src={`data:image/png;base64,${data.product.images}`} 
                        alt={data.product.title}
                        width={500}
                        height={400}
                        style={{ objectFit: "contain" }}
                        className="rounded-xl"
                    />

                <div>
                    <h1 className="text-4xl font-bold mb-4">{data.product.title}</h1>
                    <p className="text-2xl text-gray-700 mb-4">${data.product.price}</p>
                    <div className="flex items-center mb-4">
                        {Array.from({ length: data.product.rating }).map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 mr-1" />
                        ))}
                    </div>
                    <p className="text-2xl text-gray-700 mb-4">{data.product.description}</p>
                    <button
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => add(data.product)}
                        className={`px-6 py-2 bg-gray-900 text-white rounded-lg transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-90'}`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
