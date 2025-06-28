
"use client";

import Card from "@/components/card"; 

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

interface CategoryPageProps {
    categoryName: string;
    products: Product[];
}

const Category = ({ categoryName, products }: CategoryPageProps) => {
    return (
        <main className="max-w-screen-xl mx-auto py-12 px-6 min-h-screen bg-gray-100">
            <h2 className="text-4xl font-bold mb-10 text-center">{categoryName}</h2>

            <article id="featured" className="py-12 px-6 max-w-screen-xl mx-auto text-center">
                <h3 className="text-3xl font-bold mb-8">Featured Products</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </article>
        </main>
    );
};

export default Category;
