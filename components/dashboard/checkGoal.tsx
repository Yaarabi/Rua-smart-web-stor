"use client";

import { useCreateGoal } from "@/app/hooks/forGoal";
import getRespense from "@/app/hooks/getIArespense";
import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Posting from "../btnPatient";

interface Goal {
    title: string;
    insights: string[]; 
}

const CheckGoal = ({ title }: { title: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["insights"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/insights`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const [response, setResponse] = useState<Goal[] | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        const fetchAIResponse = async () => {
            if (data) {
                setLoadingAI(true);
                try {
                    const prompt = `
You are an expert in business strategy and SMART goals evaluation.
Here is the business data: ${JSON.stringify(data)}.
Evaluate the following proposed goal: "${title}".

If this goal already follows the SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound), improve it if necessary to make it even more precise.

If the goal is not SMART, generate a new SMART goal that fits the provided business data.

Respond with a JSON array of objects.
Each object should contain:
- "title": The improved or new SMART goal
- "insights": An array of key recommendations or steps to achieve this goal
                    `;

                    const result = await getRespense(prompt);

                    if (result) {
                        const parsedResponse: Goal[] = JSON.parse(result);
                        setResponse(parsedResponse);
                    }
                } catch (error) {
                    console.error("AI Response Error:", error);
                    setResponse(null);
                } finally {
                    setLoadingAI(false);
                }
            }
        };

        fetchAIResponse();
    }, [data, title]);

    const setGoal = useCreateGoal()

    if (isLoading || loadingAI) return <Loader />;

    return (
        <div className="min-h-screen w-full bg-gray-900 text-gray-200 p-8 flex flex-col items-center space-y-8">
            {response && response.length > 0 ? (
                response.map((goal, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
                        <h3 className="text-xl font-semibold mb-4 text-indigo-400">{goal.title}</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {goal.insights.map((insight, i) => (
                                <li key={i} className="text-gray-400">{insight}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                setGoal.mutate({ title: goal.title, insights: goal.insights });
                            }}
                            className="px-4 py-2 mt-4 bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
                            >
                            {setGoal.isPending ? <Posting/> : "Set this Goal"}
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">No SMART goals generated. Please try again later.</p>
            )}
        </div>
    );
};

export default CheckGoal;
