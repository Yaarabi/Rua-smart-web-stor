
import SideBar from "@/components/sideBar";
import ReactQueryProvider from "../utils/reactQuery";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-700 flex flex-col md:grid md:grid-cols-12 text-white">
      <section className="p-4 w-full md:col-start-3 col-end-13">
        <ReactQueryProvider>
        <div className="mt-4">{children}</div>
        </ReactQueryProvider>
      </section>
        <SideBar />
    </main>
  );
}
