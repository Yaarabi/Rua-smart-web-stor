"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import getRespense from "@/app/hooks/getIArespense";
import Loader from "@/components/loader";
import Posting from "@/components/btnPatient";
import { useCreatePromotion } from "@/app/hooks/forPromo"; 

interface Props {
    action: () => void;
    action2: () => void;
    promptTitle: string;
}

const AddPromotion = ({ action, action2, promptTitle }: Props) => {
    const [titleByAI, setTitleByAI] = useState<string | null>(null);
    const [retry, setRetry] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);


    const tryAgainGenerate = () => {
        setIsRetrying(true);
        setRetry((prev) => !prev);
    };

    useEffect(() => {
        const fetchResponse = async () => {
            const prompt = `Generate a short, attention-grabbing promo headline for a homepage banner on a modern web store. 
                It should be catchy, friendly, and drive action, similar to seasonal offers, shipping perks, or discount messages. 
                Base it on this topic: "${promptTitle}". Keep it concise — 3 to 5 words max.
                Avoid using "Sign Up" if the message is for logged-in users, add just one emojy to describ it.`
            const title = await getRespense(prompt);
            setTitleByAI(title);
            setIsRetrying(false);
        };

        if (promptTitle) {
            fetchResponse();
        }
    }, [promptTitle, retry]);

    const [form, setForm] = useState({
        title: "",
        status: "active",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        if (titleByAI) {
            setForm((prev) => ({ ...prev, title: titleByAI }));
        }
    }, [titleByAI]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const createPromotion = useCreatePromotion();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createPromotion.mutate(form);
        if (createPromotion.isSuccess) {
            action2()
        }
    };

    if (!titleByAI) {
        return <Loader />;
    }

    return (
        <>
            <button
                onClick={action}
                className="text-white hover:text-indigo-400 transition mb-4 flex items-center space-x-2"
            >
                <FaArrowLeft className="text-xl" />
                <span>Back</span>
            </button>

            <div className="w-full max-w-4xl m-auto px-4 mt-6">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Create New Homepage Ad
                    </h2>

                    <div>
                        <label htmlFor="title" className="block text-sm text-gray-300 mb-2">
                            AI Generated Ad Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            placeholder="Ad title..."
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm text-gray-300 mb-2">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm text-gray-300 mb-2">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm text-gray-300 mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={tryAgainGenerate}
                            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center disabled:opacity-50"
                            disabled={!form.title}
                        >
                            {isRetrying ? <Posting /> : "Retry AI"}
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center disabled:opacity-50"
                            disabled={!form.title || !form.startDate || !form.endDate}
                        >
                            {createPromotion.isPending ? <Posting /> : "Create Ad"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddPromotion;
