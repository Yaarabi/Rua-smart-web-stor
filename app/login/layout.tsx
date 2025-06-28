



import { ReactNode } from "react";




export default function ProductProvider({ children }: { children: ReactNode }) {

    return (
        
        <main className="min-h-screen">{children}</main>
        
    );
}


