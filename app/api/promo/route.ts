
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Promotion from "@/models/promotions";

export async function GET(req: Request) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const status = searchParams.get("status");

        if (id) {
            const promotion = await Promotion.findById(id);
            if (!promotion) {
                return NextResponse.json({ message: "Promotion not found" }, { status: 404 });
            }
            return NextResponse.json({ message: "Promotion retrieved", promotion });
        }

        if (status) {
            const promotions = await Promotion.find({ status });
            if (promotions.length === 0) {
                return NextResponse.json({ message: "No promotions found with this status" }, { status: 404 });
            }
            return NextResponse.json({ message: "Promotions by status retrieved", promotions });
        }

        const promotions = await Promotion.find();
        return NextResponse.json({ message: "All promotions retrieved", promotions });

    } catch (error) {
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();
        const promotion = new Promotion(body);
        await promotion.save();
        return NextResponse.json({ message: "Promotion created successfully", promotion }, { status: 201 });
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

        if (!id) return NextResponse.json({ message: "Promotion ID is required" }, { status: 400 });

        const result = await Promotion.findByIdAndUpdate(id, detail, { new: true });
        if (!result) return NextResponse.json({ message: "Promotion not found" }, { status: 404 });

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

        if (!id) return NextResponse.json({ message: "Promotion ID is required" }, { status: 400 });

        const result = await Promotion.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ message: "Promotion not found" }, { status: 404 });

        return NextResponse.json({ message: "Promotion deleted", data: result }, { status: 202 });
    } catch (error) {
        return NextResponse.json({ message: "Error in DELETE request", error }, { status: 500 });
    }
}
