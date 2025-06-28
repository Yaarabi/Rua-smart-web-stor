
"use client";

import { useState } from "react";
import SideBar from "@/components/sideBar";
import ReactQueryProvider from "@/app/utils/reactQuery";
import { FaBars } from "react-icons/fa";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <main className="min-h-screen bg-gray-700 flex flex-col md:grid md:grid-cols-12 text-white relative">

        <button
            onClick={() => setShowSidebar(true)}
            className="md:hidden p-4 text-white"
        >
            <FaBars className="text-2xl" />
        </button>

        <aside
            className={`fixed top-0 left-0 w-64 h-full bg-gray-900 transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:col-span-2 z-50`}
        >

            <div className="flex justify-end md:hidden p-4">
            <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-400 hover:text-white text-xl"
            >
                ✕
            </button>
            </div>

            <SideBar />
        </aside>

        <section className="p-4 w-full md:col-start-3 col-end-13">
            <ReactQueryProvider>
            <div className="mt-4">{children}</div>
            </ReactQueryProvider>
        </section>
        </main>
    );
}
