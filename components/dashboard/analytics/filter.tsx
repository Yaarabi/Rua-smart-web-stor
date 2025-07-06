"use client";

import { useState } from "react";

export default function AnalyticsFilters({
    onChange,
}: {
    onChange: (filters: {
        dateFrom: string;
        dateTo: string;
        region: string;
        category: string;
    }) => void;
}) {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [region, setRegion] = useState("");
    const [category, setCategory] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onChange({ dateFrom, dateTo, region, category });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:justify-center gap-4 bg-gray-900 p-6 rounded-2xl mb-6 shadow-lg"
        >
            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-300 mb-2 text-sm">Date From</label>
                <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
                    required
                />
            </div>

            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-300 mb-2 text-sm">Date To</label>
                <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
                    required
                />
            </div>

            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-300 mb-2 text-sm">Region (City)</label>
                <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="e.g. Casablanca"
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
                />
            </div>

            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-300 mb-2 text-sm">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. electronics"
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
                />
            </div>

            <div className="flex items-end w-full md:w-auto">
                <button
                    type="submit"
                    className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition shadow"
                >
                    Apply
                </button>
            </div>
        </form>
    );
}
