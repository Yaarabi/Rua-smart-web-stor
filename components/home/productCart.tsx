

import Image from "next/image";
import { useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
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
    quantity: number
}

const ProductCart = ({ product }: { product:Product }) => {

    const increment = useStore((state) => state.incrementQuantity)
    const decrement = useStore((state) => state.decrementQuantity)
    const remove = useStore((state)=> state.removeProduct)
        const [totalProductPrice, setTotalProductPrice] = useState<number>(product.price)

        const handelMinus = () => {
            if(product.quantity <= 0){
                setTotalProductPrice(0)
            }else {
                setTotalProductPrice(totalProductPrice - product.price)
                decrement(product._id)
            }
        }
        const handelAdd = ()=>{ setTotalProductPrice(totalProductPrice + product.price); increment(product._id)}

        

return (
    
    <div className="flex items-center justify-between border-b border-gray-900 pb-4">
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
                <p className="text-gray-400 text-sm">Quantity: {product.quantity}</p>
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
                    <FaTrashAlt onClick={()=> remove(product._id)} />
                </button>
                </div>
            
            </div>

)
}

export default ProductCart
