'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

interface GA4Row {
    dimensionValues: { value: string }[];
    metricValues: { value: string }[];
}

export default function DeviceUsageChart() {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDeviceData() {
        try {
            const res = await fetch(`/api/trafic/device`);
            const json = await res.json();

            if (!Array.isArray(json.userDeviceData)) {
            throw new Error('Invalid API response: userDeviceData is not an array');
            }

            const gaData = json.userDeviceData as GA4Row[];

            const chartData = gaData.map((item) => ({
            name: item.dimensionValues?.[0]?.value || 'Unknown',
            value: Number(item.metricValues?.[0]?.value || 0),
            }));

            setData(chartData);
        } catch (error) {
            console.error('Failed to fetch device data:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
        }

        fetchDeviceData();
    }, []);

    if (loading) return <Typography>Loading device usage...</Typography>;
    if (data.length === 0) return <Typography>No device data available</Typography>;

    return (
        <Card sx={{ backgroundColor: '#111827', width: 320, color: 'white', borderRadius: 2 }}>
        <CardContent>
            <Typography variant="subtitle2" gutterBottom>
            User Devices (All Time)
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
                contentStyle={{ backgroundColor: '#374151', border: 'none', color: 'white' }}
                itemStyle={{ color: 'white' }}
                />
            </PieChart>
            </ResponsiveContainer>
        </CardContent>
        </Card>
    );
}
