import DashboardHead from "@/components/dashboardHead";
import SideBar from "@/components/sideBar";

export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="grid grid-cols-12 min-h-screen bg-gray-700">
      {/* Sidebar - spans 3 columns */}
      <div className="col-span-2 bg-gray-900 text-white">
        <SideBar />
      </div>

      {/* Main Content - spans 9 columns */}
      <section className="col-span-10 p-6">
        <DashboardHead />
        <div className="mt-4">{children}</div>
      </section>
    </main>
  );
}
