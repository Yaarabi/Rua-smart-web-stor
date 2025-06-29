"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuantity } from "@/zustand/store";
import { FaShoppingCart, FaUser, FaSearch, FaHeadset, FaBars, FaTimes } from "react-icons/fa";
import Cart from "./cart"
import Chat from "./chat";
import Link from "next/link";
import ToLogin from "../login/toLogin";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const Q = useQuantity()

    return (
        <>
            <div className="bg-gray-700 text-white text-center py-2 text-sm">
                Exclusive Offers! Get Free Shipping on Orders Over $50 
            </div>

            <header className="bg-gray-900 text-white p-4 flex justify-around gap-20 items-center sticky top-0 z-50 mx-auto">
                <Link href={"/"} className="flex items-center" >
                        <Image src="/whiteLogo.svg" alt="Rua Web Store Logo" width={50} height={50} />
                        <h1 className="text-lg font-bold">Rua Web Store</h1>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/categories" className="hover:text-gray-400">Categories</Link>
                    <a href="#featured" className="hover:text-gray-400">Featured</a>
                    <a href="#about" className="hover:text-gray-400">About</a>
                    <a href="#footer" className="hover:text-gray-400">Contact Us</a>
                </nav>

                <div className="flex items-center space-x-4">
                    <FaSearch className="cursor-pointer" size={18} />
                    <div className="relative">
                        <FaUser
                            className="cursor-pointer"
                            size={18}
                            onClick={() => setLoginOpen((prev) => !prev)}
                        />
                        {loginOpen && <ToLogin onClose={() => setLoginOpen(false)} />}
                    </div>

                    <div className="relative">
                            <FaHeadset 
                                className="cursor-pointer hover:text-gray-400" 
                                size={18}
                                onClick={() => setChatOpen(true)}
                            />
                            {chatOpen && <Chat onClose={() => setChatOpen(false)} />}
                    </div>
                    <div className="relative">
                            <sup className="text-[10px] font-semibold text-white rounded-full px-1.5 py-0.5 absolute right-[-17px] top-[1px] shadow-sm group-hover:scale-110 transition-transform">
                                {(Q!==0)? Q : "" }
                            </sup>
                            <FaShoppingCart 
                                size={18}
                                className="cursor-pointer"
                                onClick={() => setCartOpen(true)}
                            />
                            {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
                    </div>
                    <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </header>

            {menuOpen && (
                <div className="bg-gray-800 text-white p-4 flex flex-col space-y-4 text-center md:hidden">
                    <a href="#categories" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Categories</a>
                    <a href="#featured" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Featured</a>
                    <a href="#about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#footer" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Contact Us</a>

                </div>
            )}
        </>
    );
}
