import Image from "next/image";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Header = () => {
    return (
        <header className="bg-white shadow">
            <section className="text-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-3">
                <p className="text-sm font-medium">🚀 Exclusive Offers & Latest Updates</p>
            </section>
            
            <div className="flex justify-between items-center px-6 bg-gray-200">
                <div className="flex items-center space-x-1">
                    <Image 
                        src="/logo.svg" 
                        alt="Rua Web Store Logo" 
                        width={70} 
                        height={70} 
                    />
                    <h1 className="text-xl font-bold text-blue-800">Rua Web Store</h1>
                </div>
                <button aria-label="Change Language" className="p-2 rounded">
                    🌐 Language
                </button>
            </div>

            <nav className="flex flex-wrap justify-evenly items-center p-4 shadow">
                <ul className="flex space-x-6 text-gray-700">
                    <li><a href="#" className="hover:text-blue-600">Categorie 1</a></li>
                    <li><a href="#" className="hover:text-blue-600">Categorie 2</a></li>
                    <li><a href="#" className="hover:text-blue-600">Categorie 3</a></li>
                </ul>
                
                <form className="flex items-center space-x-2 w-2/5">
                    <input 
                        type="search" 
                        placeholder="Search products..." 
                        className="border rounded p-2 w-4/5" 
                    />
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Search
                    </button>
                </form>

                <div className="flex space-x-4">
                    <FaUser size={30} className="hover:text-blue-600 text-gray-600 transition cursor-pointer"/>
                    <MdSupportAgent size={30} className="hover:text-blue-600 text-gray-500 transition cursor-pointer"/>
                    <FaShoppingCart size={30} className="hover:text-blue-600 text-gray-400 transition cursor-pointer"/>
                </div>
            </nav>
        </header>
    );
}

export default Header;
