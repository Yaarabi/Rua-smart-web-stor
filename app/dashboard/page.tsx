import DashboardHead from "@/components/dashboardHead";
import SideBar from "@/components/sideBar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-700 flex flex-col md:grid md:grid-cols-12">
      <div className="bg-gray-900 text-white w-full md:col-span-2">
        <SideBar />
      </div>
      <section className="p-4 md:p-6 w-full md:col-span-10">
        <DashboardHead />
        <div className="mt-4">{children}</div>
      </section>
    </main>
  );
}
