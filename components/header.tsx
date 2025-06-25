"use client";

import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import Cart from "./cart";
import { useQuantity } from "@/zustand/store";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [search, setSearch] = useState(false)
    const Q = useQuantity()

    return (
        <header className="w-full bg-white shadow-md font-sans sticky top-0 z-50">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-2 text-xs tracking-wide">
                Free Shipping on Orders Over $50!
            </div>

            <nav className="flex justify-around gap-18 items-center px-4 md:px-8 py-4 bg-gray-50">
                <div className="flex items-center gap-3">
                    <Image src="/logo.svg" alt="Store Logo" width={48} height={48} />
                    <a href="#" className="hover:text-black transition">
                        <h1 className="text-2xl font-bold text-gray-800">Rua Store</h1>
                    </a>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                    <a href="#" className="hover:text-black transition">Shop</a>
                    <a href="#article" className="hover:text-black transition">Blog</a>
                    <a href="#footer" className="hover:text-black transition">Contact</a>
                    <select
                        className="py-2 text-sm text-gray-700 focus:outline-none"
                        defaultValue="all"
                    >
                        <option value="all">Categories</option>
                        <option value="phones">Phones</option>
                        <option value="watch">Watch</option>
                        <option value="pc">PC</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    { search && <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="px-4 py-2 text-sm focus:outline-none w-60"
                        />
                        <button className="bg-gray-800 text-white px-4 py-2 text-sm hover:bg-gray-900 transition">
                            Search
                        </button>
                    </div>}

                    <div className="flex items-center gap-4">
                        { !search && <FaSearch onClick={()=> setSearch(true)} size={22} className="text-gray-600 hover:text-black cursor-pointer transition" />}
                        <FaUser size={22} className="text-gray-600 hover:text-black cursor-pointer transition" />
                        <MdSupportAgent size={24} className="text-gray-600 hover:text-black cursor-pointer transition" />
                        <div className="relative">
                            <sup className="text-[10px] font-semibold text-gray-700 rounded-full px-1.5 py-0.5 absolute right-[-16px] top-[3px] shadow-sm group-hover:scale-110 transition-transform">{Q}</sup>
                            <FaShoppingCart 
                                size={22}
                                className="text-gray-600 hover:text-black cursor-pointer transition"
                                onClick={() => setCartOpen(true)}
                            />
                            {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
                        </div>
                    </div>

                    {/* <button className="text-gray-600 hover:text-black transition flex items-center gap-1 text-sm">
                        <FaGlobe size={16} />
                        EN
                    </button> */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-3xl text-gray-600 ml-2"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <nav className="md:hidden bg-white px-6 py-4 border-t text-sm text-gray-700 flex flex-col gap-4 animate-slide-down">
                    <a href="#" className="hover:text-black transition">Home</a>
                    <a href="#" className="hover:text-black transition">Shop</a>
                    <a href="#" className="hover:text-black transition">Blog</a>
                    <a href="#" className="hover:text-black transition">Contact</a>
                    <select
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
                        defaultValue="all"
                    >
                        <option value="all">Categories</option>
                        <option value="phones">Phones</option>
                        <option value="watch">Watch</option>
                        <option value="pc">PC</option>
                    </select>
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <button className="bg-gray-800 text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-900 transition">
                            Search
                        </button>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
