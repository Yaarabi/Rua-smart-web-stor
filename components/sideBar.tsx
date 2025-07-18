'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaHome, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt, FaClipboardCheck, FaBars, FaTimes, FaBlog, FaBullseye, FaEnvelope } from 'react-icons/fa';

const SideBar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => {
            router.push('/');
        });
    };

    const menuItems = [
        { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FaShoppingCart />, label: 'Products', path: '/dashboard/products' },
        { icon: <FaClipboardCheck />, label: 'Orders', path: '/dashboard/orders' },
        { icon: <FaUsers />, label: 'Customers', path: '/dashboard/Customers' },
        { icon: <FaEnvelope />,label: 'Connecte',path: '/dashboard/connecte',},
        { icon: <FaBlog />, label: 'New Post', path: '/dashboard/create' },
        { icon: <FaBullseye/>, label: 'Goals & Targets', path: '/dashboard/goals' },
    ];

    return (
        <>
            <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white fixed w-full top-0 z-50">
                <h2 className="text-lg font-bold">Rua Web Store</h2>
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <aside className={`fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col justify-between shadow-lg z-50 transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                
                <section className="flex items-center p-6 border-b border-gray-700">
                    <Image src="/whiteLogo.svg" alt="Rua Web Store Logo" width={50} height={50} />
                    <h2 className="text-xl font-bold ml-3 hidden md:block">Rua Web Store</h2>
                </section>

                <nav>
                    <ul className="space-y-2 p-4">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                                    onClick={() => setIsOpen(false)} 
                                >
                                    {item.icon}
                                    <span className="text-base">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ul className="border-t border-gray-700 p-4 space-y-2">
                    <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                        <FaCog />
                        <span className="text-base">Settings</span>
                    </li>
                    <li
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition cursor-pointer"
                    >
                        <FaSignOutAlt />
                        <span className="text-base">Logout</span>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default SideBar;
