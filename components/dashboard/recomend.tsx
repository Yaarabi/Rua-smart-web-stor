"use client";

import { useQuery } from "@tanstack/react-query";
import { Customer } from "@/components/dashboard/customers";
import Loader from "../loader";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";
import Posting from "../btnPatient";

const Recomend = () => {
    const [response, setResponse] = useState<{
        insights: string;
        kindEmail: string[];
        typeEmail: string[];
    } | null>(null);

    const [loadingAI, setLoadingAI] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    useEffect(() => {
        if (!data?.clients) return;
        setCustomers(
            data?.clients.filter((ele: Customer) => ele.role !== "admin")
        );
    }, [data]);

    useEffect(() => {
        const fetchAIResponse = async () => {
            if (!customers || customers.length === 0) return;

            setLoadingAI(true);

            const customerData = customers
                .map(
                    (c) =>
                        `{"email": "${c.email}", "totalSpent": ${c.totalSpent}, "totalOrders": ${c.totalOrders}}`
                )
                .join(", ");

            const prompt = `You are a strategic e-commerce analyst.
                Here is a list of customers in JSON format: [${customerData}]
                🟢 Your logic:
                - Customers with 0 orders are **"new"**
                - Customers with totalSpent > 1000 are **"vip"**
                - All others are **"regular"**

                🎯 Task:
                1. Classify each customer as new, vip, or regular.
                2. For each group, suggest an appropriate email marketing strategy.

                📦 Return ONLY a JSON object in this exact format:
                {
                    "insights": "Short summary of user behavior",
                    "kindEmail": [
                        "email type for new customers",
                        "email type for regular customers",
                        "email type for vip customers"
                    ],
                    "typeEmail": ["type1", "type2", "type3"]
                }

                ⚠️ No markdown, no commentary—just return valid JSON.
            `;

            try {
                const result = await getRespense(prompt);
                

                if (result) {
                    console.log(result)
                    setResponse(JSON.parse(result));
                }
            } catch (error) {
                console.error("AI Response Error:", error);
                setResponse(null);
            } finally {
                setLoadingAI(false);
            }
        };

        if (customers.length > 0) {
            fetchAIResponse();
        }
    }, [customers]);

    if (isLoading && loadingAI) return <Loader />;
    if (isError || !data?.clients)
        return <p className="text-red-500 text-center mt-6">Failed to load customers.</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-lg space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">Email Marketing Recommendations</h2>

            {response ? (
                <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold text-gray-200 mb-3">AI Insights</h3>
                        <p className="text-gray-300 leading-relaxed">{response.insights}</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow space-y-4">
                        <h3 className="text-xl font-semibold text-gray-200 mb-3">Recommended Email Strategies</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {response.kindEmail.map((strategy, index) => (
                                <li key={index} className="text-gray-300">{strategy}</li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-200 mb-2">Email Types</h4>
                            <div className="flex flex-wrap gap-2">
                                {response.typeEmail.map((type, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-full cursor-pointer transition"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <Posting />
                    <p className="mt-4">Waiting for recommendation...</p>
                </div>
            )}
        </div>
    );
};

export default Recomend;
