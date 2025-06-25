import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export async function GET() {
    await connectDB();
    try {
        const Orders = await Order.find();
        return NextResponse.json({ message: "Orders retrieved successfully", Orders });
    } catch (error) {
        return NextResponse.json({ message: "Failed to retrieve Orders", error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();
        const order = new Order(body);
        await order.save();
        return NextResponse.json({ message: "Order created successfully", Order }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Upload failed", error }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const detail = await req.json();

        if (!id) return NextResponse.json({ message: "Order ID is required" }, { status: 400 });

        const result = await Order.findByIdAndUpdate(id, detail, { new: true });
        if (!result) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: "Error in PUT request", error }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ message: "Order ID is required" }, { status: 400 });

        const result = await Order.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        return NextResponse.json({ message: "Order Deleted", data: result },{ status: 202 });
    } catch (error) {
        return NextResponse.json({ message: "Error in DELETE request", error }, { status: 500 });
    }
}
