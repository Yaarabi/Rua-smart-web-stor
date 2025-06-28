"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Posting from "../btnPatient";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function ToLogin({ onClose }: { onClose: () => void }) {
    const { status } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
            onClose();
        });
    };

    return (
        <div className="absolute right-0 top-12 bg-gray-900 text-white shadow-xl rounded border   min-w-[160px] p-4 z-50 flex flex-col gap-2 transition-all">
            {status === "loading" && (
                <Posting/>
            )}

            {status === "authenticated" && (
                <button
                    onClick={handleSignOut}
                    className="w-full text-center text-white hover:text-gray-400 py-2 rounded-lg transition-all flex items-center justify-evenly"
                >
                    <FaSignOutAlt/>Sign Out 
                </button>
            )}

            {status === "unauthenticated" && (
                <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full text-center text-white hover:text-gray-400 py-2 rounded-lg transition-all flex items-center justify-evenly"
                >
                    <FaSignInAlt/> Sign In 
                </Link>
            )}
        </div>
    );
}
