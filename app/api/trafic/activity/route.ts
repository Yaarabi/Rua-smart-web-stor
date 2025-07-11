
import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';

const analyticsClient = new BetaAnalyticsDataClient({
    credentials: JSON.parse(fs.readFileSync(path.resolve('./service-account.json'), 'utf8')),
});

export async function GET() {
    try {
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

        return NextResponse.json({ activityUsersData: activityResponse.rows });
    } catch (error) {
        console.error('Activity Data Error:', error);
        return NextResponse.json({ message: 'Failed to fetch activity data', error }, { status: 500 });
    }
}