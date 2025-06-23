
"use client"

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
}

const Card = ({ product }: {
    product: Product
}) => {

    const addProduct = useStore((state) => state.addProduct)

    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200">
            <header className="flex justify-center">
                <Image
                src={`data:image/png;base64,${product.images[0]}`}
                alt={`Image of ${product.name}`}
                width={200}
                height={200}
                priority={true}
                className="rounded-md object-cover"
                />
            </header>
            <section className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600">see More</p>
                <p className="text-xl font-bold text-green-600">{product.price} MAD</p>
                <p className="text-yellow-800 font-medium">⭐ {product.price}</p>
            </section>
            <footer className="mt-4 flex justify-center">
                <button onClick={()=> addProduct(product)} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Add to Cart
                </button>
            </footer>
        </article>
);
};

export default Card;
