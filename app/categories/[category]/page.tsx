
"use client"

import Card from "@/components/card";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import Categories from "@/components/home/categories";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    rating: number;
    createdAt: Date;
    quantity: number;
}


const Collection = () => {

    const params = useParams(); 
    const category = params?.category as string;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["category", category],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?category=${category}`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
        enabled: !!category, 
    });

    if (isLoading) return <main className="max-w-screen-xl mx-auto py-12 px-6 ">
                            <Categories/>
                            <Loader />
                            </main>;
    if (isError || !data.products)
        return <main className="max-w-screen-xl mx-auto py-12 px-6">
                <Categories/>
                <p className="text-center mt-6">Failed to load product or No product in this category.</p>;
            </main>;
        


    
    return (
        <>
        <Categories/>
        <article id="featured" className="py-12 px-6 max-w-screen-xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Our Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {data.products.map((product: Product) => (
                    <Card key={product._id} product={product}/>
                ))}
            </div>
        </article>
        </>
    );
}

export default Collection
