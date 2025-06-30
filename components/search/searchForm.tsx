'use client';

import { useState } from 'react';
import SearchCollection from './collection';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

const Search = () => {
    const [input, setInput] = useState('');
    const [searchFor, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        setSearch(input.trim());
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white flex flex-col">
        <header className="w-full p-6 bg-gray-800 shadow sticky top-0 z-30 flex items-center justify-between">
            <form
            onSubmit={handleSearch}
            className="flex flex-1 max-w-3xl mx-auto space-x-4"
            role="search"
            aria-label="Product Search"
            >
            <input
                type="search"
                placeholder="Search products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                aria-label="Search input"
                autoComplete="off"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                Search
            </button>
            </form>
            <Link
            href="/"
            className="ml-4 text-gray-400 hover:text-white transition"
            aria-label="Close search"
            >
            <FaTimes size={24} />
            </Link>
        </header>

        <main className="flex-1 max-w-5xl mx-auto p-6">
            {searchFor ? (
            <SearchCollection input={searchFor} />
            ) : (
            <p className="text-gray-400 text-center mt-20 text-lg font-light">
                Start searching for products...
            </p>
            )}
        </main>
        </section>
    );
};

export default Search;
