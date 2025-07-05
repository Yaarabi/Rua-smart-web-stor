'use client';
import React, { useState } from 'react';

interface Props {
    adId: string;
}

const AIAdSuggestions = ({ adId }: Props) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const fetchSuggestions = async () => {
        const res = await fetch(`/api/ai/ad-suggestions?adId=${adId}`);
        const data = await res.json();
        setSuggestions(data.suggestions);
    };

    return (
        <section className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-6">🤖 AI Recommendations</h2>
            <button
                onClick={fetchSuggestions}
                className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
                Generate Suggestions
            </button>
            <ul className="mt-6 space-y-3">
                {suggestions.map((s, i) => (
                    <li key={i} className="p-4 bg-gray-800 rounded-md border border-gray-600 shadow">
                        {s}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AIAdSuggestions;
