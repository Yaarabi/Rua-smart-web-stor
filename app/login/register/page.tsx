"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Register() {
    const [error, setError] = useState<string | null>(null);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    const formData = new FormData(ref.current!);
    const username = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    try {
        const res = await fetch("/api/action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        ref.current?.reset();

        if (!res.ok || data.error) {
            setError(data.error || "Registration failed. Try again.");
        } else {
            router.push("/login");
        }
        } catch (err) {
        console.error("Registration fetch error:", err);
        setError("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
        <motion.form
            ref={ref}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 w-full max-w-[400px] flex flex-col gap-4 bg-white border border-gray-300 rounded-2xl shadow-xl"
        >
            <h1 className="text-3xl font-extrabold text-center mb-2">Create Account</h1>

            {error && (
            <div className="w-full p-2 text-red-700 bg-red-100 rounded text-sm text-center">
                {error}
            </div>
            )}

            <label className="text-sm font-medium">Full Name</label>
            <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            />

            <label className="text-sm font-medium">Email</label>
            <input
            type="email"
            name="email"
            placeholder="Email"
            className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            />

            <label className="text-sm font-medium">Password</label>
            <input
            type="password"
            name="password"
            placeholder="Password"
            className="h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            />

            <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition"
            >
            Sign Up
            </button>

            <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-black text-center mt-2 transition"
            >
            Already have an account?
            </Link>
        </motion.form>
        </section>
    );
}
