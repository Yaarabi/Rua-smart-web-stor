

import Card from "../card";



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


const Collection = async () => {


        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });

    const { products }: { products: Product[] } = await response.json();

    
    return (
        <article id="featured" className="py-12 px-6 max-w-screen-xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Our Collection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {products.map((product) => (
                    <div key={product._id} className="w-full max-w-[250px]">
                    <Card product={product} />
                    </div>
                ))}
            </div>
        </article>
    );
}

export default Collection
