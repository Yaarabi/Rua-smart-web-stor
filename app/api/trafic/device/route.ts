

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
    try {
        const [deviceResponse] = await analyticsClient.runReport({
        property: process.env.PROPERTIES_GA4,
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