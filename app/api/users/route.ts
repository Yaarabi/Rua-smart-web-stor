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
        const { id, name, email } = await req.json();

        if (!id || (!name && !email)) {
            return NextResponse.json({ message: "ID and at least one field (name or email) are required" }, { status: 400 });
        }

        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { $set: { name, email } },
            { new: true }
        );

        if (!updatedClient) {
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Client updated successfully", client: updatedClient });
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
