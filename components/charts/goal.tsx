"use client";

import { Card, CardContent, Typography } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Loader from "../loader";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";

interface Goal {
    title: string;
    aggregates: string[];
    timeFrame: string;
}

interface AIResponse {
    aggregates: string[];
    timeFrame: string;
    data: Array<Record<string, number | string>>;
    insights?: string;
}

export default function Chart({ goal }: { goal: Goal }) {

    const [chartData, setChartData] = useState<AIResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prompt = `Goal: ${JSON.stringify(goal)}

    Extract:
    1. Aggregates to track (e.g. revenue, customers).
    2. Time frame (default to 6 months if missing).
    3. Sample monthly data for each aggregate.
    4. A brief insights text about the goal and its data.

    Respond in a single JSON object like this:
    {
    "aggregates": ["aggregate1", "aggregate2"],
    "timeFrame": "6 months",
    "data": [
        { "month": "Month 1", "aggregate1": 1000, "aggregate2": 200 },
        { "month": "Month 2", "aggregate1": 1100, "aggregate2": 210 }
    ],
    "insights": "a brief description of the goal and its data."
    }`;

    function extractJson(text: string): string | null {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? jsonMatch[0] : null;
    }

    useEffect(() => {
        async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const result = await getRespense(prompt);
            if (!result) throw new Error("No data returned from AI");

            let parsed: AIResponse;
            if (typeof result === "string") {
            const jsonStr = extractJson(result);
            if (!jsonStr) throw new Error("No JSON found in response");
            parsed = JSON.parse(jsonStr);
            } else {
            parsed = result;
            }

            setChartData(parsed);
        } catch (err: unknown) {
            if (err instanceof Error) {
            setError(err.message);
            } else {
            setError("Error fetching data");
            }
        } finally {
            setLoading(false);
        }
        }
        fetchData();
    }, [goal, prompt]);

    if (loading) return <Loader />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!chartData) return null;

    return (
        <Card sx={{ width: "100%", p: 2, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
            {goal.title}
            </Typography>

            <Typography variant="body2" mb={2}>
            Tracking period: {chartData.timeFrame}
            </Typography>

            <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={chartData.data}
                margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartData.aggregates.map((agg, index) => (
                    <Line
                    key={agg}
                    type="monotone"
                    dataKey={agg}
                    stroke={
                        ["#1976d2", "#2e7d32", "#ff9800", "#d32f2f"][index % 4]
                    }
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    name={agg.charAt(0).toUpperCase() + agg.slice(1)}
                    />
                ))}
                </LineChart>
            </ResponsiveContainer>
            </div>

            {chartData.insights && (
            <Typography variant="body2" mt={2} fontStyle="italic">
                Insights: {chartData.insights}
            </Typography>
            )}
        </CardContent>
        </Card>
    );
}
