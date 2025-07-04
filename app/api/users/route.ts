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

export async function POST(req: Request) {
    await connectDB();
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
        }

        const newClient = await Client.create({ name, email });
        return NextResponse.json({ message: "Client created successfully", client: newClient });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create client", error }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const detail = await req.json();


        if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        
        const result = await Client.findByIdAndUpdate(id, detail, { new: true });
        if (!result) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        


        return NextResponse.json({ message: "Client updated successfully", client: result });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update client", error }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    await connectDB();
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Client ID is required" }, { status: 400 });
        }

        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Client deleted successfully", client: deletedClient });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete client", error }, { status: 500 });
    }
}
