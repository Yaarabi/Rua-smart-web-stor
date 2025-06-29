import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"



const Option = () => {
    return (
        <div className="flex flex-col space-y-6 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-transform transform hover:scale-110"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-transform transform hover:scale-110"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-transform transform hover:scale-110"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-transform transform hover:scale-110"><FaLinkedin /></a>
        </div>
    )
}

export default Option
