import Image from "next/image";
import { FaHome, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaClipboardCheck } from "react-icons/fa";

const SideBar = () => {
        return (
            <aside className="md:fixed w-64 h-screen bg-gray-900 text-white flex flex-col">

            <section className="flex items-center p-6">
                <Image src="/whiteLogo.svg" alt="Rua Web Store Logo" width={70} height={70} />
                <h2 className="text-xl font-bold ml-3">Rua Web Store</h2>
            </section>

            <nav className="flex-1">
                <ul className="space-y-4 p-4">
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <FaHome />
                    <span>Dashboard</span>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <FaShoppingCart />
                    <span>Products</span>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <FaClipboardCheck />
                    <span>Orders</span>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <FaUsers />
                    <span>Customers</span>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <FaChartBar />
                    <span>Analytics</span>
                </li>
                </ul>
            </nav>

            <ul className="border-t border-gray-700 p-4">
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                <FaCog />
                <span>Settings</span>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 cursor-pointer">
                <FaSignOutAlt />
                <span>Logout</span>
                </li>
            </ul>
            </aside>
);
};

export default SideBar;
