'use client';

import Link from 'next/link';
import { FaPenFancy, FaRegNewspaper, FaBullhorn, FaCrown, FaRocket, FaGem, FaArrowRight } from 'react-icons/fa';

const features = [
    {
        tier: 'Basic',
        items: [
            {
                icon: <FaPenFancy className="text-2xl text-indigo-400" />,
                label: 'Get Insights',
                path: '/dashboard/goals/insights',
                description: 'Set insights and notes about your business.',
            },
            {
                icon: <FaRegNewspaper className="text-2xl text-indigo-400" />,
                label: 'Smart Goals',
                path: '/dashboard/goals/set',
                description: 'Set clear, trackable goals to improve your strategy.',
            },
        ],
    },
    {
        tier: 'Advanced',
        items: [
            {
                icon: <FaBullhorn className="text-2xl text-indigo-400" />,
                label: 'Marketing Announcements',
                path: '/dashboard/goals/marketing',
                description: 'Plan and manage your promotional campaigns.',
            },
            {
                icon: <FaRocket className="text-2xl text-indigo-400" />,
                label: 'Growth Strategies',
                path: '/dashboard/goals/growth',
                description: 'Build custom growth strategies for your business.',
            },
        ],
    },
    {
        tier: 'Premium',
        items: [
            {
                icon: <FaCrown className="text-2xl text-indigo-400" />,
                label: 'Exclusive Analytics',
                path: '/dashboard/goals/analytics',
                description: 'Access premium, real-time business analytics.',
            },
            {
                icon: <FaGem className="text-2xl text-indigo-400" />,
                label: 'Priority Support',
                path: '/dashboard/support',
                description: 'Get dedicated, priority customer support.',
            },
        ],
    },
];

const Page = () => {
    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-3xl shadow-lg text-center space-y-10">
                {features.map((tier, idx) => (
                    <div key={idx}>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-6">{tier.tier} Features</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {tier.items.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.path} className="flex h-full items-center justify-between p-4 bg-gray-700 rounded-xl hover:bg-indigo-600 transition-transform transform hover:scale-105 cursor-pointer">
                                        <div className="flex items-center space-x-4 text-left">
                                            {item.icon}
                                            <div>
                                                <span className="text-lg font-medium">{item.label}</span>
                                                <p className="text-sm text-gray-300">{item.description}</p>
                                            </div>
                                        </div>
                                            <span className="text-indigo-300 text-lg">
                                                <FaArrowRight />
                                            </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Page;
