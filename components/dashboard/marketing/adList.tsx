import React from "react";

type Ad = {
    id: string;
    title: string;
    scheduledAt: string;
};

interface Props {
    ads: Ad[];
}

const ExistingAdsList = ({ ads }: Props) => (
    <section className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6 text-white">
        <h2 className="text-xl font-semibold mb-6">📋 Your Ads</h2>
        <ul className="space-y-4">
            {ads.map((ad) => (
                <li key={ad.id} className="p-4 bg-gray-800 rounded-md border border-gray-600 shadow">
                    <h3 className="text-lg font-bold text-indigo-400 mb-2">{ad.title}</h3>
                    <p className="text-sm text-gray-300">{ad.title}</p>
                    <p className="text-xs text-gray-400 mt-2">Scheduled: {new Date(ad.scheduledAt).toLocaleString()}</p>
                </li>
            ))}
        </ul>
    </section>
);

export default ExistingAdsList;
