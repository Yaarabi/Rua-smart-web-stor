
"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Ad {
    _id: string;
    title: string;
    status: "active" | "paused" | "ended";
    startDate: string;
    endDate: string;
    createdAt: string;
}


const OfferBanner = () => {
    const { data: session } = useSession();
    const [promos, setPromos] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchPromos = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promo`);

            
            const fetchedTitles: string[] = (res.data.promotions || []).map((promo: Ad ) =>
            promo.title.replace(/^"|"$/g, '').trim()
            );

            let allPromos = [...fetchedTitles];

            if (session) {
            allPromos = allPromos.filter(
                (title) => !title.toLowerCase().includes('sign up')
            );
            }

            setPromos(allPromos);
        } catch (err) {
            console.error('Failed to fetch promos:', err);
        }
        };

        fetchPromos();
    }, [session]);

    useEffect(() => {
        if (promos.length === 0) return;
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % promos.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [promos]);

    if (promos.length === 0) return null;

    return (
        <div className="bg-gray-800 text-white text-center py-5 text-sm overflow-hidden relative h-8">
        <AnimatePresence mode="wait">
            <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
            >
            {promos[index]}
            </motion.div>
        </AnimatePresence>
        </div>
    );
    };

export default OfferBanner;
