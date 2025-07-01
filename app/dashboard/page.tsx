import DashboardHead from "@/components/dashboardHead";
import RevenueChart from "@/components/charts/totalRevenue";
import TotalSalesCard from "@/components/charts/salles";
import RecentActivity from "@/components/charts/actvityTable";
import TrafficChannelChart from "@/components/charts/tarafic";

export default function DashboardHome() {
    return (
        <>
        <DashboardHead />

        <section className="flex gap-4 mt-8">
            <div className="flex flex-col justify-evenly">
                <TotalSalesCard />
                <TotalSalesCard />
            </div>
            <RevenueChart />
        </section>

        <section className="flex gap-4 mt-8">
            <RecentActivity />
            <TrafficChannelChart/>
        </section>
        </>
    );
}
