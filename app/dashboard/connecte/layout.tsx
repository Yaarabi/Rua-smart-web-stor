


import { ReactNode } from "react";
import ReactQueryProvider from "@/app/utils/reactQuery";




export default function ProductProvider({ children }: { children: ReactNode }) {

    return (
        <ReactQueryProvider>
        <section>{children}</section>
        </ReactQueryProvider>
    );
}


