
import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';

const analyticsClient = new BetaAnalyticsDataClient({
    credentials: JSON.parse(fs.readFileSync(path.resolve('./service-account.json'), 'utf8')),
});

export async function GET() {
    try {
        const [deviceResponse] = await analyticsClient.runReport({
        property: process.env.PROPRTIES_GA4,
        dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
        });

        return NextResponse.json({ userDeviceData: deviceResponse.rows });
    } catch (error) {
        console.error('Device Data Error:', error);
        return NextResponse.json({ message: 'Failed to fetch device data', error }, { status: 500 });
    }
}