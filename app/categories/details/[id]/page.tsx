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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
        },
        enabled: !!id,
    });

    if (isLoading)
        return (
        <main className="max-w-screen-xl mx-auto py-16 px-6 min-h-screen flex items-center justify-center bg-gray-50">
            <Loader />
        </main>
        );

    if (isError || !data.product)
        return (
        <main className="max-w-screen-xl mx-auto py-16 px-6 min-h-screen flex items-center justify-center">
            <p className="text-red-600 text-center text-xl font-semibold">Failed to load product.</p>
        </main>
        );

    return (
        <main className="max-w-screen-xl mx-auto py-16 px-6 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-center">
            <Image
                src={`data:image/png;base64,${data.product.images}`}
                alt={data.product.title}
                width={520}
                height={420}
                style={{ objectFit: "contain" }}
                className="rounded-2xl shadow-md"
            />
            </div>

            <div className="flex flex-col">
            <h1 className="text-5xl font-extrabold mb-6 text-gray-900">{data.product.title}</h1>

            <p className="text-3xl font-bold text-blue-600 mb-6">${data.product.price}</p>

            <div className="flex items-center mb-6">
                {[...Array(4)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
            </div>

            <p className="text-lg text-gray-700 mb-10 leading-relaxed">{data.product.description}</p>

            <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => add(data.product)}
                className={`inline-block px-8 py-4 rounded-xl font-semibold text-white bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out ${
                hovered ? "scale-105 bg-gray-800 shadow-xl" : "scale-100"
                }`}
            >
                Add to Cart
            </button>
            </div>
        </div>
        </main>
    );
};

export default ProductPage;
