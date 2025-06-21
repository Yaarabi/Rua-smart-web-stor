"use client"

import { FaArrowLeft } from "react-icons/fa";

    interface Props {
    action1: () => void;
    action2: () => void;
    action3: React.Dispatch<React.SetStateAction<{ title: string; about: string }>>;
    form: {
        title: string;
        about: string;
    }
    }



const ForPrompt = ({ action1, action2, action3, form }: Props) => {



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        action3((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <>
        <button onClick={action1} className="text-white hover:text-indigo-400 transition">
            <FaArrowLeft className="inline-block text-xl" />
        </button>
        <div className="max-w-xl mx-auto mt-8 px-4">

        <form className="space-y-5 mt-6">
            <h2 className="text-2xl font-semibold text-white">
            Please enter specific information about this product
            </h2>

            <div>
            <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
                Product Title
            </label>
            <input
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Premium Leather Wallet"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <div>
            <label htmlFor="about" className="block text-sm text-gray-300 mb-1">
                About Product
            </label>
            <textarea
                name="about"
                required
                value={form.about}
                onChange={handleChange}
                placeholder="Brief product about..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <div className="flex justify-end">
            <button
            type="button"
                onClick={action2}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                disabled={!form.title || !form.about }
            >
                Next
            </button>
            </div>
        </form>
        </div>


        </>
    );
    };

    export default ForPrompt;
