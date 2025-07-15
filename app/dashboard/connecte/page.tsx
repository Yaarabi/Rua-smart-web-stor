// import Link from "next/link";
// import { HiOutlineInbox, HiOutlineMail } from "react-icons/hi";

// const actions = [
//     { icon: HiOutlineInbox, label: "My Boite", href: "" },         
//     { icon: HiOutlineMail, label: "Sent Email", href: "/dashboard/connecte/action" },   
// ];

// const Page = () => {
//     return (
//         <section className="w-full min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-900 text-white px-4 py-12">
//         {actions.map(({ icon: Icon, label, href }) => (
//             <Link
//             href={href}
//             key={label}
//             className="flex w-full max-w-md items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 px-6 py-4 text-xl font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 select-none cursor-pointer"
//             aria-label={label}
//             >
//             <Icon className="text-3xl text-indigo-400" />
//             <span className="w-[100px]">{label}</span>
//             </Link>
//         ))}
//         </section>
//     );
// };

// export default Page;

"use client";

import CustomerTable from "@/components/dashboard/emailTable";
import Recommend from "@/components/dashboard/recomend";
import { useState } from "react";

const Page = () => {
    const [showRecommendations, setShowRecommendations] = useState(false);

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1  p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
                    Manage & Send Targeted Email Campaigns
                </h2>
                <p className="mt-2 text-gray-100 text-sm">
                    Use smart recommendations to boost engagement and retention.
                </p>
            </div>
            <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className={`px-5 py-2.5 rounded-xl font-semibold shadow transition-colors duration-200 ${
                showRecommendations
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            >
            {showRecommendations ? "Hide Recommendations" : "Show Recommendations"}
            </button>
        </header>

        {showRecommendations && (
            <div>
            <Recommend />
            </div>
        )}

        <section>
            <CustomerTable />
        </section>
        </section>
    );
};

export default Page;
