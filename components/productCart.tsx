

import Image from "next/image";
import { useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

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

const ProductCart = ({ product }: { product:Product }) => {

        const [count, setCount] = useState(1)
        const [totalProductPrice, setTotalProductPrice] = useState(product.price)

        const handelMinus = () => {
            if(count <= 0){
                setCount(0)
                setTotalProductPrice(0)
            }else {
                setCount(count -1)
                setTotalProductPrice(totalProductPrice - product.price)
            }
        }
        const handelAdd = ()=>{ setCount(count +1); setTotalProductPrice(totalProductPrice + product.price)}

        

return (
    
    <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                <Image
                    src={`data:image/png;base64,${product.images[0]}`}
                    alt="Product"
                    fill
                    className="object-cover rounded"
                />
                </div>
                <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-gray-400 text-sm">Quantity: {count}</p>
                <p className="text-gray-200 mt-1">Price: {totalProductPrice} MAD</p>
                </div>
            </div>
            <div className="space-x-4">
                <button className="text-gray-300 hover:text-red-700 transition">
                    <FaMinus onClick={handelMinus} />
                </button>
                <button className="text-green-300 hover:text-gray-500 transition">
                    <FaPlus onClick={handelAdd} />
                </button>
                <button className="text-red-500 hover:text-red-700 transition">
                    <FaTrashAlt />
                </button>
                </div>
            
            </div>

)
}

export default ProductCart
