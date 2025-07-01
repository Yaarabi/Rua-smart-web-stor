"use client"

import { Card, CardContent, Typography } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";

export default function TotalSalesCard() {
    return (
        <Card sx={{ backgroundColor: "#111827", color: "white", borderRadius: 2 }}>
            <CardContent>
                <Typography variant="subtitle2">Total Sales</Typography>
                <Typography variant="h5" fontWeight="bold">$120,784.02</Typography>
                <Typography variant="body2" sx={{ color: "rgb(34 197 94)", display: "flex", alignItems: "center", gap: 1 }}>
                    <FaArrowUp size={14} /> 12.3% +$1,453.89 today
                </Typography>
            </CardContent>
        </Card>
    );
}
