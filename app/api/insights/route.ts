    import { connectDB } from "@/lib/db";
    import BusinessInsight from "@/models/insights";
    import { NextResponse } from "next/server";

    export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const {
        totalRevenue,
        avgBasketValue,
        paidOrdersCount,
        totalOrders,
        mostPopularCategory,
        lowStockProducts,
        averageRating,
        deliveryRate,
        ordersToday,
        totalCustomers,
        bestCustomer,        
        audienceDistribution,    
        } = body;

        const insight = await BusinessInsight.create({
        date: Date.now(),
        totalRevenue,
        avgBasketValue,
        paidOrdersCount,
        totalOrders,
        mostPopularCategory,
        lowStockProducts,
        averageRating,
        deliveryRate,
        ordersToday,
        totalCustomers,
        bestCustomer,
        audienceDistribution
        });

        return NextResponse.json(
        { message: "Insight stored successfully", insight },
        { status: 201 }
        );
    } catch (error) {
        console.error("Insight storage error:", error);
        return NextResponse.json(
        { error: "Failed to store insights" },
        { status: 500 }
        );
    }
    }

    export async function GET() {
    try {
        await connectDB();
        const insights = await BusinessInsight.find()
        .sort({ date: -1 })
        .limit(30);

        return NextResponse.json(insights, { status: 200 });
    } catch (error) {
        console.error("Insight fetch error:", error);
        return NextResponse.json(
        { error: "Failed to fetch insights" },
        { status: 500 }
        );
    }
    }
    export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (!id) {
        return NextResponse.json(
            { error: "Insight ID is required" },
            { status: 400 }
        );
        }

        const deletedInsight = await BusinessInsight.findByIdAndDelete(id);

        if (!deletedInsight) {
        return NextResponse.json(
            { error: "Insight not found" },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { message: "Insight deleted successfully" },
        { status: 200 }
        );
    } catch (error) {
        console.error("Insight deletion error:", error);
        return NextResponse.json(
        { error: "Failed to delete insight" },
        { status: 500 }
        );
    }
    }