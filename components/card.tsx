"use client";

import Image from "next/image";
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

const Card = ({ product }: { product: Product }) => {
    const addProduct = useStore((state) => state.addProduct);

    return (
        <article className="bg-white shadow hover:shadow-lg transition-all duration-300 p-4 max-w-xs mx-auto flex flex-col justify-between">
            <header className="flex justify-center items-center h-48 mb-4 overflow-hidden rounded-xl bg-gray-100">
                <Image
                    src={`data:image/png;base64,${product.images[0]}`}
                    alt={`Image of ${product.name}`}
                    width={180}
                    height={180}
                    priority
                    className="object-contain hover:scale-105 transition-transform duration-300"
                />
            </header>

            <section className="flex flex-col gap-2 text-center">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
                <p className="text-sm text-gray-600">
                    Price: <span className="text-green-600 font-bold">{product.price} MAD</span>
                </p>
            </section>

            <footer className="mt-4">
                <button
                    onClick={() => addProduct(product)}
                    className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 w-full"
                >
                    Add to Cart
                </button>
            </footer>
        </article>
    );
};

export default Card;
