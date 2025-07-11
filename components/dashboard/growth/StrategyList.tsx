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

const fetchGoals = async (): Promise<Goal[]> => {
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
        setExpandedGoalId(prev => (prev === goalId ? null : goalId));
    };

    if (isLoading) return <div className="text-white p-4">Loading...</div>;
    if (isError) return <div className="text-red-500 p-4">Failed to load goals.</div>;

    return (
        <div className="space-y-6 p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">My Strategies</h2>
        {goals?.map(goal => (
            <section
            key={goal._id}
            className="text-white bg-gray-900 p-4 rounded-lg shadow cursor-pointer transition-colors hover:bg-gray-800"
            onClick={() => toggleGoal(goal._id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') toggleGoal(goal._id);
            }}
            aria-expanded={expandedGoalId === goal._id}
            aria-controls={`goal-insights-${goal._id}`}
            >
            <h3 className="text-xl font-semibold mb-2 flex justify-between items-center select-none">
                🎯 {goal.title}
                <span className="text-gray-400 text-sm select-none">
                {expandedGoalId === goal._id ? '▲' : '▼'}
                </span>
            </h3>

            {expandedGoalId === goal._id && (
                <ul
                id={`goal-insights-${goal._id}`}
                className="space-y-3 mt-4"
                onClick={e => e.stopPropagation()}
                >
                {goal.insights.map((strategy, index) => (
                    <li
                    key={index}
                    onClick={() => action(strategy)}
                    className="p-3 text-gray-100 bg-gray-800 rounded cursor-pointer hover:bg-indigo-600 transition"
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') action(strategy);
                    }}
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
