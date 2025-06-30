import { FaArrowLeft, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Props {
    action: () => void;
}

const Option = ({ action }: Props) => {
    return (
        <>
            <button
                onClick={action}
                className="text-white hover:text-indigo-400 transition mb-6 flex items-center space-x-2"
            >
                <FaArrowLeft className="text-xl" />
                <span>Back</span>
            </button>

            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="flex space-x-10 text-4xl text-white">
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.rua.com/post/youssef`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="hover:text-blue-500 transition-transform hover:scale-125 duration-300"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?text=hhhhh`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="hover:text-blue-400 transition-transform hover:scale-125 duration-300"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.rua.com/post/youssef`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-pink-500 transition-transform hover:scale-125 duration-300"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-blue-300 transition-transform hover:scale-125 duration-300"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Option;
