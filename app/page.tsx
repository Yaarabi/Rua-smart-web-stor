import Article from "@/components/article";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Products from "@/components/products";
import Hero from "@/components/topProducts";

export default function Home() {
    return (
        <>
            <Header />


            <main className="max-w-screen-xl mx-auto mt-6 px-4 md:px-8 bg-gray-900 min-h-screen">
                <Hero />
                <Products />
            </main>

            <Article />

            <Footer />
        </>
    );
}
