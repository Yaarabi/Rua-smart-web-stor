    "use client";


import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "./loading";
import Image from "next/image";
import { useDeleteProduct } from "@/app/hooks/createProduct";
import Loader from "./loader";
import ProductUpdate from "./productUpdate";



interface Product {
        _id:string;
        name: string;
        title: string,
        description: string;
        price: string;
        category: string;
        stock: string;
        images: string;
        createdAt: Date;
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

    const deleteProduct = useDeleteProduct()
    
    const remove = async (id: string) => {
        const confirmed = window.confirm("Are you sure to delete this product?");
        console.log("User confirmed?", confirmed);
        if (confirmed) {
            deleteProduct.mutate(id);
}
    }

    if (isLoading) return <Skeleton/>;
    if (isError || !data?.products) return <p className="text-red-500 text-center mt-6">Failed to load products.</p>;
    if (deleteProduct.isPending) return <Loader/>
    
    

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
                <td className="p-2 border"> <Image alt="product image" src={(product.images) ? `data:image/png;base64,${product.images[0]}` : "---"} width={20} height={20} /> </td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.price} MAD</td>
                <td className="p-2 border">{ product.stock }</td>
                <td className="p-2 border flex justify-center space-x-4 cursor-pointer">
                    
                    <ProductUpdate product={product} />
                    <FaTrashCan size={18} onClick={()=> remove(product._id)} />
                    
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
    };

    export default Table;
