
"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaClipboardCheck, FaLightbulb } from "react-icons/fa";

const Page = () => {
    

    const router = useRouter();

    

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
        
            <div className="max-w-xl w-full p-8 bg-gray-800 rounded-3xl shadow-lg text-center space-y-8">
            <div
                onClick={() => router.push("/dashboard/goals")}
                className="flex items-center gap-2 cursor-pointer self-start hover:text-indigo-400 transition"
            >
                <FaArrowLeft className="text-lg" />
                <span className="font-medium">Back</span>
            </div>
            <div
            onClick={() => router.push("/dashboard/goals/marketing/myAds")}
                className="cursor-pointer flex items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 hover:bg-indigo-700 transition px-6 py-4"
            >
                <FaClipboardCheck className="text-3xl text-indigo-400" />
                <span className="text-xl font-semibold">My Ads</span>
            </div>

            <div
            onClick={() => router.push("/dashboard/goals/marketing/promo")}
                className="cursor-pointer flex items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 hover:bg-indigo-700 transition px-6 py-4"
            >
                <FaLightbulb className="text-3xl text-indigo-400" />
                <span className="text-xl font-semibold">Set Home Ad</span>
            </div>
            </div>
    </section>
)}

export default Page;
