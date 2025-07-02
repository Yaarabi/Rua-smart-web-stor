"use client"

import { useQuery } from "@tanstack/react-query";
import Loader from "../loader";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";
import Card from "../card";
import Link from "next/link";

interface Purchase {
    name: string;
}

interface Props {
    purchase: Purchase[];
    customer: string;
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
    rating: number;
    createdAt: Date;
    quantity: number;
}

const Thanks = ({ purchase, customer }: Props) => {
    const [loadingAI, setLoadingAI] = useState(false);
    const [matched, setProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
        },
    });

    
    useEffect(() => {
        const fetchResponse = async () => {
            if (!data?.products) return;
            
            setLoadingAI(true);
            
            const allProducts: Product[] = data.products;
            const allTitles = allProducts.map((product) => product.title);
            
            const thankPrompt = `You are a friendly, professional seller Rua web Store. A customer named ${customer} just completed a purchase. Please write a warm and grateful thank-you message for their purchase. Also invite them to explore the product catalog below which features items related to their recent purchase. You can recommend bsed on ${allTitles.join(", ")}.
            there purchase includes: ${purchase.map(p => p.name).join(", ")}.
            Keep it concise and engaging. that in just 10 to 30 words.
            and if it's good include link to categpries "rua-smart-web-store-git-main-youssef-aarabis-projects.vercel.app/categories"`;

            const productsPrompt = `
                The customer purchased these items: ${purchase.map(p => p.name).join(", ")}.
                Given the following product catalog titles:
                ${allTitles.join(", ")}

                Please recommend 3 to 6 product titles **only from this catalog** that are most related or complementary to the customer's purchase. 
                Do not suggest any product titles outside this list.

                ⚡️ Return only a valid JSON array of the recommended product titles.
                ⚡️ Do NOT include any explanations, commentary, or formatting.
                ⚡️ Example output: ["Product Title 1", "Product Title 2", "Product Title 3"]

                Only return the JSON array, nothing else.
                `;



            try {
                const thank = await getRespense(thankPrompt);
                if(thank){
                    setMessage(thank)
                }
                const result = await getRespense(productsPrompt);

                if (result && typeof result === "string") {
                    const matchedTitles: string[] = JSON.parse(result);
                    const matchedProducts = allProducts.filter((product) =>
                        matchedTitles.includes(product.title)
                );
                setProducts(matchedProducts)
                    
                } else {
                    
                }
            } catch (error) {
                console.error("Error fetching or parsing AI response:", error);
                
            } finally {
                setLoadingAI(false);
            }
        };

        if (data?.products) {
            fetchResponse();
        }
    }, [data, purchase, customer]);

    if ((isLoading && matched.length === 0) || loadingAI) {
        return (
        <main className="max-w-screen-xl mx-auto py-12 px-6 flex justify-center items-center min-h-[60vh]">
            <Loader />
        </main>
        );
    }

    if (isError || !data?.products) {
        return (
        <main className="max-w-screen-xl mx-auto py-12 px-6">
            <p className="text-center mt-6 text-red-500 font-semibold">
            Error loading products. Please check your network and try again.
            </p>
        </main>
        );
    }

    return (
        <main className="max-w-screen-xl min-h-screen mx-auto py-12 px-6">
        <section className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thank You, {customer}!</h2>
            <p className="text-gray-700 whitespace-pre-line">{message}</p>
            <Link href="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Go Back
            </Link>
        </section>

        {matched.length > 0 && (
            <section>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Recommended Products for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {matched.map((product, i:number) => (
                    <Card key={i} product={product}/>
                ))}
            </div>
            </section>
        )}
        </main>
    );
};

export default Thanks;
