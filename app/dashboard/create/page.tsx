'use client';

import Link from 'next/link';
import { FaPenFancy, FaRegNewspaper, FaBullhorn } from 'react-icons/fa';

const Page = () => {
    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="max-w-xl w-full p-8 bg-gray-800 rounded-3xl shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-8">What will you create?</h2>
                <ul className="space-y-6">
                    <li>
                        <Link href="/dashboard/create/post" className="flex items-center justify-between p-4 bg-gray-700 rounded-xl hover:bg-indigo-600 transition-transform transform hover:scale-105 cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <FaPenFancy className="text-2xl text-indigo-400" />
                                <span className="text-lg font-medium">Post</span>
                            </div>
                            <span className="text-indigo-300">Start</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/create/blogs" className="flex items-center justify-between p-4 bg-gray-700 rounded-xl hover:bg-indigo-600 transition-transform transform hover:scale-105 cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <FaRegNewspaper className="text-2xl text-indigo-400" />
                                <span className="text-lg font-medium">Blog</span>
                            </div>
                            <span className="text-indigo-300">Start</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/create/ads" className="flex items-center justify-between p-4 bg-gray-700 rounded-xl hover:bg-indigo-600 transition-transform transform hover:scale-105 cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <FaBullhorn className="text-2xl text-indigo-400" />
                                <span className="text-lg font-medium">Ad</span>
                            </div>
                            <span className="text-indigo-300">Start</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Page;
