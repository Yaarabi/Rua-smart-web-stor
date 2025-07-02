"use client";

import { Order } from "@/app/hooks/orderHooks";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

interface Props {
    data: Order[];
}

export default function RevenueChart({ data }: Props) {

    

    const chartData = useMemo(() => {
        const revenueByDate: { [key: string]: number } = {};

        data.forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString();
            if (revenueByDate[date]) {
                revenueByDate[date] += order.totalPrice;
            } else {
                revenueByDate[date] = order.totalPrice;
            }
        });

        return Object.entries(revenueByDate).map(([date, total]) => ({
            date,
            revenue: total,
        }));
    }, [data]);

    const totalRevenue = data.reduce((acc, order) => acc + order.totalPrice, 0);

    return (
        <Card sx={{ backgroundColor: "#111827", color: "white", borderRadius: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>Revenue</Typography>
                <Typography variant="h5" fontWeight="bold" gutterBottom>${totalRevenue.toFixed(2)}</Typography>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#374151", border: "none", color: "white" }}
                            itemStyle={{ color: "white" }}
                            formatter={(value: number) => `$${value.toFixed(2)}`}
                        />
                        <Bar dataKey="revenue" fill="#34D399" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
