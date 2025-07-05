import Blogs from "@/components/blogs/blogs"
import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
export const dynamic = "force-dynamic";




const Page = () => {
    return (
        <>
        <Header/>
        <Blogs/>
        <Footer/>
        </>
    )
}

export default Page
