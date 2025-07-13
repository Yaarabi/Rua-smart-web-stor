
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Goal from "@/models/goal";

    connectDB();

export async function GET() {
    try {
        const goals = await Goal.find().sort({ createdAt: -1 });
        return NextResponse.json(goals, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching goals." }, { status: 500 });
    }
    }

export async function POST(request: NextRequest) {
    try {
        const { title, insights } = await request.json();

        if (!title || !insights || !Array.isArray(insights)) {
        return NextResponse.json(
            { message: "Title and insights (array) are required." },
            { status: 400 }
        );
        }

        const newGoal = await Goal.create({ title, insights, createdAt: Date.now() });
        return NextResponse.json(newGoal, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error creating goal." }, { status: 500 });
    }
    }

export async function PUT(request: NextRequest) {
    try {
        const { id, title, insights } = await request.json();

        if (!id) {
        return NextResponse.json({ message: "Goal ID is required for update." }, { status: 400 });
        }

        const goal = await Goal.findById(id);

        if (!goal) {
        return NextResponse.json({ message: "Goal not found." }, { status: 404 });
        }

        if (title !== undefined) goal.title = title;
        if (insights !== undefined && Array.isArray(insights)) goal.insights = insights;

        await goal.save();

        return NextResponse.json(goal, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating goal." }, { status: 500 });
    }
    }

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
        return NextResponse.json({ message: "Goal ID is required for deletion." }, { status: 400 });
        }

        const deleted = await Goal.findByIdAndDelete(id);

        if (!deleted) {
        return NextResponse.json({ message: "Goal not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Goal deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting goal." }, { status: 500 });
    }
    }
