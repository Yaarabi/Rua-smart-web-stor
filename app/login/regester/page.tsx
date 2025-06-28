"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/app/api/action/route";
import { motion } from "framer-motion";

export default function Register() {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const r = await register({
            email: (formData.get("email") as string) || "",
            password: (formData.get("password") as string) || "",
            name: (formData.get("name") as string) || "",
        });

        ref.current?.reset();

        if (r?.error) {
            setError(r.error);
            return;
        } else {
            return router.push("/login");
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
            <motion.form
                ref={ref}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                action={handleSubmit}
                className="p-8 w-full max-w-[400px] flex flex-col gap-4 bg-white border border-gray-300 rounded-2xl shadow-xl"
            >
                <h1 className="text-3xl font-extrabold text-center mb-2">Create Account</h1>

                {error && (
                    <div className="w-full p-2 text-red-700 bg-red-100 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <label className="w-full text-sm font-medium">Full Name</label>
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <label className="w-full text-sm font-medium">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <label className="w-full text-sm font-medium">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
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
