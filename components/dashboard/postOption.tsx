"use client";

import {
    FaArrowLeft,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaLightbulb ,
} from "react-icons/fa";
import { SiGooglemarketingplatform } from "react-icons/si";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";
import Loader from "@/components/loader";

interface Props {
    image: string;
    action: () => void;
}


const AIPanel = ({ advice, loading }: { advice: string; loading: boolean }) => (
    <div className="
        bg-gradient-to-br from-gray-800 to-gray-900
        text-white px-8 py-6
        rounded-3xl shadow-xl mb-12 max-w-3xl mx-auto
        text-center border border-gray-700
        ring-1 ring-indigo-500/30
        transition-all duration-500
    ">
        {loading ? (
        <div className="flex justify-center">
            <Loader />
        </div>
        ) : (
        <p className="text-base md:text-lg text-gray-200 leading-relaxed flex items-center justify-center gap-3 select-text">
            <FaLightbulb  className="text-yellow-400 text-3xl flex-shrink-0" />
            {advice}
        </p>
        )}
    </div>
);


export const Option = ({ action, image }: Props) => {
    const postUrl = `https://rua-smart-web-store-git-main-youssef-aarabis-projects.vercel.app${image}`;
    const [aiAdvice, setAiAdvice] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvice = async () => {
        const date = new Date().toLocaleString("en-GB", {
            timeZone: "Africa/Casablanca",
        });
        const prompt = `
        You are an expert in social media engagement for Moroccan audiences (timezone GMT+1).

        Based on the current local date and time: ${date}, tell me in *just two natural sentences* if this is a good time to publish a social media post.

        Be friendly, casual, and clear. If it's a good time, encourage the user. If it's not ideal, suggest a better time (e.g., “try after 8 PM”).

        Avoid technical language. Respond like a helpful assistant guiding a store owner.
        `;

        const response = await getRespense(prompt);
        if (response) setAiAdvice(response);
        setLoading(false);
        };
        fetchAdvice();
    }, []);

    return (
        <div className="px-4 py-8">
        <button
            onClick={action}
            className="text-white hover:text-indigo-400 transition mb-6 flex items-center space-x-2"
        >
            <FaArrowLeft className="text-xl" />
            <span>Back</span>
        </button>

        <AIPanel advice={aiAdvice} loading={loading} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaFacebook className="text-2xl" />
            <span>Share on Facebook</span>
            </a>

            <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `🚀 Check this amazing post 👉 ${postUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaTwitter className="text-2xl" />
            <span>Share on Twitter</span>
            </a>

            <a
            href="https://www.instagram.com/yourprofile/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaInstagram className="text-2xl" />
            <span>Go to Instagram</span>
            </a>

            <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-blue-300 hover:bg-blue-400 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaLinkedin className="text-2xl" />
            <span>Share on LinkedIn</span>
            </a>
        </div>
        </div>
    );
    };

export default Option;

export const AdOption = ({ action, image }: Props) => {
    const postUrl = `https://www.rua.com/ad/${image}`;
    const [aiAdvice, setAiAdvice] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvice = async () => {
        const date = new Date().toLocaleString("en-GB", {
            timeZone: "Africa/Casablanca",
        });
        const prompt = `
            You are an expert in online advertising for Moroccan audiences (timezone GMT+1).

            Based on the current local date and time: ${date}, tell me in *just two friendly sentences* if this is a good time to launch an online ad campaign.

            Consider ad engagement trends, cost-efficiency, and best-performing hours in Morocco. If it's not ideal, suggest a better time (e.g., “Try launching it around 10 AM or after 6 PM”).

            Avoid jargon — sound like a helpful assistant giving advice to a business owner.
            `;

        const response = await getRespense(prompt);
        if (response) setAiAdvice(response);
        setLoading(false);
        };
        fetchAdvice();
    }, []);

    return (
        <div className="px-4 py-8">
        <button
            onClick={action}
            className="text-white hover:text-indigo-400 transition mb-6 flex items-center space-x-2"
        >
            <FaArrowLeft className="text-xl" />
            <span>Back</span>
        </button>

        <AIPanel advice={aiAdvice} loading={loading} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            <a
            href={`https://ads.google.com/aw/campaigns/new?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-yellow-500 hover:bg-yellow-600 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <SiGooglemarketingplatform className="text-2xl" />
            <span>Create Google Ad</span>
            </a>

            <a
            href={`https://www.facebook.com/adsmanager/creation?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaFacebook className="text-2xl" />
            <span>Create Facebook Ad</span>
            </a>

            <a
            href={`https://www.linkedin.com/ad/start?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaLinkedin className="text-2xl" />
            <span>Create LinkedIn Ad</span>
            </a>

            <a
            href={`https://www.facebook.com/adsmanager/creation?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaInstagram className="text-2xl" />
            <span>Create Instagram Ad</span>
            </a>

            <a
            href={`https://ads.twitter.com/start?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-blue-300 hover:bg-blue-400 hover:scale-105 transition-all py-4 px-6 rounded-2xl shadow-lg"
            >
            <FaTwitter className="text-2xl" />
            <span>Create Twitter Ad</span>
            </a>
        </div>
        </div>
    );
};
