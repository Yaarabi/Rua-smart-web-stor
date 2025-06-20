import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/products";

export async function GET() {
    await connectDB();
    try {
        const products = await Product.find();
        return NextResponse.json({ message: "Products retrieved successfully", products });
    } catch (error) {
        return NextResponse.json({ message: "Failed to retrieve products", error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();
        const product = new Product(body);
        await product.save();
        return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
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

        if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

        const result = await Product.findByIdAndUpdate(id, detail, { new: true });
        if (!result) return NextResponse.json({ message: "Product not found" }, { status: 404 });

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

        if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

        const result = await Product.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ message: "Product not found" }, { status: 404 });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: "Error in DELETE request", error }, { status: 500 });
    }
}
