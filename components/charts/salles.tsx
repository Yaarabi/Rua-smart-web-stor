"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";
import { Order } from "@/app/hooks/orderHooks";

interface Props {
    data: Order[];
    title: string;
}

function getPreviousDay(date: Date) {
    const previous = new Date(date);
    previous.setDate(date.getDate() - 1);
    return previous;
}

export default function TotalCard({ data, title }: Props) {
    const isSales = title.toLowerCase() === "sales";
    const isOrder = title.toLowerCase() === "orders";

    const today = new Date();
    const yesterday = getPreviousDay(today);

    const todayData = data.filter((order) => {
        const date = new Date(order.createdAt);
        return date.toDateString() === today.toDateString();
    });

    const yesterdayData = data.filter((order) => {
        const date = new Date(order.createdAt);
        return date.toDateString() === yesterday.toDateString();
    });

    const todayValue = isSales
        ? todayData.length
        : isOrder
        ? todayData.reduce((acc, order) => acc + order.totalPrice, 0)
        : 0;

    const yesterdayValue = isSales
        ? yesterdayData.length
        : isOrder
        ? yesterdayData.reduce((acc, order) => acc + order.totalPrice, 0)
        : 0;

    const dailyIncrease = todayValue - yesterdayValue;

    const percentageIncrease =
        yesterdayValue === 0
            ? 100 
            : ((dailyIncrease / yesterdayValue) * 100);

    const totalValue = isSales
        ? data.length
        : isOrder
        ? data.reduce((acc, order) => acc + order.totalPrice, 0)
        : 0;

    return (
        <Card sx={{ backgroundColor: "#111840", color: "white", borderRadius: 2 }}>
            <CardContent>
                <Typography variant="subtitle2">
                    {isSales ? "Total Sales" : "Total Orders Value"}
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                    {isSales ? `${totalValue}` : `$${totalValue.toFixed(2)}`}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "rgb(34 197 94)", display: "flex", alignItems: "center", gap: 1 }}
                >
                    <FaArrowUp size={14} /> 
                    {percentageIncrease.toFixed(1)}% +{isSales ? `${dailyIncrease}` : `$${dailyIncrease.toFixed(2)}`} today
                </Typography>
            </CardContent>
        </Card>
    );
}
