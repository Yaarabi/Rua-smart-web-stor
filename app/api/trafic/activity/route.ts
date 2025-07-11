import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Parse credentials safely from environment variable
const credentials =
  process.env.GA_SERVICE_ACCOUNT && process.env.GA_SERVICE_ACCOUNT !== 'undefined'
    ? JSON.parse(process.env.GA_SERVICE_ACCOUNT)
    : undefined;

const analyticsClient = new BetaAnalyticsDataClient({
  credentials,
});

export async function GET() {
    try {
        if (!credentials) {
        throw new Error('GA_SERVICE_ACCOUNT credentials not found or invalid.');
        }

        const [activityResponse] = await analyticsClient.runReport({
        property: process.env.PROPRTIES_GA4,
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
