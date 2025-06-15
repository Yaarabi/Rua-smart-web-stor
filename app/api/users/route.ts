

import { connectDB } from "@/lib/db";
import Client from "@/models/users";
import { NextResponse } from "next/server"; 


export async function GET() {
    await connectDB();
    try {
        const clients = await Client.find({});
        return NextResponse.json({ message: "Clients retrieved successfully", clients });
    } catch (error) {
        return NextResponse.json({ message: "Failed to retrieve Clients", error }, { status: 500 });
    }
}
