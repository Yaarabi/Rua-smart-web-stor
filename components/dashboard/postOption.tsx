"use client"
import {
    FaArrowLeft,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter
} from "react-icons/fa"
import { SiGooglemarketingplatform } from "react-icons/si"

interface Props {
    image: string;
    action: () => void
}


const Option = ({ action, image }: Props) => {
    const postUrl = `rua-smart-web-store-git-main-youssef-aarabis-projects.vercel.app${image}`;

    return (
        <>
            <button
                onClick={action}
                className="text-white hover:text-indigo-400 transition mb-6 flex items-center space-x-2"
            >
                <FaArrowLeft className="text-xl" />
                <span>Back</span>
            </button>

            <div className="w-full h-[80vh] flex justify-center items-center px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-base md:text-lg lg:text-xl">
                    
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaFacebook className="text-2xl" />
                        <span>Share on Facebook</span>
                    </a>

                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🚀 Check this amazing post 👉 ${postUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaTwitter className="text-2xl" />
                        <span>Share on Twitter</span>
                    </a>

                    <a
                        href="https://www.instagram.com/yourprofile/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaInstagram className="text-2xl" />
                        <span>Go to Instagram</span>
                    </a>

                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-blue-300 hover:bg-blue-400 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaLinkedin className="text-2xl" />
                        <span>Share on LinkedIn</span>
                    </a>

                </div>
            </div>
        </>
    );
};




export default Option



export const AdOption = ({ action, image }: Props) => {
    const postUrl = `https://www.rua.com/ad/${image}`;

    return (
        <>
            <button
                onClick={action}
                className="text-white hover:text-indigo-400 transition mb-6 flex items-center space-x-2"
            >
                <FaArrowLeft className="text-xl" />
                <span>Back</span>
            </button>

            <div className="w-full h-[80vh] flex justify-center items-center px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-base md:text-lg lg:text-xl">

                    <a
                        href={`https://ads.google.com/aw/campaigns/new?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-yellow-500 hover:bg-yellow-600 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <SiGooglemarketingplatform className="text-2xl" />
                        <span>Create Google Ad</span>
                    </a>

                    <a
                        href={`https://www.facebook.com/adsmanager/creation?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaFacebook className="text-2xl" />
                        <span>Create Facebook Ad</span>
                    </a>

                    <a
                        href={`https://www.linkedin.com/ad/start?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaLinkedin className="text-2xl" />
                        <span>Create LinkedIn Ad</span>
                    </a>

                    <a
                        href={`https://www.facebook.com/adsmanager/creation?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaInstagram className="text-2xl" />
                        <span>Create Instagram Ad</span>
                    </a>

                    <a
                        href={`https://ads.twitter.com/start?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-blue-300 hover:bg-blue-400 hover:scale-105 transition-transform py-3 px-6 rounded-xl shadow"
                    >
                        <FaTwitter className="text-2xl" />
                        <span>Create Twitter Ad</span>
                    </a>

                </div>
            </div>
        </>
    );
};


