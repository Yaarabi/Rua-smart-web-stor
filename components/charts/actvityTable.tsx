'use client';

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
} from '@mui/material';

interface GA4Row {
    dimensionValues: { value: string }[];
    metricValues: { value: string }[];
}

type ActivityRow = {
    country: string;
    date: string;
    activeUsers: string;
    engagementDuration: string;
};

function formatGA4Date(raw: string): string {
    if (!/^\d{8}$/.test(raw)) return 'Invalid Date';
    const year = raw.slice(0, 4);
    const month = raw.slice(4, 6);
    const day = raw.slice(6, 8);
    return `${year}-${month}-${day}`;
    }

export default function RecentActivity() {
    const [rows, setRows] = useState<ActivityRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecentActivity() {
        try {
            const res = await fetch('/api/trafic/activity');
            if (!res.ok) throw new Error('Failed to fetch data');

            const data = await res.json();

            const mapped: ActivityRow[] = (data.activityUsersData as GA4Row[]).map((item) => ({
            country: item.dimensionValues?.[0]?.value || 'N/A',
            date: formatGA4Date(item.dimensionValues?.[1]?.value || ''),
            activeUsers: item.metricValues?.[0]?.value || '0',
            engagementDuration: `${Math.round(
                parseFloat(item.metricValues?.[1]?.value || '0') / 60
            )} min`,
            }));

            setRows(mapped);
        } catch (error) {
            console.error(error);
            setRows([]);
        } finally {
            setLoading(false);
        }
        }

        fetchRecentActivity();
    }, []);

    if (loading) return <Typography>Loading recent activity...</Typography>;
    if (rows.length === 0) return <Typography>No recent activity found.</Typography>;

    return (
        <Card sx={{ backgroundColor: '#111827', color: 'white', borderRadius: 2, width: '100%' }}>
        <CardContent>
            <Typography variant="subtitle2" gutterBottom>
            Recent User Activity (7 days)
            </Typography>
            <TableContainer sx={{ overflowX: 'auto' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#1f2937' }}>
                <TableRow>
                    <TableCell sx={{ color: 'white' }}>Country</TableCell>
                    <TableCell sx={{ color: 'white' }}>Date</TableCell>
                    <TableCell sx={{ color: 'white' }}>Active Users</TableCell>
                    <TableCell sx={{ color: 'white' }}>Engagement Duration</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                    <TableRow
                    key={index}
                    sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#1f2937' },
                        '&:nth-of-type(even)': { backgroundColor: '#374151' },
                        '&:hover': { backgroundColor: '#4b5563' },
                    }}
                    >
                    <TableCell sx={{ color: 'white' }}>{row.country}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.date}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.activeUsers}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.engagementDuration}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        </Card>
    );
}
