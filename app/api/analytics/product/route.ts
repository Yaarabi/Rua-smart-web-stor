import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/order';
import { PipelineStage } from 'mongoose';

export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const category = searchParams.get('category');

    if (!dateFrom || !dateTo) {
        return NextResponse.json({ error: 'dateFrom and dateTo required' }, { status: 400 });
    }

    const match: { isPaid: boolean; paidAt: { $gte: Date; $lte: Date } } = {
        isPaid: true,
        paidAt: {
            $gte: new Date(dateFrom),
            $lte: new Date(dateTo),
        },
    };

    try {
        const pipeline: PipelineStage[] = [
            { $match: match },
            { $unwind: '$items' },
        ];

        if (category) {
            pipeline.push({ $match: { 'items.category': category } });
        }

        pipeline.push(
            {
                $group: {
                    _id: '$items.productId',
                    name: { $first: '$items.name' },
                    totalQuantitySold: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
                },
            },
            { $sort: { totalQuantitySold: -1 } },
            { $limit: 10 }
        );

        const productPerformance = await Order.aggregate(pipeline);

        return NextResponse.json(productPerformance, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch product performance' }, { status: 500 });
    }
}
