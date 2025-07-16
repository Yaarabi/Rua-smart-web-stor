"use client";

import { useState, useEffect, useRef } from "react";
import SearchCollection from "./collection";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface Form {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    ratings: number;
    images: string;
    createdAt: Date;
}

interface ProductSuggestion {
    _id: string;
    title: string;
}

const Search = () => {
    const [input, setInput] = useState("");
    const [searchFor, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
    const [allProducts, setAllProducts] = useState<ProductSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function fetchProductTitles() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
            if (!res.ok) throw new Error("Failed to fetch product titles");

            const data = await res.json();
            const products = (data.products || []).map((p: Form) => ({
            _id: p._id,
            title: p.title,
            }));
            setAllProducts(products);
        } catch (error) {
            console.error(error);
        }
        }

        fetchProductTitles();
    }, []);

    useEffect(() => {
        if (input.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
        }

        const filtered = allProducts
        .filter((p) =>
            p.title.toLowerCase().includes(input.trim().toLowerCase())
        )
        .slice(0, 6);

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [input, allProducts]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        setSearch(input.trim());
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (title: string) => {
        setInput(title);
        setSearch(title);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white flex flex-col">
        <header className="w-full p-4 sm:p-6 bg-gray-800 shadow sticky top-0 z-30 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row flex-1 max-w-3xl mx-auto space-y-3 sm:space-y-0 sm:space-x-4 w-full relative"
            role="search"
            aria-label="Product Search"
            autoComplete="off"
            >
            <input
                ref={inputRef}
                type="search"
                placeholder="Search products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                className="flex-1 p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
                aria-label="Search input"
                spellCheck={false}
            />

            {showSuggestions && (
                <ul
                className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-b-lg max-h-60 overflow-auto z-40 shadow-lg"
                role="listbox"
                aria-label="Search suggestions"
                >
                {suggestions.map((s) => (
                    <li
                    key={s._id}
                    role="option"
                    aria-selected
                    tabIndex={0}
                    onClick={() => handleSuggestionClick(s.title)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSuggestionClick(s.title);
                        }
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-indigo-600 transition text-white truncate"
                    >
                    {s.title}
                    </li>
                ))}
                </ul>
            )}

            <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                Search
            </button>
            </form>

            <Link
            href="/"
            className="text-gray-400 hover:text-white transition"
            aria-label="Close search"
            >
            <FaTimes size={24} />
            </Link>
        </header>

        <main className="flex-1 max-w-5xl mx-auto p-4 sm:p-6">
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
