

import Image from "next/image";

const Card = ({ name, description, price, rating }: {
    name: string;
    description: string;
    price: number;
    rating: string;
    // imageSrc: string;
}) => {
    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200">
            <header className="flex justify-center">
                <Image
                src="/smartWatch.jpg"
                alt={`Image of ${name}`}
                width={200}
                height={200}
                className="rounded-md object-cover"
                />
            </header>
            <section className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="text-xl font-bold text-green-600">{price} MAD</p>
                <p className="text-yellow-500 font-medium">⭐ {rating}</p>
            </section>
            <footer className="mt-4 flex justify-center">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Add to Cart
                </button>
            </footer>
        </article>
);
};

export default Card;
