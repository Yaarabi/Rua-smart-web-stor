
'use client';
import ExistingAdsList from '@/components/dashboard/marketing/adList';
import AdPerformanceCard from '@/components/dashboard/marketing/adCard';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function MarketingPage() {
    const ads = [
        { id: 'summer-sale', title: 'Summer Sale', scheduledAt: '2025-07-03T20:41:00Z' },
        { id: 'flash-deal', title: 'Flash Deal Friday', scheduledAt: '2025-07-05T10:00:00Z' },
    ];

    const performance = [
        { adId: 'summer-sale', views: 1200, clicks: 180, conversions: 30 },
        { adId: 'flash-deal', views: 800, clicks: 90, conversions: 15 },
    ];


    return (
        <>
        <Link href="/dashboard/goals/marketing" className="flex items-center gap-2 text-gray-200 mb-4">
            <FaArrowLeft />
            Back
        </Link>
        <ExistingAdsList ads={ads} />
        <AdPerformanceCard performance={performance} />
        </>
    );
}
