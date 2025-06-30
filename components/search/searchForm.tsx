'use client';

import { useState } from 'react';
import SearchCollection from './collection';

const Search = () => {
    const [input, setInput] = useState('');
    const [searchFor, setSearch] = useState(''); 

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        setSearch(input); 
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="w-full p-6 bg-gray-800 shadow sticky top-0 z-20">
                <form
                    onSubmit={handleSearch}
                    className="flex max-w-3xl mx-auto space-x-4"
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Search
                    </button>
                </form>
            </header>

            <main>
                {searchFor ? (
                    <SearchCollection input={searchFor} />
                ) : (
                    <p className="text-gray-400 text-center mt-10">Start searching for products...</p>
                )}
            </main>
        </section>
    );
};

export default Search;
