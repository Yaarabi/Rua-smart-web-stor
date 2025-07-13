
import fs from 'fs';
import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const credentials =
    process.env.GA_SERVICE_ACCOUNT && process.env.GA_SERVICE_ACCOUNT !== 'undefined'
        ? JSON.parse(fs.readFileSync(process.env.GA_SERVICE_ACCOUNT, "utf-8"))
        : undefined;

const analyticsClient = new BetaAnalyticsDataClient({
    credentials,
});


export async function GET() {
    try {
    const [cartResponse] = await analyticsClient.runReport({
        property: process.env.PROPRTIES_GA4,
        dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
        dimensions: [],
        metrics: [{ name: 'addToCarts' }, { name: 'purchases' }],
        });

        const cartMetrics = cartResponse.rows?.[0]?.metricValues || [];
        const addToCarts = Number(cartMetrics?.[0]?.value || 0);
        const purchases = Number(cartMetrics?.[1]?.value || 0);
        const abandonedCarts = addToCarts - purchases;
        const abandonmentRate = addToCarts > 0 ? (abandonedCarts / addToCarts) * 100 : 0;

        return NextResponse.json({
        abandonedCartData: {
            addToCarts,
            purchases,
            abandonedCarts,
            abandonmentRate: abandonmentRate.toFixed(2),
        },
        });
    } catch (error) {
        console.error('Cart Data Error:', error);
        return NextResponse.json({ message: 'Failed to fetch cart data', error }, { status: 500 });
    }
}