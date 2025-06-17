import Article from "@/components/article";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Products from "@/components/products";



export default function Home() {
  return (
    <>
      {/* Don't forget the meta data for SEO improvement */}
    <Header/>
    <main className="max-w-screen-xl mx-auto mt-4 p-6 pt-2 bg-gray-100 min-h-screen">
        <Products/>
    </main>
    <Article/>
    <Footer/>
    </>
  );
}
