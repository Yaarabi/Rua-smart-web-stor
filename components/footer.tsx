
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-2">
            <div className="max-w-screen-xl mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div>
                        <h3 className="text-lg font-semibold">Rua Web Store</h3>
                        <p className="text-sm text-gray-400 mt-2">
                            AI-powered e-commerce solutions for smart businesses and dropshippers.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-gray-200">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-200">Shop</a></li>
                            <li><a href="#" className="hover:text-gray-200">FAQs</a></li>
                            <li><a href="#" className="hover:text-gray-200">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-gray-200">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-gray-200">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-gray-200">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Stay Updated</h3>
                        <form className="mt-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2 text-gray-200 rounded bg-gray-700"
                            />
                            <button className="mt-2 w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-evenly items-center">
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Rua Web Store. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="hover:text-gray-300"> <FaFacebook/> </a>
                        <a href="#" aria-label="Twitter" className="hover:text-gray-300"> <FaTwitter/> </a>
                        <a href="#" aria-label="Instagram" className="hover:text-gray-300"> <FaInstagram/> </a>
                        <a href="#" aria-label="Linkedin" className="hover:text-gray-300"> <FaLinkedin/> </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
