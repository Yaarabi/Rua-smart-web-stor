import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';

const analyticsClient = new BetaAnalyticsDataClient({
    credentials: JSON.parse(
        fs.readFileSync(path.resolve('./service-account.json'), 'utf8')
    ),
});

export async function GET() {
    try {
        // ✅ Query: Just activity-related users
        const [activityResponse] = await analyticsClient.runReport({
        property: process.env.PROPRTIES_GA4, 
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [
            { name: 'country' },
            { name: 'date' }, // Show when activity happened
        ],
        metrics: [
            { name: 'activeUsers' },
            { name: 'userEngagementDuration' },
        ],
        limit: 50,
        });

        return NextResponse.json({
        activityUsersData: activityResponse.rows,
        });
    } catch (error) {
        console.error('GA4 API Error:', error);
        return NextResponse.json(
        { message: 'Error fetching GA4 data', error },
        { status: 500 }
        );
    }
}
