import DashboardHead from "@/components/dashboardHead";
import RevenueChart from "@/components/charts/totalRevenue";
import TotalCard from "@/components/charts/salles";
import RecentActivity from "@/components/charts/actvityTable";
import TrafficChannelChart from "@/components/charts/tarafic";
import CategoryStockChart from "@/components/charts/productsChart";
import { Order } from "../hooks/orderHooks";
import StorData from "@/components/dashboard/storData";
import { User } from "../hooks/insights";
export const dynamic = "force-dynamic";


export interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    rating: number;
    createdAt: Date;
    quantity: number;
}

const Home = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`);
    const { products }: { products: Product[] } = await response.json();

    const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/orders`);
    const { orders }: { orders: Order[] } = await orderResponse.json();

    const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users`);
    const { clients }: { clients: User[] } = await usersResponse.json();



    return (
        <>
            <DashboardHead />
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 w-[90%] mx-auto">
                <div className="flex flex-col justify-evenly space-y-4 col-span-1 bg-gray-900 rounded-lg p-4 shadow-md">
                    <TotalCard data={orders} title="Sales" />
                    <TotalCard data={orders} title="Orders"/>
                </div>
                <div className="col-span-1 md:col-span-3 bg-gray-900 rounded-lg p-4 shadow-md">
                    <h2 className="text-white text-lg font-semibold mb-4">Revenue Overview</h2>
                    <RevenueChart data={orders} />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-[90%] mx-auto">
                <div className="col-span-2 bg-gray-900 rounded-lg p-4 shadow-md">
                    <h2 className="text-white text-lg font-semibold mb-4">Product Category & Stock</h2>
                    <CategoryStockChart products={products} />
                </div>
                <div className="col-span-1 items-center bg-gray-900 rounded-lg p-4 shadow-md">
                    <h2 className="text-white text-lg font-semibold mb-4">Traffic Sources</h2>
                    <TrafficChannelChart />
                </div>
            </section>

            <section className="mt-8 bg-gray-900 rounded-lg p-4 shadow-md w-[90%] mx-auto">
                <h2 className="text-white text-lg font-semibold mb-4">Recent Activity</h2>
                <RecentActivity />
            </section>
            {orders && products && clients && (
                <StorData users={clients} products={products} orders={orders} />
                )}
        </>
    );
};

export default Home;
