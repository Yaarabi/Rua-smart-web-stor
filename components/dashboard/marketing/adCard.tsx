'use client';

import React from 'react';
import AIAdSuggestions from './ai';

type AdPerformance = {
    adId: string;
    views: number;
    clicks: number;
    conversions: number;
};

interface Props {
    performance: AdPerformance[] | null | undefined;
}

const AdPerformanceCard = ({ performance }: Props) => {
    if (!performance || !Array.isArray(performance) || performance.length === 0) {
        return (
        <section className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6 text-white">
            <h2 className="text-xl font-semibold mb-4">📊 Ad Performance</h2>
            <p className="text-red-400">No performance data available.</p>
        </section>
        );
    }

    return (
        <section className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6 text-white">
        <h2 className="text-xl font-semibold mb-6">📊 Ad Performance</h2>
        <div className="space-y-6">
            {performance.map((p) => (
            <React.Fragment key={p.adId}>
                <div className="p-4 bg-gray-800 rounded-md border border-gray-600 shadow">
                <p className="text-sm text-gray-300 mb-1">Ad: {p.adId}</p>
                <p className="text-sm text-gray-100 mb-1">Views: {p.views}</p>
                <p className="text-sm text-gray-100 mb-1">Clicks: {p.clicks}</p>
                <p className="text-sm text-gray-100">Conversions: {p.conversions}</p>
                </div>
                <AIAdSuggestions {...p} />
            </React.Fragment>
            ))}
        </div>
        </section>
    );
};

export default AdPerformanceCard;
