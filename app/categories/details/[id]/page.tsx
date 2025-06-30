"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useStore from "@/zustand/store";
import Loader from "@/components/loader";

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

    if (isLoading)
        return (
            <main className="max-w-screen-xl mx-auto py-12 px-6 min-h-screen flex items-center justify-center bg-gray-100">
                <Loader />
            </main>
        );

    if (isError || !data.product)
        return (
            <main className="max-w-screen-xl mx-auto py-12 px-6 min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-center text-xl">Failed to load product.</p>
            </main>
        );

    return (
        <main className="max-w-screen-xl mx-auto py-12 px-6 min-h-screen">
            <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-center">
                    <Image
                        src={`data:image/png;base64,${data.product.images}`}
                        alt={data.product.title}
                        width={500}
                        height={400}
                        style={{ objectFit: "contain" }}
                        className="rounded-xl"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold mb-4">{data.product.title}</h1>
                    <p className="text-2xl text-blue-600 mb-4">${data.product.price}</p>

                    <div className="flex items-center mb-4">
                        {Array.from({ length: data.product.rating }).map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 mr-1" />
                        ))}
                    </div>

                    <p className="text-lg text-gray-700 mb-6">{data.product.description}</p>

                    <button
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => add(data.product)}
                        className={`px-6 py-3 bg-gray-900 text-white rounded-lg transition-all duration-300 transform ${hovered ? 'scale-105 bg-gray-800' : 'scale-100'}`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
