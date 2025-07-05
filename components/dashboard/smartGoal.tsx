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

const SmartGoal = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["insights"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/insights`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const [goals, setGoals] = useState<Goal[] | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        const fetchAIResponse = async () => {
            if (data) {
                setLoadingAI(true);
                try {
                    const prompt = `Based on this business data: ${JSON.stringify(data)}, provide SMART goals that could improve the business performance. 
                Each goal should be specific, measurable, achievable, relevant, and time-bound. 
                Respond with a JSON array of objects. Each object must have:
                - "title": the SMART goal title
                - "insights": an array of key recommendations or steps to achieve the goal.`;

                    const result = await getRespense(prompt);

                    if (result) {
                        const parsedGoals: Goal[] = JSON.parse(result);
                        setGoals(parsedGoals);
                    }
                } catch (error) {
                    console.error("AI Response Error:", error);
                    setGoals(null);
                } finally {
                    setLoadingAI(false);
                }
            }
        };

        fetchAIResponse();
    }, [data]);

    const setGoal = useCreateGoal();

    if (isLoading || loadingAI) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-8 flex flex-col items-center space-y-8">

            {goals && goals.length > 0 ? (
                goals.map((goal, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto
                                    hover:shadow-indigo-500/50 transition-shadow duration-300 ease-in-out"
                        >
                        <h3 className="text-2xl font-semibold mb-5 text-indigo-400">{goal.title}</h3>
                        <ul className="list-disc pl-6 space-y-3 mb-6">
                            {goal.insights.map((insight, i) => (
                            <li key={i} className="text-gray-400 leading-relaxed">{insight}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                setGoal.mutate({ title: goal.title, insights: goal.insights });
                            }}
                            className="px-5 py-3 mt-4 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 
                                    focus:ring-offset-1 text-white font-semibold transition"
                        >
                            {setGoal.isPending ? <Posting/> : "Set this Goal"}
                        </button>
                    </div>

                ))
            ) : (
                <p className="text-gray-400">No goals generated. Please try again later.</p>
            )}
        </div>
    );
};

export default SmartGoal;
