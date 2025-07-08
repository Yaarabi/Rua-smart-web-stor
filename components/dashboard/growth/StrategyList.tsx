'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

interface Goal {
    _id: string;
    title: string;
    insights: string[];
}

interface Props {
    action: (x: string) => void;
}

const fetchGoals = async () => {
    const response = await axios.get('/api/goals');
    return response.data;
};

const GoalWithStrategies = ({ action }: Props) => {
    const { data: goals, isLoading, isError } = useQuery<Goal[]>({
        queryKey: ['goals'],
        queryFn: fetchGoals,
    });

    const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

    const toggleGoal = (goalId: string) => {
        if (expandedGoalId === goalId) {
            setExpandedGoalId(null);
        } else {
            setExpandedGoalId(goalId);
        }
    };

    if (isLoading) return <div className="text-white p-4">Loading...</div>;
    if (isError) return <div className="text-red-500 p-4">Failed to load goals.</div>;

    return (
        <div className="space-y-6 p-4">
            {goals?.map((goal) => (
                <section
                    key={goal._id}
                    className="text-white bg-gray-900 p-4 rounded-lg shadow cursor-pointer"
                    onClick={() => toggleGoal(goal._id)}
                >
                    <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                        🎯 {goal.title}
                        <span className="text-gray-400 text-sm">
                            {expandedGoalId === goal._id ? '▲' : '▼'}
                        </span>
                    </h2>

                    {expandedGoalId === goal._id && (
                        <ul className="space-y-3 mt-4">
                            {goal.insights.map((strategy, index) => (
                                <li
                                    key={index}
                                    onClick={() => action(strategy)}
                                    className="p-3 text-gray-100 bg-gray-800 rounded cursor-pointer"
                                >
                                    {strategy}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}
        </div>
    );
};

export default GoalWithStrategies;
