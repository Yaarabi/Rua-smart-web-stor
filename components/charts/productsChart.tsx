"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    TooltipProps,
} from "recharts";
import { useMemo } from "react";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    rating: number;
    createdAt: string | Date;
    quantity: number;
}

interface Props {
    products: Product[];
}

interface ChartData {
    name: string;
    value: number;
    productCount: number;
}

const COLORS = [
    "#60A5FA",
    "#34D399",
    "#FBBF24",
    "#F472B6",
    "#38BDF8",
    "#C084FC",
];

const CategoryStockChart = ({ products }: Props) => {
    const categoryData: ChartData[] = useMemo(() => {
        const aggregated = products.reduce((acc, product) => {
            const stock = parseInt(product.stock, 10);
            const stockNum = isNaN(stock) ? 0 : stock;

            if (!acc[product.category]) {
                acc[product.category] = {
                    name: product.category,
                    value: 0,
                    productCount: 0,
                };
            }

            acc[product.category].value += stockNum;
            acc[product.category].productCount += 1;

            return acc;
        }, {} as Record<string, ChartData>);

        return Object.values(aggregated);
    }, [products]);

    const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
        if (active && payload?.[0]) {
            const { name, value, productCount } = payload[0].payload;
            return (
                <Box
                    sx={{
                        backgroundColor: "#1f2937",
                        padding: "8px 12px",
                        borderRadius: 2,
                        boxShadow: 3,
                        fontSize: 13,
                        color: "#f3f4f6",
                    }}
                >
                    <strong>{name}</strong>
                    <p>Total Stock: <b>{value}</b></p>
                    <p>Products: <b>{productCount}</b></p>
                </Box>
            );
        }
        return null;
    };

    return (
        <Card
            sx={{
                backgroundColor: "#111827",
                borderRadius: "1rem",
                border: "1px solid #1f2937",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                minHeight: 320, // reduced
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "#F9FAFB",
                        mb: 2,
                        textAlign: "center"
                    }}
                >
                    📦 Product Categories & Stock Overview
                </Typography>

                <Box sx={{ width: "100%", height: 250 }}> {/* reduced */}
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90} // reduced
                                innerRadius={45} // reduced
                                paddingAngle={2}
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {categoryData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={15}
                                iconType="circle"
                                formatter={(value: string) => (
                                    <span style={{ color: "#D1D5DB", fontSize: 13 }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CategoryStockChart;
