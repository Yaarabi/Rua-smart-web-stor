"use client";

import Posting from "@/components/btnPatient";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface Filters {
    dateFrom: string;
    dateTo: string;
    category?: string;
}

interface ProductPerformance {
    _id: string;
    name: string;
    totalQuantitySold: number;
    totalRevenue: number;
}

export default function ProductPerformanceChart({ filters }: { filters: Filters }) {
    const { data, isLoading, error } = useQuery<ProductPerformance[], Error>({
        queryKey: ["productPerformance", filters],
        queryFn: async () => {
        const res = await fetch(
            `/api/analytics/product?dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}${
            filters.category ? `&category=${filters.category}` : ""
            }`
        );
        if (!res.ok) {
            throw new Error("Failed to fetch product performance");
        }
        return res.json();
        },
        staleTime: 1000 * 60 * 5, // this fro cache for 5 minutes
    });

    if (isLoading) {
        return (
        <div className="text-gray-200 p-4 bg-gray-900 rounded-md text-center">
            <Posting/> Loading product performance...
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
        <div className="bg-gray-900 p-6 rounded-md shadow-lg mt-8">
        <h2 className="text-white text-xl mb-4">Top Products by Quantity Sold</h2>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis type="number" stroke="#bbb" />
            <YAxis
                type="category"
                dataKey="name"
                stroke="#bbb"
                width={150}
                tick={{ fontSize: 14 }}
            />
            <Tooltip
                contentStyle={{ backgroundColor: "#2d3748", borderRadius: 4 }}
                itemStyle={{ color: "#cbd5e1" }}
            />
            <Legend wrapperStyle={{ color: "#bbb" }} />
            <Bar dataKey="totalQuantitySold" fill="#60a5fa" name="Quantity Sold" />
            <Bar dataKey="totalRevenue" fill="#fbbf24" name="Revenue" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}
