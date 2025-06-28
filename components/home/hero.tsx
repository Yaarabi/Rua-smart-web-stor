"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-[80vh] bg-gray-800 flex items-center justify-center text-white overflow-hidden">
            <Image
                src="/phone.jpg"
                alt="Rua Web Store Hero"
                layout="fill"
                objectFit="cover"
                className="opacity-30"
                priority
            />

            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

            <motion.div
                className="relative z-10 text-center max-w-2xl px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                >
                    Welcome to Rua Web Store
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Discover premium tech products, smart shopping, and future-ready deals curated just for you.
                </motion.p>

                <motion.a
                    href="#categories"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Shop Now
                </motion.a>
            </motion.div>
        </section>
    );
}
