"use client";

import SideBar from "@/components/sideBar";
import ReactQueryProvider from "@/app/utils/reactQuery";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-gray-700 grid grid-cols-1 md:grid-cols-12 text-white">
            
            <aside className="w-full md:w-64 bg-gray-900 min-h-[10vh] md:col-span-2">
                <SideBar />
            </aside>

            <section className="w-full p-4 md:col-span-10">
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </section>
        </main>
    );
}
