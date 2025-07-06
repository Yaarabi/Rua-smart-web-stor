import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/order';

export async function GET() {
    await connectDB();

    try {
        const orders = await Order.find({ isPaid: true })
            .sort({ paidAt: -1 })
            .limit(20)
            .select('name totalPrice paidAt isDelivered shippingAddress')
            .lean();

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch recent orders' }, { status: 500 });
    }
}
