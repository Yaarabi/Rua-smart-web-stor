"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaAngleRight } from "react-icons/fa";

export default function Breadcrumb() {
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/search") return null;

    const segments = pathname
        .split("/")
        .filter((segment) => segment.length > 0);

    const createBreadcrumbs = () => {
        return segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = decodeURIComponent(segment).replace(/-/g, " ");

        return (
            <span key={index} className="flex items-center gap-1">
            <FaAngleRight className="text-gray-400" />
            <Link href={href} className="capitalize hover:underline text-gray-300">
                {label}
            </Link>
            </span>
        );
        });
    };

    return (
        <nav
        aria-label="Breadcrumb"
        className="flex items-center text-sm text-gray-600 space-x-2 bg-gray-800 px-4"
        >
        <Link href="/" className="flex items-center gap-1 hover:underline text-gray-300">
            <FaHome className="text-gray-400" />
            <span className="hidden sm:inline">Home</span>
        </Link>
        {createBreadcrumbs()}
        </nav>
    );
}
