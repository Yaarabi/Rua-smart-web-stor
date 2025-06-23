    "use client";

import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import Cart from "./cart";

const Header = () => {
    const [support, setSupport] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow w-full">
        
        <section className="text-center bg-gradient-to-r from-gray-900 to-gray-700 text-white p-2 text-sm">
            Exclusive Offers & Latest Updates
        </section>

        <div className="flex justify-between items-center px-4 py-3 bg-gray-200">
            <section className="flex items-center">
            <Image src="/logo.svg" alt="Rua Web Store Logo" width={50} height={50} />
            <h1 className="text-lg md:text-xl font-bold text-gray-600">Rua Web Store</h1>
            </section>
            <button aria-label="Change Language" className="p-2 rounded text-sm md:text-base">
            🌐 Language
            </button>

            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700"
            >
            {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>

        <nav
            className={`flex flex-col md:flex-row md:justify-evenly md:items-center p-4 shadow bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden md:flex"
            }`}
        >
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-gray-700 text-center">
            <li>
                <a href="#" className="hover:text-blue-600">
                Categorie 1
                </a>
            </li>
            <li>
                <a href="#" className="hover:text-blue-600">
                Categorie 2
                </a>
            </li>
            <li>
                <a href="#" className="hover:text-blue-600">
                Categorie 3
                </a>
            </li>
            </ul>

            <form className="flex items-center space-x-2 w-full md:w-2/5 mt-4 md:mt-0">
            <input
                type="search"
                placeholder="Search products..."
                className="border rounded p-2 w-full"
            />
            <button className="bg-gray-700 text-white p-2 rounded hover:bg-blue-700">
                Search
            </button>
            </form>

            <div className="flex space-x-4 mt-4 md:mt-0 justify-center">
            <FaUser size={24} className="hover:text-blue-600 text-gray-600 transition cursor-pointer" />
            <MdSupportAgent size={24} className="hover:text-blue-600 text-gray-500 transition cursor-pointer" />
            {support && <Cart onClose={() => setSupport(false)} />}
            <FaShoppingCart
                size={24}
                onClick={() => setSupport(true)}
                className="hover:text-blue-600 text-gray-400 transition cursor-pointer"
            />
            </div>
        </nav>
        </header>
    );
};

export default Header;
