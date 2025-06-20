
import SideBar from "@/components/sideBar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-700 flex flex-col md:grid md:grid-cols-12 text-white">
      <section className="p-4 md:p-6 w-full md:col-start-3 col-end-13">
        <div className="mt-4">{children}</div>
      </section>
        <SideBar />
    </main>
  );
}
