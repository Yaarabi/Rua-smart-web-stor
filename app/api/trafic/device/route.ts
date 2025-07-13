
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