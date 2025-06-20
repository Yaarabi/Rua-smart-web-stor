
"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const AddProductForm = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        ratings: "",
        images: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
    <>
    <FaArrowLeft/>
    <form className="max-w-xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-white">Add New Product</h2>

        <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
            name="ratings"
            placeholder="Rating"
            type="number"
            value={form.ratings}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
            name="images"
            placeholder="Image URLs (comma-separated)"
            value={form.images}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
            type="button"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
            Add Product
        </button>
    </form>
    </>
    );
};

export default AddProductForm;
