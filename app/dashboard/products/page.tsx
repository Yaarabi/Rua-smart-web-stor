import ProductChart from "@/components/productsChart";
import Table from "@/components/table";

const Page = () => {
    return (
        <>
        <header className="h-[30vh] w-full flex items-end justify-start space-x-4">
            <div className="w-3/5">
            <ProductChart />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            New product
            </button>
        </header>
        <Table/>
        </>
);
};

export default Page;
