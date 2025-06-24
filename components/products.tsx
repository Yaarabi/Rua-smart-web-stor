"use server";

import Card from "./card";

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
    quantity: number;
}

const Products = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const { products }: { products: Product[] } = await response.json();

    return (
        <section className="w-full max-w-screen-xl mx-auto px-4 md:px-12 py-8">
            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <h2 className="text-center text-gray-500 text-lg">No products available.</h2>
            )}
        </section>
    );
};

export default Products;
