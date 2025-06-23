    "use client";

import { FaTimes } from "react-icons/fa";
import ProductCart from "./productCart";
import useStore from "@/zustand/store";
import { useEffect, useState } from "react";

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
}

const Cart = ({ onClose }: CartProps) => {

    const products = useStore((state) => state.products)
    const [ total, setTotal ] = useState<number>(0)

    const handleTotal = () => {
        const sum = products.reduce((acc, ele) => acc + ele.price, 0);
        setTotal(sum);
};
    useEffect(()=>{
        handleTotal()
    },[])

    return (
        <div className="fixed top-12 right-0 w-full max-w-sm h-4/5 bg-gray-900 text-white p-6 shadow-lg z-50 flex flex-col overflow-x-auto rounded-xl shadow-lg border border-gray-300">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-xl"
            >
            <FaTimes />
            </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">

            { products.map((ele: Product, i:number) => <ProductCart key={i} product={ele}/> ) }

        </div>

        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">{total} MAD</span>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg">
            Proceed to Checkout
            </button>
        </div>
        </div>
    );
};

export default Cart;
