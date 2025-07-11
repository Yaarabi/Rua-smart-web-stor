'use client';

import React, { useState } from 'react';
import getRespense from '@/app/hooks/getIArespense';

type AdPerformance = {
    adId: string;
    views: number;
    clicks: number;
    conversions: number;
};

const AIAdSuggestions = ({ adId, views, clicks, conversions }: AdPerformance) => {
    const [suggestions, setSuggestions] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prompt = `
    You are an AI ad strategist. Analyze the following ad performance data and provide concise insights and actionable suggestions to improve performance (max 150 tokens):

    - Ad ID: ${adId}
    - Views: ${views}
    - Clicks: ${clicks}
    - Conversions: ${conversions}

    Output:
    1. A short performance analysis.
    2. Clear, creative suggestions for improvement.
    max tokens: 100
    `;

    const fetchSuggestions = async () => {
        try {
        setLoading(true);
        setError(null);
        const response = await getRespense(prompt);
        
        if (response) {
            setSuggestions(response);
        } else {
            setError('Unexpected AI response format.');
            setSuggestions("No suggestions available.");
        }
        } catch {
        setError('Failed to generate suggestions.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <section className="bg-gray-700 p-6 rounded-lg shadow-lg text-white mt-6">
        <div className="flex justify-between items-center mb-4">
            <button
            onClick={fetchSuggestions}
            disabled={loading}
            className={`px-4 py-2 rounded-md font-medium transition ${
                loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            >
            {loading ? 'Generating...' : 'Get AI Suggestions'}
            </button>
        </div>

        {error && (
            <p className="text-red-400 text-sm mt-2">
            {error}
            </p>
        )}

        {suggestions && (
            <div className="mt-4 space-y-4">
            <p>{suggestions}</p>
            </div>
        )}
        </section>
    );
};

export default AIAdSuggestions;
