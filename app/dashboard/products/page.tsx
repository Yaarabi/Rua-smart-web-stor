
import Table from "@/components/table";
import Link from "next/link";

const Page = () => {
    return (
        <main className="p-6 min-h-screen bg-gray-900 text-white">
            <header className="flex flex-col md:mt-8 md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
                <div className="w-full md:w-3/5 bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Product Distribution</h2>
                    <p className="text-gray-400 text-sm">View and manage the distribution of your products effectively.</p>
                </div>
                <Link
                    href="/dashboard/products/create"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 transition-transform"
                >
                    + New Product
                </Link>
            </header>

            <section>
                <Table />
            </section>
        </main>
    );
};

export default Page;
