"use client";

import { useState } from "react";
import AnalyticsFilters from "@/components/dashboard/analytics/filter";
import SalesTrendsChart from "@/components/dashboard/analytics/chart";
import RevenueChart from "@/components/dashboard/analytics/revenuChart";
import ProductPerformanceChart from "@/components/dashboard/analytics/performancePro";
import RealTimeOrders from "@/components/dashboard/analytics/realTime";

export default function AnalyticsPage() {
    const [filters, setFilters] = useState({
        dateFrom: "2025-01-01",
        dateTo: "2025-07-05",
        region: "",
        category: "",
    });

    return (
        <main className="p-8 bg-gray-700 min-h-screen text-white space-y-8">
        <h1 className="text-3xl font-semibold">Exclusive Analytics</h1>
        <AnalyticsFilters onChange={setFilters} />
        <SalesTrendsChart filters={filters} />
        <RevenueChart filters={filters} />
        <ProductPerformanceChart filters={filters} />
        <RealTimeOrders />
        </main>
    );
}
