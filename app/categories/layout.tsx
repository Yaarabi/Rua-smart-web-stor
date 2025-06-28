


import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { ReactNode } from "react";
import ReactQueryProvider from "../utils/reactQuery";




export default function ProductProvider({ children }: { children: ReactNode }) {

    return (
        <>
        <Header/>
        <ReactQueryProvider>
        <main className="min-h-screen">{children}</main>
        </ReactQueryProvider>
        <Footer/>
        </>
    );
}


