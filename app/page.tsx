import Article from "@/components/article";
import Footer from "@/components/footer";
import Header from "@/components/header";



export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Don't forget the meta data for SEO improvement */}
    <Header/>
    <main className="max-w-screen-xl mx-auto mt-4 p-6 pt-2 bg-gray-100 min-h-screen">
        { children }
    </main>
    <Article/>
    <Footer/>
    </>
  );
}
