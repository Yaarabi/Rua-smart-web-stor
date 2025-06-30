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
    action: () => void
}

const Option = ({ action }: Props) => {
    const postUrl = "https://www.rua.com/post/youssef"

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
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-white text-sm md:text-base lg:text-lg">
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaFacebook className="text-2xl" />
                <span>Share on Facebook</span>
            </a>
            <a
                href="https://www.facebook.com/adsmanager/creation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaFacebook className="text-2xl" />
                <span>Create Facebook Ad</span>
            </a>

            <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check this out 👉 ${postUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaTwitter className="text-2xl" />
                <span>Tweet This Post</span>
            </a>
            <a
                href="https://ads.twitter.com/start"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaTwitter className="text-2xl" />
                <span>Create Twitter Ad</span>
            </a>

            <a
                href="https://www.instagram.com/yourprofile/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaInstagram className="text-2xl" />
                <span>Go to Instagram Profile</span>
            </a>
            <a
                href="https://www.facebook.com/adsmanager/creation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaInstagram className="text-2xl" />
                <span>Create Instagram Ad</span>
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaLinkedin className="text-2xl" />
                <span>Share on LinkedIn</span>
            </a>
            <a
                href="https://www.linkedin.com/ad/start"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <FaLinkedin className="text-2xl" />
                <span>Create LinkedIn Ad</span>
            </a>

            <a
                href="https://ads.google.com/aw/campaigns/new"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <SiGooglemarketingplatform className="text-2xl" />
                <span>Create Google Ad</span>
            </a>
            <a
                href="https://ads.google.com/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 hover:scale-105 transition-transform flex items-center space-x-2"
            >
                <SiGooglemarketingplatform className="text-2xl" />
                <span>Google Ads Dashboard</span>
            </a>
            </div>
        </div>
        </>
    )
    }

export default Option
