
"use server"

import Card from "./card";

interface Product {
    title: string;
    description: string;
    price: number;
    ratings: string;
    // images: string;
}

const Products = async () => {


    const response = await fetch("http://localhost:3000/api/products");

        const { products }: { products: Product[] } = await response.json();


        // console.log(products)

        return (
        <section className="container mx-auto p-6">
            {products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, i) => (
                <Card
                    key={i}
                    name={product.title}
                    price={product.price}
                    rating={product.ratings}
                    // imageSrc={product.images}
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
