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

interface SalesTrend {
    _id: {
        year: number;
        month: number;
        day: number;
    };
    totalRevenue: number;
    orderCount: number;
    avgBasketValue: number;
}

export default function SalesTrendsChart({ filters }: { filters: Filters }) {
    const { data, isLoading, error } = useQuery<SalesTrend[], Error>({
        queryKey: ["salesTrends", filters],
        queryFn: async () => {
        const res = await fetch(
            `/api/analytics/sales?dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}${
            filters.region ? `&region=${filters.region}` : ""
            }`
        );
        if (!res.ok) {
            throw new Error("Failed to fetch sales trends");
        }
        return res.json();
        },
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return (
        <div className="text-gray-200 p-4 bg-gray-900 rounded-md text-center">
            <Posting/>Loading sales trends...
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
        orderCount: d.orderCount,
        avgBasketValue: d.avgBasketValue,
    })) ?? [];

    return (
        <div className="bg-gray-900 p-6 rounded-md shadow-lg">
        <h2 className="text-white text-xl mb-4">Sales Trends</h2>
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
                stroke="#34d399"
                strokeWidth={2}
                dot={false}
            />
            <Line
                type="monotone"
                dataKey="orderCount"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
            />
            </LineChart>
        </ResponsiveContainer>
        <AIAnalysisButton data={data || []}/>
        </div>
    );
}
