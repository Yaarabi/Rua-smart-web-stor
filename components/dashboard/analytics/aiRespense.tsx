import { useState } from "react";
import getRespense from "@/app/hooks/getIArespense";

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

interface ProductPerformance {
    _id: string;
    name: string;
    totalQuantitySold: number;
    totalRevenue: number;
}

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

interface Props {
    data: SalesTrend[] | ProductPerformance[] | Order[] | [];
}

export default function AIAnalysisButton({ data }: Props) {
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAIAnalyse = async () => {
        setLoading(true);

        let summary = "";

        if (data.length === 0) {
            summary = "No data available to analyze.";
        } else if ("totalRevenue" in data[0] && "orderCount" in data[0]) {
            // SalesTrend 
            summary = (data as SalesTrend[])
                .map((d) => `Date: ${d._id.year}-${String(d._id.month).padStart(2, "0")}-${String(d._id.day).padStart(2, "0")}, Revenue: ${d.totalRevenue}, Orders: ${d.orderCount}`)
                .join("\n");
                // ----------padStart example----------
//             const month = "3";
//             console.log(month.padStart(2, "0")); // "03"

        } else if ("totalQuantitySold" in data[0]) {
            // ProductPerformance 
            summary = (data as ProductPerformance[])
                .map((d) => `Product: ${d.name}, Total Sold: ${d.totalQuantitySold}, Revenue: ${d.totalRevenue}`)
                .join("\n");
        } else if ("totalPrice" in data[0]) {
            // Order 
            summary = (data as Order[])
                .map((d) => `Order: ${d.name || 'Unknown'}, Total: ${d.totalPrice}, Paid At: ${d.paidAt}, Delivered: ${d.isDelivered ? 'Yes' : 'No'}, City: ${d.shippingAddress?.city || 'Unknown'}`)
                .join("\n");
        } else {
            summary = "Data format not recognized.";
        }

        const prompt = `
            Analyse the following data and provide key trends, insights, and predictions:
            ${summary}
        `;

        const response = await getRespense(prompt);
        setAiResult(response);
        setLoading(false);
    };

    return (
        <div className="mt-6 space-y-4">
            <button
                onClick={handleAIAnalyse}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                disabled={loading}
            >
                {loading ? "Analysing..." : "AI Analyse Data"}
            </button>

            {aiResult && (
                <div className="bg-gray-800 p-4 rounded-lg text-gray-200">
                    <h3 className="font-bold text-lg mb-2">AI Analysis Result:</h3>
                    <p className="whitespace-pre-line">{aiResult}</p>
                </div>
            )}
        </div>
    );
}
