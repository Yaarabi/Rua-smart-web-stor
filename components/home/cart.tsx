"use client";

import { FaTimes } from "react-icons/fa";
import ProductCart from "./productCart";
import useStore, { useTotal } from "@/zustand/store";
import { useRouter } from "next/navigation";

interface CartProps {
    onClose: () => void;
}

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

const Cart = ({ onClose }: CartProps) => {
    const router = useRouter();
    const products = useStore((state) => state.products);
    const total = useTotal();

    const toPayement = () => {
        localStorage.setItem("order", JSON.stringify(products));
        router.push("/payment");
    };

    return (
        <div className="fixed md:top-15 md:right-6 inset-0 z-50 flex justify-end">
            <div className="w-full md:w-[40vw] max-w-sm h-[90vh] bg-gray-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition text-2xl p-1 rounded-full hover:bg-gray-700"
                        aria-label="Close Cart"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    {products.length > 0 ? (
                        products.map((ele: Product, i: number) => (
                            <ProductCart key={i} product={ele} />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
                    )}
                </div>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Total:</span>
                        <span className="text-2xl font-extrabold text-green-400">{total} MAD</span>
                    </div>
                    <button
                        disabled={products.length === 0}
                        onClick={toPayement}
                        className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
