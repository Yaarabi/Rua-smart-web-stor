
"use server"
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


interface Product {
    name: string;
    description: string;
    price: number;
    ratings: string;
    createdAt: string,
  // images: string;
}

const Table = async () => {


    const response = await fetch("http://localhost:3000/api/products");
    const { products }: { products: Product[] } = await response.json();
        console.log(products)
    return (
        <table className="w-full border border-gray-300 mt-8 text-center">
        <thead>
            <tr>
                <th className="p-2 border border-gray-200">N</th>
                <th className="p-2 border border-gray-200">Date</th>
                <th className="p-2 border border-gray-200">Images</th>
                <th className="p-2 border border-gray-200">Title</th>
                <th className="p-2 border border-gray-200">Price</th>
                <th className="p-2 border border-gray-200">Stock</th>
                <th className="p-2 border border-gray-200">Action</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, i) => (
            <tr key={i} className="border-t border-gray-200">
                <td className="p-2 border border-gray-200">{ i+1 }</td>
                <td className="p-2 border border-gray-200">{new Date(product.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'numeric',
                                                                    day: 'numeric',
                                                                })}</td>
                <td className="p-2 border border-gray-200">...</td>
                <td className="p-2 border border-gray-200">{product.name}</td>
                <td className="p-2 border border-gray-200">{product.price} MAD</td>
                <td className="p-2 border border-gray-200">In stock</td>
                <td className="p-2 border border-gray-200 flex items-center justify-center space-x-4">
                    <FaEdit size={20}/>
                    <FaTrashCan size={20}/>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
);
};

export default Table;
