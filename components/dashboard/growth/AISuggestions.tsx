'use client';
import React, { useState } from 'react';

const AISuggestions = () => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const fetchSuggestions = async () => {
        setSuggestions([
        'Offer bundle discounts for accessories',
        'Highlight limited-time offers on homepage',
        'Use urgency-based CTAs for low-stock items',
        ]);
    };

    return (
        <section className="mt-8 bg-gray-700 p-6 rounded-lg shadow-lg text-white">
        <button
            onClick={fetchSuggestions}
            className="px-5 py-2 bg-blue-600 rounded-md font-semibold hover:bg-blue-700 transition"
        >
            🤖 Get AI Suggestions
        </button>

        {suggestions.length > 0 && (
            <ul className="mt-5 space-y-3">
            {suggestions.map((s, i) => (
                <li
                key={i}
                className="p-3 bg-gray-800 rounded-md shadow-sm"
                >
                {s}
                </li>
            ))}
            </ul>
        )}
        </section>
    );
};

export default AISuggestions;
