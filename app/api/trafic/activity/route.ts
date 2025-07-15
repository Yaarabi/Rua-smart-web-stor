
import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const credentials =
    process.env.GA_SERVICE_ACCOUNT
        ? JSON.parse(Buffer.from(process.env.GA_SERVICE_ACCOUNT, 'base64').toString('utf-8'))
        : undefined;

const analyticsClient = new BetaAnalyticsDataClient({
    credentials,
});

export async function GET() {
    // 
    try {
        if (!credentials) {
        throw new Error('GA_SERVICE_ACCOUNT credentials not found or invalid.');
        }

        const [activityResponse] = await analyticsClient.runReport({
        property: process.env.PROPERTIES_GA4,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'country' }, { name: 'date' }],
        metrics: [
            { name: 'activeUsers' },
            { name: 'userEngagementDuration' },
        ],
        limit: 100,
        });

        return NextResponse.json({
        activityUsersData: activityResponse.rows,
        });
    }  catch (error) {
        console.error('Cart Data Error:', error);
        return NextResponse.json({ message: 'Failed to fetch cart data', error }, { status: 500 });
    }
}
