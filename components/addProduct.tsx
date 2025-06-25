    "use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useCreateProduct } from "@/app/hooks/createProduct";
import getRespense from "@/app/hooks/getIArespense";
import Loader from "./loader";
import Posting from "./btnPatient";

interface Props {
    action: () => void;
    forPrompt: string;
    forLoading: boolean;
}

interface Form {
    id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    ratings: string;
    images: string;
    createdAt: Date;
}

const AddProductForm = ({ action, forPrompt, forLoading }: Props) => {
    const titlePrompt = `Generate a product title based on the following:

    - About this product ${forPrompt}

    Requirements:
    - Return only the final title, nothing else
    - Do not include quotes, brackets, or any label (e.g., no "Title:", no "response:")
    - The title must be clear, SEO-friendly, emotionally engaging, and under 9 words`;

    const descriptionPrompt = `Write a compelling product description for an e-commerce listing.

    Inputs:
    - About this product ${forPrompt}

    Guidelines:
    - Focus on key benefits and emotional appeal
    - Write in a modern, persuasive tone that’s SEO-friendly
    - Keep the description under 100 words
    - Do not include a title or extra labels
    - Output only the description text. No bullet points or headings, and under 20 words.`;

    const [titleByIA, setTitleByIA] = useState<string | null>(null);
    const [descriptionByIA, setDescriptionByIA] = useState<string | null>(null);
    const [retry, setRetry] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    const tryAgainGenerate = () => {
        setIsRetrying(true);
        setRetry((prev) => !prev);
    };

    useEffect(() => {
        const fetchResponse = async () => {
        const title = await getRespense(titlePrompt);
        const description = await getRespense(descriptionPrompt);
        setTitleByIA(title);
        setDescriptionByIA(description);
        setIsRetrying(false);
        
        };
        if (forPrompt) {
        fetchResponse();
        }
    }, [forPrompt, titlePrompt, descriptionPrompt, retry]);

    const [form, setForm] = useState<Form>({
        id: "",
        name: "",
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        ratings: "5",
        images: "",
        createdAt: new Date(),
    });

    useEffect(() => {
        if (titleByIA && descriptionByIA) {
        setForm((prev) => ({ ...prev, title: titleByIA, description: descriptionByIA }));
        }
    }, [titleByIA, descriptionByIA]);

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

    const createProduct = useCreateProduct();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProduct.mutate(form);
    };
    
    if (forLoading && forPrompt && !titleByIA && !descriptionByIA) {
        return <Loader />;
    }

    return (
        <>
        <button onClick={action} className="text-white hover:text-indigo-400 transition">
            <FaArrowLeft className="text-xl" />
        </button>

        <div className="md:w-4/5 mx-auto px-4 mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Add New Product</h2>

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
                onClick={tryAgainGenerate}
                className="px-6 py-2 bg-gray-200 text-indigo-600 rounded-md hover:bg-gray-300 transition flex items-center disabled:opacity-50"
                disabled={!form.title || !form.description}
                >
                {isRetrying ? <Posting /> : "Re-Try by AI"}
                </button>

                <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center disabled:opacity-50"
                disabled={
                    !form.title || !form.description || !form.price || !form.stock
                }
                >
                {createProduct.isPending ? <Posting /> : "Add Product"}
                </button>
            </div>
            </form>
        </div>
        </>
    );
};

export default AddProductForm;
