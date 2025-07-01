"use client"

import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", profit: 8000, loss: 4000 },
    { name: "Feb", profit: 9670, loss: 4500 },
    { name: "Mar", profit: 10980, loss: 7000 },
    { name: "Apr", profit: 14000, loss: 8200 },
    { name: "May", profit: 12500, loss: 6100 },
    { name: "Jun", profit: 9500, loss: 4800 },
];

export default function RevenueChart() {
    return (
        <Card sx={{ backgroundColor: "#111827", color: "white", borderRadius: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>Revenue</Typography>
                <Typography variant="h5" fontWeight="bold" gutterBottom>$16,400.12</Typography>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: "#374151", border: "none", color: "white" }} 
                            itemStyle={{ color: "white" }}
                        />
                        <Bar dataKey="profit" fill="#34D399" /> 
                        <Bar dataKey="loss" fill="#F87171" />  
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
