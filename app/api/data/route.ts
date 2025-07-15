import { NextResponse } from 'next/server';
// import { BetaAnalyticsDataClient } from '@google-analytics/data';
import Order from '@/models/order';
import Product from '@/models/products';
import Client from '@/models/users';
import { connectDB } from '@/lib/db';

// const credentials = process.env.GA_SERVICE_ACCOUNT
//     ? JSON.parse(Buffer.from(process.env.GA_SERVICE_ACCOUNT, 'base64').toString('utf-8'))
//     : undefined;

//     const analyticsClient = new BetaAnalyticsDataClient({ credentials });

export async function GET() {
    try {
        // if (!credentials) {
        // throw new Error('GA_SERVICE_ACCOUNT credentials not found or invalid.');
        // }

        await connectDB();

        // Google Analytics
        // const [activityResponse] = await analyticsClient.runReport({
        // property: process.env.PROPRTIES_GA4,
        // dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        // dimensions: [{ name: 'country' }],
        // metrics: [{ name: 'activeUsers' }, { name: 'userEngagementDuration' }],
        // });

        // Mongo Aggregates
        const orders = await Order.find();
        const paidOrders = orders.filter(order => order.isPaid);
        const today = new Date().toISOString().slice(0, 10);

        const [
        totalRevenueAgg,
        mostPopularCategoryAgg,
        avgRatingAgg,
        lowStockProductsAgg,
        totalCustomers,
        bestCustomer,
        ordersToday,
        ] = await Promise.all([
        Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]),
        Order.aggregate([
            { $unwind: '$items' },
            {
            $group: {
                _id: '$items.name',
                count: { $sum: '$items.quantity' }
            }
            },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]),
        Product.aggregate([
            { $match: { ratings: { $exists: true } } },
            { $group: { _id: null, avgRating: { $avg: '$ratings' } } }
        ]),
        Product.find({ stock: { $lt: 5 } }).select('_id title'),
        Client.countDocuments(),
        Client.findOne().sort({ totalSpent: -1 }).select('username email totalSpent'),
        Order.countDocuments({
            createdAt: {
            $gte: new Date(today + 'T00:00:00.000Z'),
            $lte: new Date(today + 'T23:59:59.999Z'),
            }
        }),
        ]);

        const totalRevenue = totalRevenueAgg[0]?.total || 0;
        const avgBasketValue = totalRevenue / (paidOrders.length || 1);
        const deliveryRate = orders.length
        ? orders.filter(order => order.isDelivered).length / orders.length
        : 0;

        return NextResponse.json({
        totalRevenue,
        avgBasketValue,
        paidOrdersCount: paidOrders.length,
        totalOrders: orders.length,
        mostPopularCategory: mostPopularCategoryAgg[0]?._id || 'N/A',
        averageRating: avgRatingAgg[0]?.avgRating || 0,
        lowStockProducts: lowStockProductsAgg.map(p => ({
            id: p._id,
            title: p.title
        })),
        deliveryRate: Number(deliveryRate.toFixed(2)),
        ordersToday,
        totalCustomers,
        bestCustomer,
        // audienceDistribution: activityResponse.rows || [],
        });
    }  catch (error) {
            console.error('Data Error:', error);
            return NextResponse.json({ message: 'Failed to fetch data', error }, { status: 500 });
        }
}
