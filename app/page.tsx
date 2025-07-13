
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import About from "@/components/home/about";
import Benefits from "@/components/home/benifits";
import Newsletter from "@/components/home/trust";
import Footer from "@/components/home/footer";
import Collection from "@/components/home/collection";
// import Carousel from "@/components/home/carousel";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 text-gray-900 min-h-screen">
        <Hero />
        <Categories />
        {/* <Carousel/> */}
        <Collection />
        <About />
        <Benefits />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

