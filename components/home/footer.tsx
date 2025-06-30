
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-900 text-white border-t border-gray-700 py-16 px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-xl mx-auto">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Rua Web Store</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        AI-powered e-commerce solutions designed for smart businesses and dropshippers to scale effortlessly.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                    <ul className="text-gray-400 space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Shop</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">FAQs</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-4">Support</h3>
                    <ul className="text-gray-400 space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Returns & Refunds</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 text-gray-200 rounded-xl bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="w-full bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto text-center">
                <p className="text-sm text-gray-400 mb-4 md:mb-0">
                    &copy; 2025 Rua Web Store. All rights reserved.
                </p>
                <div className="flex space-x-6 text-2xl">
                    <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-transform transform hover:scale-110"><FaFacebook /></a>
                    <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-transform transform hover:scale-110"><FaTwitter /></a>
                    <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-transform transform hover:scale-110"><FaInstagram /></a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-transform transform hover:scale-110"><FaLinkedin /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
