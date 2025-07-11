"use client";

import Posting from "@/components/btnPatient";
import { useQuery } from "@tanstack/react-query";
import AIAnalysisButton from "./aiRespense";

interface Order {
    _id: string;
    name?: string;
    totalPrice: number;
    paidAt: string;
    isDelivered: boolean;
    shippingAddress?: {
        city?: string;
};
}

export default function RealTimeOrders() {
    const { data, isLoading, error } = useQuery<Order[], Error>({
        queryKey: ["recentOrders"],
        queryFn: async () => {
        const res = await fetch("/api/orders/recent");
        if (!res.ok) {
            throw new Error("Failed to fetch recent orders");
        }
        return res.json();
        },
        refetchInterval: 5000, // this is to refresh every 5 seconds
        staleTime: 1000 * 10,   // return to this cache for 10 seconds even the component is mounted
    });

    if (isLoading) {
        return (
        <div className="text-gray-200 p-6 bg-gray-900 rounded-md text-center flex justify-center items-center gap-3">
            <Posting />
            <span className="text-lg font-medium animate-pulse">Loading product performance...</span>
        </div>
        );
    }

    if (error) {
        return (
        <div className="text-red-400 p-4 bg-gray-900 rounded-md text-center">
            {error.message}
        </div>
        );
    }

    return (
        <div className="bg-gray-900 p-6 rounded-md shadow-lg mt-8 max-h-96 overflow-auto">
        <h2 className="text-white text-xl mb-4">Real-time Order Tracking</h2>
        <table className="w-full text-left border-collapse">
            <thead>
            <tr className="border-b border-gray-600">
                <th className="py-2 px-3 text-gray-300">Customer</th>
                <th className="py-2 px-3 text-gray-300">Total Price</th>
                <th className="py-2 px-3 text-gray-300">Date</th>
                <th className="py-2 px-3 text-gray-300">Status</th>
                <th className="py-2 px-3 text-gray-300">City</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((order) => (
                <tr
                key={order._id}
                className="border-b border-gray-600 hover:bg-gray-600 transition-colors"
                >
                <td className="py-2 px-3">{order.name || "Guest"}</td>
                <td className="py-2 px-3">${order.totalPrice.toFixed(2)}</td>
                <td className="py-2 px-3">
                    {new Date(order.paidAt).toLocaleString()}
                </td>
                <td className="py-2 px-3">
                    {order.isDelivered ? (
                    <span className="text-green-400 font-semibold">Delivered</span>
                    ) : (
                    <span className="text-yellow-400 font-semibold">Processing</span>
                    )}
                </td>
                <td className="py-2 px-3">{order.shippingAddress?.city || "-"}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <AIAnalysisButton data={data || []}/>
        </div>
    );
}
