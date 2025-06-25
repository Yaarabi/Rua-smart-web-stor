import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-900 text-white border-t border-gray-700 py-12 mt-4 px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-xl mx-auto">

                <div>
                    <h3 className="text-xl font-bold mb-4">Rua Web Store</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        AI-powered e-commerce solutions for smart businesses and dropshippers.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="text-gray-400 space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Support</h3>
                    <ul className="text-gray-400 space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 text-gray-200 rounded-xl bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="w-full bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition-colors"
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto text-center">
                <p className="text-sm text-gray-400 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} Rua Web Store. All rights reserved.
                </p>
                <div className="flex space-x-6 text-2xl">
                    <a href="#" aria-label="Facebook" className="hover:text-white transition-colors transform hover:scale-110"> <FaFacebook /> </a>
                    <a href="#" aria-label="Twitter" className="hover:text-white transition-colors transform hover:scale-110"> <FaTwitter /> </a>
                    <a href="#" aria-label="Instagram" className="hover:text-white transition-colors transform hover:scale-110"> <FaInstagram /> </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors transform hover:scale-110"> <FaLinkedin /> </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
