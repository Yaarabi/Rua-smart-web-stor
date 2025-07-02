"use client";

import { useState } from "react";
import { Product } from "@/app/dashboard/page";
import { User, useStoreInsights } from "@/app/hooks/insights";
import { Order } from "@/app/hooks/orderHooks";
import Posting from "../btnPatient";
import { FaCircle, FaDonate } from "react-icons/fa";

interface StorDataProps {
    products: Product[];
    orders: Order[];
    users: User[];
}

const StorData = ({ products, orders, users }: StorDataProps) => {
    const insights = useStoreInsights(orders, products, users);
    const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

    const handleSave = async () => {
        setStatus("saving");

        try {
            const res = await fetch("/api/insights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(insights),
            });

            if (!res.ok) throw new Error("Failed to store insights");

            setStatus("success");
        } catch (err) {
            console.error("Save error:", err);
            setStatus("error");
        }
    };

    return (
        <div className="mt-10 p-8 bg-gray-900 shadow-lg rounded-2xl border border-gray-800 w-full flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                📊 Save Business Insight Snapshot
            </h2>

            <button
                onClick={handleSave}
                disabled={status === "saving"}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 
                ${
                    status === "saving"
                        ? "bg-gray-500 cursor-wait"
                        : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white"
                }`}
            >
                {status === "saving" ? <Posting /> : "Save This Data"}
            </button>

            {status === "success" && (
                <div className="flex items-center gap-3 mt-4 text-green-400 text-base animate-pulse">
                    <FaDonate/>
                    <span>Insights saved successfully!</span>
                </div>
            )}

            {status === "error" && (
                <div className="flex items-center gap-3 mt-4 text-red-500 text-base">
                    <FaCircle className="w-4 h-4 animate-pulse" />
                    <span>Failed to save insights. Try again.</span>
                </div>
            )}
        </div>
    );
};

export default StorData;
