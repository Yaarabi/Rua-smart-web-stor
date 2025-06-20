"use client"

import { useState, createContext } from "react";
import { FaArrowLeft } from "react-icons/fa";

    interface Props {
    action1: () => void;
    action2: () => void;
    }
    interface Form {
        title: string;
        about: string;
        }

    export const Context = createContext<Form>({
        title: "",
        about: ""
        })

const ForPrompt = ({ action1, action2 }: Props) => {

    const [ form, setForm ] = useState<Form>({
        title:"",
        about: "",
    })


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // const prompt: string = `Give me a product title based on ${form.title}, ${form.about}. Format the result like this: title: [text]. Make sure it follows digital marketing best practices (clear benefit, emotional hook, SEO-friendly). Keep it concise, no extra text.`
    // const [result, setResult] = useState<string | null>(null);
    // const getRespense = async () => {

    //     const res = await fetch("/api/generate", {
    //     method: "POST",
    //     body: JSON.stringify({ prompt }),
    //     headers: { "Content-Type": "application/json" },
    //     });
        
    //     const { result } = await res.json();
    //     setResult(result);

    // }

    return (
        <Context.Provider value={form}>
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
                value={form.about}
                onChange={handleChange}
                placeholder="Brief product about..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <div className="flex justify-end space-x-4 pt-2">
            <button
                
                className="px-6 py-2 bg-gray-200 text-indigo-600 rounded-md hover:bg-gray-300 transition"
            >
                Re-try
            </button>
            <button
            type="button"
                onClick={action2}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
                Next
            </button>
            </div>
        </form>
        </div>


        </Context.Provider>
    );
    };

    export default ForPrompt;
