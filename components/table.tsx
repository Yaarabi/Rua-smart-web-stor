"use client";

import { useState, useMemo } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "./loading";
import Image from "next/image";
import { useDeleteProduct } from "@/app/hooks/forProduct";
import Loader from "./loader";
import ProductUpdate from "./productUpdate";

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

const Table = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
        },
    });

    const deleteProduct = useDeleteProduct();

    const remove = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
        deleteProduct.mutate(id);
        }
    };

    const categories = [
        { label: "All", value: "All" },
        { label: "Phones", value: "phones" },
        { label: "PCs", value: "pc" },
        { label: "Watches", value: "watch" },
        { label: "Tablets", value: "tablet" },
        { label: "Cameras", value: "cameras" },
        { label: "Earbuds", value: "earbuds" },
    ];

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "All") return data?.products ?? [];
        return data?.products.filter((p: Product) => p.category === selectedCategory) ?? [];
    }, [data, selectedCategory]);

    if (isLoading) return <Skeleton />;
    if (isError || !data?.products)
        return <p className="text-red-500 text-center mt-6">Failed to load products.</p>;
    if (deleteProduct.isPending) return <Loader />;

    return (
        <div className="mt-10">
        <div className="mb-4 flex justify-end">
            <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-md border border-gray-300 text-sm bg-white text-black"
            >
            {categories.map(({ label, value }) => (
                <option key={value} value={value}>
                {label}
                </option>
            ))}
            </select>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
            <table className="w-full table-auto text-sm text-gray-200 bg-gray-800">
            <thead className="bg-gray-700 text-xs uppercase text-gray-300">
                <tr>
                <th className="p-4">#</th>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredProducts.map((product: Product, i: number) => (
                <tr
                    key={product._id}
                    className="hover:bg-gray-700 transition duration-200 border-t border-gray-600"
                >
                    <td className="p-4 text-center">{i + 1}</td>
                    <td className="p-4 text-center">
                    {product.images ? (
                        <Image
                        alt={product.name}
                        src={`data:image/png;base64,${product.images[0]}`}
                        width={40}
                        height={40}
                        className="object-cover rounded-md mx-auto"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                    )}
                    </td>
                    <td className="p-4 text-center">{product.name}</td>
                    <td className="p-4 text-center">{product.price} MAD</td>
                    <td className="p-4 text-center">{product.stock}</td>
                    <td className="p-4 text-center">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    </td>
                    <td className="p-4 flex justify-center items-center gap-4">
                    <ProductUpdate product={product} />
                    <button
                        onClick={() => remove(product._id)}
                        className="text-red-400 hover:text-red-600 transition"
                        title="Delete Product"
                    >
                        <FaTrashCan size={18} />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default Table;
