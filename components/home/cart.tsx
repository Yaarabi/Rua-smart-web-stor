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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 z-50 px-4 md:px-0">
            <div className="w-full max-w-sm h-[90vh] bg-gray-700 text-white p-6 rounded-2xl shadow-lg flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition text-xl"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                    {products.length > 0 ? (
                        products.map((ele: Product, i: number) => (
                            <ProductCart key={i} product={ele} />
                        ))
                    ) : (
                        <p className="text-gray-300 text-center mt-10">Your cart is empty.</p>
                    )}
                </div>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold">{total} MAD</span>
                    </div>
                    <button
                        disabled={products.length === 0}
                        onClick={toPayement}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg disabled:opacity-50"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
