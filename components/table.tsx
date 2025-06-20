    "use client";

import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";

    interface Product {
    name: string;
    description: string;
    price: number;
    ratings: string;
    createdAt: string;
    // images: string;
    }

const Table = () => {
    const {data, isLoading, isError,} = useQuery({
                    queryKey: ["products"],
                    queryFn: async () => {
                    const response = await fetch("http://localhost:3000/api/products");
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.json();
        },
    });

    if (isLoading) return <p className="text-white text-center mt-6">Loading products...</p>;
    if (isError || !data?.products) return <p className="text-red-500 text-center mt-6">Failed to load products.</p>;

    return (
        <table className="w-full border border-gray-300 mt-8 text-center rounded shadow-md">
        <thead className="bg-gray-400 text-gray-700">
            <tr className="border border-white">
            <th className="p-2 border border-white">N</th>
            <th className="p-2 border border-white">Date</th>
            <th className="p-2 border border-white">Images</th>
            <th className="p-2 border border-white">Title</th>
            <th className="p-2 border border-white">Price</th>
            <th className="p-2 border border-white">Stock</th>
            <th className="p-2 border border-white">Action</th>
            </tr>
        </thead>
        <tbody>
            {data.products.map((product: Product, i: number) => (
            <tr key={i} className="hover:bg-gray-600 transition">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
                </td>
                <td className="p-2 border">—</td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.price} MAD</td>
                <td className="p-2 border">In stock</td>
                <td className="p-2 border flex justify-center space-x-4 cursor-pointer">
                    
                    <FaEdit size={18}/>
                    <FaTrashCan size={18} />
                    
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
    };

    export default Table;
