// app/api/analytics/sales-trends/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/order';

export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    // const region = searchParams.get('region');

    if (!dateFrom || !dateTo) {
        return new Response(JSON.stringify({ error: 'dateFrom and dateTo are required' }), {
        status: 400,
        });
    }

    const match = {
        isPaid: true,
        paidAt: {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo),
        },
    };

    // if (region) {
    //     match['shippingAddress.city'] = region;
    // }

    try {
        const salesTrends = await Order.aggregate([
        { $match: match },
        {
            $group: {
            _id: {
                year: { $year: '$paidAt' },
                month: { $month: '$paidAt' },
                day: { $dayOfMonth: '$paidAt' },
            },
            totalRevenue: { $sum: '$totalPrice' },
            orderCount: { $sum: 1 },
            avgBasketValue: { $avg: '$totalPrice' },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
        ]);

        return new Response(JSON.stringify(salesTrends), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch sales trends' }), {
        status: 500,
        });
    }
}
