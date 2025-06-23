

import Image from "next/image";
import { useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    images: string;
    createdAt: Date;
}

const ProductCart = (data:Product) => {

        const [count, setCount] = useState(1)

return (
    
    <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                <Image
                    src="/placeholder.png"
                    alt="Product"
                    fill
                    className="object-cover rounded"
                />
                </div>
                <div>
                <h4 className="font-medium">{data.name}</h4>
                <p className="text-gray-400 text-sm">Quantity: {count}</p>
                <p className="text-gray-200 mt-1">Price: {data.price} MAD</p>
                </div>
            </div>
            <div className="space-x-4">
                <button className="text-gray-300 hover:text-red-700 transition">
                    <FaMinus onClick={()=> setCount(count -1)} />
                </button>
                <button className="text-green-300 hover:text-gray-500 transition">
                    <FaPlus onClick={()=> setCount(count +1)} />
                </button>
                <button className="text-red-500 hover:text-red-700 transition">
                    <FaTrashAlt />
                </button>
                </div>
            
            </div>

  )
}

export default ProductCart
