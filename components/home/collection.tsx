

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



    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`);;
    const { products }: { products: Product[] } = await response.json();

    
    return (
        <article id="featured" className="py-12 px-6 max-w-screen-xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Our Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product._id} product={product}/>
                ))}
            </div>
        </article>
    );
}

export default Collection
