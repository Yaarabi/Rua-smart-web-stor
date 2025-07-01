"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Direct", value: 50.5 },
    { name: "Referral", value: 30.5 },
    { name: "Organic", value: 19 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function TrafficChannelChart() {
    return (
        <Card sx={{ backgroundColor: "#111827", width: "300px", color: "white", borderRadius: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                    Traffic Channel
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            label
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#374151", border: "none", color: "white" }}
                            itemStyle={{ color: "white" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
