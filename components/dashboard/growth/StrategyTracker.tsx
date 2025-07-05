'use client';
import React from 'react';

const StrategyTracker = () => {
    return (
        <section className="mt-8 bg-gray-700 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-6">📊 Strategy Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-gray-800 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Upsell</h4>
            <p className="text-gray-300">Revenue Impact: $1,200</p>
            </div>
            <div className="p-5 bg-gray-800 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Cross-sell</h4>
            <p className="text-gray-300">Conversion Rate: 8.5%</p>
            </div>
            <div className="p-5 bg-gray-800 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Seasonal Promo</h4>
            <p className="text-gray-300">CTR: 12.3%</p>
            </div>
        </div>
        </section>
    );
};

export default StrategyTracker;
