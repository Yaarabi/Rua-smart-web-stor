    "use client";

    import { useEffect, useState } from "react";
    import { FaArrowLeft } from "react-icons/fa";
    import useCreateProduct from "@/app/hooks/createProduct";

    interface Props {
    action: () => void;
    prompt: {
        title : string;
        about : string;
    }
    }

    interface Form {
        name: string;
        description: string;
        price: string;
        category: string;
        stock: string;
        ratings: string;
        images: string;
        }



    const AddProductForm = ({ action, prompt }: Props) => {

    
    const [form, setForm] = useState<Form>({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        ratings: "",
        images: "",
    });

    useEffect(() => {
        console.log(prompt)
    },[prompt])
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const createProduct = useCreateProduct();

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProduct.mutate(form);
    };

return (
    <>
        <button onClick={action} className="text-white hover:text-indigo-400 transition">
            <FaArrowLeft className="text-xl" />
        </button>
        <div className="max-w-xl mx-auto px-4 mt-6">

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <h2 className="text-2xl font-semibold text-white">Add New Product</h2>

            <div>
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                Product Name
            </label>
            <input
                id="name"
                name="name"
                placeholder="e.g., Rua Smart Watch"
                value={form.name}
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
                Rating
                </label>
                <input
                id="ratings"
                name="ratings"
                type="number"
                value={form.ratings}
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
                Image URLs (comma-separated)
            </label>
            <input
                id="images"
                name="images"
                placeholder="https://..., https://..."
                value={form.images}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
            {createProduct.isPending ? "Posting..." : "Add Product"}
            </button>
        </form>
        </div>
    </>
    );
    };

    export default AddProductForm;
