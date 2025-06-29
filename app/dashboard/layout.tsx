

"use client"
import Dashboard from "@/components/dashboard/home";
import Loader from "@/components/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }

        if (status === "authenticated" && session && session.user.role !== "admin") {
            router.push("/");
        }
    }, [status, session, router]);


    if (status === "loading") {
        return <Loader/>; 
    }

    if (session && session.user.role === "admin") {
            return <Dashboard>
                        { children }
                    </Dashboard>
        }

    return null
        
}
