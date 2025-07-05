

"use client"

import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const rows = [
    { name: "Ronald Richards", status: "Member", id: "#7468320", time: "5 min ago", amount: "$12,408.20" },
    { name: "Darrell Steward", status: "Signed Up", id: "#2394855", time: "10 min ago", amount: "$201.50" },
    { name: "Marvin McKinney", status: "New Customer", id: "#5494837", time: "15 min ago", amount: "$2,856.03" },
];

export default function RecentActivity() {
    return (
        <Card sx={{ backgroundColor: "#111827", color: "white", borderRadius: 2, width: "100%" }}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>Recent Activity</Typography>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1f2937" }}> 
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Customer</TableCell>
                            <TableCell sx={{ color: "white" }}>Status</TableCell>
                            <TableCell sx={{ color: "white" }}>Customer ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Time</TableCell>
                            <TableCell sx={{ color: "white" }}>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:nth-of-type(odd)": { backgroundColor: "#1f2937" }, 
                                    "&:nth-of-type(even)": { backgroundColor: "#374151" }, 
                                    "&:hover": { backgroundColor: "#4b5563" } 
                                }}
                            >
                                <TableCell sx={{ color: "white" }}>{row.name}</TableCell>
                                <TableCell sx={{ color: "white" }}>{row.status}</TableCell>
                                <TableCell sx={{ color: "white" }}>{row.id}</TableCell>
                                <TableCell sx={{ color: "white" }}>{row.time}</TableCell>
                                <TableCell sx={{ color: "white" }}>{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

