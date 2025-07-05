
'use client';
import React from 'react';

const StrategyList = () => {
    return (
        <section className="text-white bg-gray-900 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📋 Growth Strategies</h2>
        <ul className="space-y-3">
            {/* Replace with dynamic data */}
            <li className="p-3 text-gray-100 bg-gray-800 rounded">Upsell Strategy</li>
            <li className="p-3 text-gray-100 bg-gray-800 rounded">Cross-sell Campaign</li>
            <li className="p-3 text-gray-100 bg-gray-800 rounded">Seasonal Promo</li>
        </ul>
        </section>
    );
};

export default StrategyList;
