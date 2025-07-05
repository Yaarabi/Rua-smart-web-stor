"use client"

import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";

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
                <TableContainer sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#1f2937" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>Customer</TableCell>
                                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>Status</TableCell>
                                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>Customer ID</TableCell>
                                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>Time</TableCell>
                                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>Amount</TableCell>
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
                                    <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>{row.name}</TableCell>
                                    <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>{row.status}</TableCell>
                                    <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>{row.id}</TableCell>
                                    <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>{row.time}</TableCell>
                                    <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>{row.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
