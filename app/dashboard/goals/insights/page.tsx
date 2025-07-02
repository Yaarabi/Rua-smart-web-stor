"use client";

import getRespense from "@/app/hooks/getIArespense";
import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Page = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["insights"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/insights");
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const [selected, setSelected] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    const options = ["My Business", "Product", "Customer", "Sales", "Marketing"];

    const router = useRouter();

    useEffect(() => {
        const fetchAIResponse = async () => {
            if (selected && data) {
                setLoadingAI(true);
                try {
                    const prompt = `Generate insights, recommendation and advice about ${selected} based on the provided data ${JSON.stringify(data)}. In 4-5 sentences, provide actionable insights that can help improve our business strategy.`;
                    const result = await getRespense(prompt);
                    if (result) {
                        setResponse(result);
                    }
                } catch (error) {
                    console.error("AI Response Error:", error);
                    setResponse("Failed to generate insights. Please try again.");
                } finally {
                    setLoadingAI(false);
                }
            }
        };

        fetchAIResponse();
    }, [data, selected]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-8 flex flex-col items-center space-y-8">
            <div
                onClick={() => router.push("/dashboard/goals")}
                className="flex items-center gap-2 cursor-pointer self-start hover:text-indigo-400 transition"
            >
                <FaArrowLeft className="text-lg" />
                <span className="font-medium">Back</span>
            </div>

            <h2 className="text-4xl font-bold text-center">Insight about</h2>

            <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => {
                            setSelected(option);
                            setResponse(null);
                        }}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform
                            ${selected === option
                                ? "bg-indigo-500 text-white shadow-lg scale-105"
                                : "bg-gray-800 text-indigo-400 border border-indigo-600 hover:bg-indigo-700 hover:text-white hover:scale-105"
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                selected && (
                    <div className="mt-6 bg-gray-800 p-8 rounded-2xl shadow-xl text-gray-300 w-full max-w-3xl min-h-[300px] flex items-center justify-center transition-all duration-300">
                        {loadingAI ? (
                            <Loader />
                        ) : response ? (
                            <div className="w-full space-y-6">
                                <h3 className="text-2xl font-bold text-center text-indigo-400">
                                    Insights for {selected}
                                </h3>
                                <div className="max-h-[350px] overflow-y-auto p-6 bg-gray-900 rounded-md border border-gray-700 text-gray-400 leading-relaxed tracking-wide">
                                    {response}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-lg text-center italic">
                                Select an option to generate insights.
                            </p>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default Page;
