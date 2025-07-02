"use client";

import Card from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";

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

const SearchCollection = ({ input }: { input: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingAI, setLoadingAI] = useState(false);

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

            const prompt = `You are an intelligent search assistant.

                Your task:
                Based on the following user search input and the provided array of product titles, return only the titles that closely match the user's search.

                Guidelines:
                - Match if the user's input is found in the product title.
                - Perform a flexible match: accept partial matches, singular/plural variations, and close spelling.
                - Ignore case sensitivity.
                - Return ONLY a JSON array of the matched product titles. No extra text, no explanation.

                Input:
                User search: "${input}"
                Product titles array: ${JSON.stringify(allTitles)}

                Respond with:
                A JSON array of matched product titles. If no titles match, return an empty array: []`;

            try {
                const result = await getRespense(prompt);

                if (result && typeof result === "string") {
                    const matchedTitles: string[] = JSON.parse(result);

                    const matchedProducts = allProducts.filter((product) =>
                        matchedTitles.includes(product.title)
                    );

                    setProducts(matchedProducts);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching or parsing AI response:", error);
                setProducts([]);
            } finally {
                setLoadingAI(false);
            }
        };

        if (input && data?.products) {
            fetchResponse();
        } else {
            setProducts([]); 
        }
    }, [input, data]);

    if ((isLoading && products.length === 0) || loadingAI)
        return (
            <main className="max-w-screen-xl mx-auto py-12 px-6">
                <Loader />
            </main>
        );

    if (isError || !data?.products)
        return (
            <main className="max-w-screen-xl mx-auto py-12 px-6">
                <p className="text-center mt-6">Error, please check your network!</p>
            </main>
        );

    return (
        <article id="featured" className="py-12 px-6 max-w-screen-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">Search Results</h2>
            {products.length === 0 ? (
                <p className="text-gray-300">{`No products found for "${input}"`}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            )}
        </article>
    );
};

export default SearchCollection;
