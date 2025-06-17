
"use server"

import Card from "./card";

interface Product {
    name: string;
    description: string;
    price: number;
    rating: string;
    // images: string;
}

const Products = async () => {


    const response = await fetch("http://localhost:3000/api/products");

        const { products }: { products: Product[] } = await response.json();


        console.log(products)

        return (
        <section className="container mx-auto p-6">
            {products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, i) => (
                <Card
                    key={i}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    // imageSrc={product.images}
                />
                ))}
            </div>
        ) : (
            <h2 className="text-center text-gray-500 text-lg">No products available.</h2>
            )}
        </section>
        );


//     try {
//         const response = await fetch("http://localhost:3000/api/products");

//         const products: Product[] = await response.json();

//         console.log(products)

//         return (
//         <section className="container mx-auto p-6">
//             {products ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {products.map((product, i) => (
//                 <Card
//                     key={i}
//                     name={product.name}
//                     description={product.description}
//                     price={product.price}
//                     rating={product.rating}
//                     imageSrc={product.images}
//                 />
//                 ))}
//             </div>
//         ) : (
//             <h2 className="text-center text-gray-500 text-lg">No products available.</h2>
//             )}
//         </section>
//         );
//     } catch (error: unknown) {
//         let errorMessage = "An unexpected error occurred.";

//         if (error instanceof Error) {
//             errorMessage = error.message;
//     }

//     return <h2 className="text-center text-red-600 text-lg">{errorMessage}</h2>;
// }

};

export default Products;
