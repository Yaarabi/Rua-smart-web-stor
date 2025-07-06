import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/order';

export async function GET(req: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    if (!dateFrom || !dateTo) {
        return new Response(JSON.stringify({ error: 'dateFrom and dateTo required' }), {
        status: 400,
        });
    }

    const match= {
        isPaid: true,
        paidAt: {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo),
        },
    };

    try {
        const revenueData = await Order.aggregate([
        { $match: match },
        {
            $group: {
            _id: {
                year: { $year: '$paidAt' },
                month: { $month: '$paidAt' },
                day: { $dayOfMonth: '$paidAt' },
            },
            totalRevenue: { $sum: '$totalPrice' },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
        ]);

        return new Response(JSON.stringify(revenueData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to fetch revenue data' }), {
        status: 500,
        });
    }
}
