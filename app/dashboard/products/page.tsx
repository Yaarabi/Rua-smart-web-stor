    
import ProductChart from "@/components/productsChart";
import Table from "@/components/table";

const Page = () => {
    return (
        <main className="p-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-start mb-8 md:space-x-32 space-y-4 md:space-y-0">
            <div className="w-full md:w-3/5 bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-white text-xl font-semibold mb-4">Product Distribution</h2>
            <ProductChart />
            </div>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            New Product
            </button>
        </header>

        <section>
            <Table />
        </section>
        </main>
    );
    };

export default Page;
