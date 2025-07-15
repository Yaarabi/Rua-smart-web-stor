"use client";

import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";
import { useQuery } from "@tanstack/react-query";
import {
    Typography,
    Box,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

interface Goal {
    title: string;
    aggregates: string[];
    createdAt: Date;
    targetValues: Record<string, number>;
}

interface AIResponse {
    timeFrame: string;
    data: {
        currentAchievment: number;
        goalTarget: number;
    };
    insights?: string;
}

export default function Chart({ goal }: { goal: Goal }) {
    const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { data, isLoading: queryLoading } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
        },
    });

    useEffect(() => {
        const prompt = `Goal: ${JSON.stringify(goal)}
    Based on the data: ${JSON.stringify(data)}
    *Generate a valid JSON object structured like this:
    {
    "timeFrame": "goal date start - goal date end",
    "data": {
        "currentAchievment": <computedNumber>,
        "goalTarget": <computedNumber>
    },
    "insights": "<brief analysis>"
    }*
    Important: Return only JSON without markdown or code block formatting.
    Only include computed values — no expressions or formulas.`;

        const fetchAIResponse = async () => {
        if (!data || loading) return;
        setLoading(true);
        setErrorMessage("");

        try {
            const rawResponse = await getRespense(prompt);

            if (!rawResponse) {
                throw new Error("AI response is empty or null");
            }

            const parsedResponse = JSON.parse(rawResponse);
            const aiText = parsedResponse.choices?.[0]?.message?.content;
            

            if (!aiText) {
                throw new Error("AI response missing content");
            }

            const cleaned = aiText.replace(/```json|```/g, "").trim();
            const parsedAI = JSON.parse(cleaned);

            setAiResponse(parsedAI);
        } catch (error) {
            console.error("AI parsing error:", error);
            setErrorMessage("Something went wrong while processing the AI insights.");
        }

        setLoading(false);
        };

        fetchAIResponse();
    }, [data, goal]);

    if (queryLoading || loading) {
        return (
        <Box display="flex" alignItems="center" justifyContent="center" height={300}>
            <CircularProgress />
        </Box>
        );
    }

    if (errorMessage) {
        return (
        <Box display="flex" justifyContent="center" p={2}>
            <Alert severity="error">{errorMessage}</Alert>
        </Box>
        );
    }

    if (!aiResponse) return null;

    const { currentAchievment, goalTarget } = aiResponse.data;

    const chartData = [
        {
        name: goal.title,
        Target: goalTarget,
        Achieved: Math.min(currentAchievment, goalTarget),
        },
    ];

    return (
        <Card
        sx={{
            width: "100%",
            maxWidth: 720,
            mx: "auto",
            mt: 5,
            boxShadow: 6,
            borderRadius: 4,
            bgcolor: "#374151",
            color: "#f9fafb",
        }}
        >
        <CardContent sx={{ px: 4, py: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom color="inherit">
            {goal.title}
            </Typography>
            <Typography variant="subtitle2" color="#d1d5db" gutterBottom>
            Target tracking over {aiResponse.timeFrame}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "#4b5563" }} />

            <ResponsiveContainer width="100%" height={260}>
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis type="number" stroke="#e5e7eb" />
                <YAxis type="category" stroke="#e5e7eb" />
                <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderColor: "#6b7280" }}
                labelStyle={{ color: "#f9fafb" }}
                itemStyle={{ color: "#f9fafb" }}
                />
                <Bar dataKey="Target" fill="#6b7280" barSize={30} />
                <Bar dataKey="Achieved" fill="#3b82f6" barSize={30}>
                <LabelList dataKey="Achieved" position="insideLeft" fill="#f9fafb" />
                </Bar>
            </BarChart>
            </ResponsiveContainer>

            <Typography
            variant="body1"
            sx={{
                mt: 3,
                fontWeight: 500,
                color: currentAchievment >= goalTarget ? "#22c55e" : "#facc15",
            }}
            >
            Progress: {currentAchievment} / {goalTarget}
            </Typography>

            {aiResponse.insights && (
            <Box mt={3} p={2} borderRadius={2} bgcolor="#1f2937" border="1px solid #4b5563">
                <Typography variant="subtitle2" fontWeight={600} gutterBottom color="#f9fafb">
                Insights
                </Typography>
                <Typography variant="body2" color="#d1d5db" fontStyle="italic">
                {aiResponse.insights}
                </Typography>
            </Box>
            )}
        </CardContent>
        </Card>
    );
}
