"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";
import { Order } from "@/app/hooks/orderHooks";

interface Props {
    data: Order[];
    title: string; 
}

export default function TotalCard({ data, title }: Props) {
    const isSales = title.toLowerCase() === "sales";
    const isOrder = title.toLowerCase() === "orders";


    const totalOrderPrice = data.reduce((acc, order) => acc + order.totalPrice, 0);


    const totalSales = data.length

    const percentageIncrease = 12.3;
    const dailyIncrease = isSales ? 1453.89 : isOrder ? 25.5 : 0;

    return (
        <Card sx={{ backgroundColor: "#111840", color: "white", borderRadius: 2 }}>
            <CardContent>
                <Typography variant="subtitle2">
                    {isSales ? "Total Sales" : "Total Orders Value"}
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                    {isSales ? `${totalSales}` : isOrder ? `${totalOrderPrice}` : data.length}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "rgb(34 197 94)", display: "flex", alignItems: "center", gap: 1 }}
                >
                    <FaArrowUp size={14} /> {percentageIncrease}% +{isSales ? `$${dailyIncrease}` : isOrder ? `$${dailyIncrease}` : `${dailyIncrease}`} today
                </Typography>
            </CardContent>
        </Card>
    );
}
