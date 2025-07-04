"use client";
import CustomerTable from "@/components/dashboard/emailTable";
import Recomend from "@/components/dashboard/recomend";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const [recomend, setRecommend] = useState(false);
    const router = useRouter();

    return (
        <section className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                >
                    Back
                </button>

                <button
                    onClick={() => setRecommend(!recomend)}
                    className={`px-5 py-2.5 rounded-lg transition ${recomend ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                >
                    {recomend ? "Hide Recommendations" : "Show Recommendations"}
                </button>
            </div>

            {recomend && (
                <div className="mb-10">
                    <Recomend />
                </div>
            )}


            <div className="mt-10">
                <CustomerTable />
            </div>
        </section>
    );
};

export default Page;
