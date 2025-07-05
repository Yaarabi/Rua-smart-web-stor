'use client';
import React from 'react';

type AdPerformance = {
    adId: string;
    views: number;
    clicks: number;
    conversions: number;
};

interface Props {
    performance: AdPerformance[];
}

const AdPerformanceCard = ({ performance }: Props) => (
    <section className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6 text-white">
        <h2 className="text-xl font-semibold mb-6">📊 Ad Performance</h2>
        <div className="space-y-4">
            {performance.map((p) => (
                <div key={p.adId} className="p-4 bg-gray-800 rounded-md border border-gray-600 shadow">
                    <p className="text-sm text-gray-300 mb-1">Ad ID: {p.adId}</p>
                    <p className="text-sm text-gray-100 mb-1">Views: {p.views}</p>
                    <p className="text-sm text-gray-100 mb-1">Clicks: {p.clicks}</p>
                    <p className="text-sm text-gray-100">Conversions: {p.conversions}</p>
                </div>
            ))}
        </div>
    </section>
);

export default AdPerformanceCard;
