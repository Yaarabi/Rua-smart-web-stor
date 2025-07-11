"use client";

import Posting from "@/components/btnPatient";
import { useQuery } from "@tanstack/react-query";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import AIAnalysisButton from "./aiRespense";

interface Filters {
    dateFrom: string;
    dateTo: string;
    region?: string;
}

interface RevenueDataPoint {
    _id: {
        year: number;
        month: number;
        day: number;
    };
    totalRevenue: number;
    orderCount: number; 
    avgBasketValue: number; 
}

export default function RevenueChart({ filters }: { filters: Filters }) {
    const { data, isLoading, error } = useQuery<RevenueDataPoint[], Error>({
        queryKey: ["revenue", filters],
        queryFn: async () => {
        const res = await fetch(
            `/api/analytics/revenue?dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}${
            filters.region ? `&region=${filters.region}` : ""
            }`
        );
        if (!res.ok) {
            throw new Error("Failed to fetch revenue data");
        }
        return res.json();
        }
    });

    if (isLoading) {
        return (
            <div className="text-gray-200 p-6 bg-gray-900 rounded-md text-center flex justify-center items-center gap-3">
                    <Posting />
                    <span className="text-lg font-medium animate-pulse">Loading revenue data...</span>
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

    const chartData = data?.map((d) => ({
        date: `${d._id.year}-${String(d._id.month).padStart(2, "0")}-${String(
        d._id.day
        ).padStart(2, "0")}`,
        totalRevenue: d.totalRevenue,
    })) ?? [];

    return (
        <div className="bg-gray-900 p-6 rounded-md shadow-lg mt-8">
        <h2 className="text-white text-xl mb-4">Revenue Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
            <XAxis
                dataKey="date"
                stroke="#bbb"
                tick={{ fontSize: 12 }}
                tickFormatter={(str) => str.slice(5)}
            />
            <YAxis stroke="#bbb" />
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <Tooltip
                contentStyle={{ backgroundColor: "#2d3748", borderRadius: 4 }}
                itemStyle={{ color: "#cbd5e1" }}
            />
            <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={false}
            />
            </LineChart>
        </ResponsiveContainer>
        <AIAnalysisButton data={data || []}/>
        </div>
    );
}
