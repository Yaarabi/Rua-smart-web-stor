import { useState, useEffect } from "react";
import { usePutParoduct } from "@/app/hooks/forProduct";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import Posting from "./btnPatient";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    images: string;
    }

interface Form {
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    images: string;
    }

const ProductUpdate = ({ product }: { product: Product }) => {
    const [toUpdate, setToUpdate] = useState(false);

    const [form, setForm] = useState<Form>({
        name: product.name,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        images: product.images,
    });

    const putProduct = usePutParoduct();

    useEffect(() => {
        if (putProduct.isSuccess) {
        setToUpdate(false);
        }
    }, [putProduct.isSuccess]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === "images" && files && files.length > 0) {
        const reader = new FileReader();
        const file = files[0];

        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (base64String) {
            setForm((prev) => ({ ...prev, images: base64String }));
            }
        };

        reader.onerror = (error) => {
            console.error("Error encoding image:", error);
        };

        reader.readAsDataURL(file);
        } else {
        setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        putProduct.mutate({ product: form, id: product._id });
    };

    return (
        <>
        {!toUpdate && (
            <FaEdit
            size={18}
            onClick={() => setToUpdate(true)}
            className="cursor-pointer text-blue-400 hover:text-blue-600 transition"
            />
        )}

        {toUpdate && (
            <div className="max-w-xl mx-auto bg-gray-700 p-6 w-full fixed top-10 left-1/2 transform -translate-x-1/2 rounded-xl shadow-lg z-50">
            <button
                onClick={() => setToUpdate(false)}
                className="text-white hover:text-indigo-400 transition mb-4 flex items-center"
            >
                <FaArrowLeft className="text-xl mr-2" />
                Back
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Update Product</h2>


                <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                    Product Name
                </label>
                <input
                    id="name"
                    name="title"
                    placeholder="e.g., Rua Smart Watch"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                </div>

                <div>
                <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Brief product description..."
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm text-gray-300 mb-1">
                    Price
                    </label>
                    <input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm text-gray-300 mb-1">
                    Stock
                    </label>
                    <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="ratings" className="block text-sm text-gray-300 mb-1">
                    Unique Name
                    </label>
                    <input
                    id="ratings"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm text-gray-300 mb-1">
                    Category
                    </label>
                    <input
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="images" className="block text-sm text-gray-300 mb-1">
                    Upload Image
                </label>
                <input
                    type="file"
                    name="images"
                    id="images"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                </div>

                <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    className="px-6 py-2 bg-gray-200 text-indigo-600 rounded-md hover:bg-gray-300 transition flex items-center"
                    disabled={!form.title || !form.description}
                >
                    Try by AI
                </button>

                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center disabled:opacity-50"
                    disabled={!form.title || !form.description || !form.price || !form.stock}
                >
                    {putProduct.isPending ? <Posting /> : "Update"}
                </button>
                </div>
            </form>
            </div>
        )}
        </>
    );
};

export default ProductUpdate;
