
"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

export default function ProtectedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(()=>{
        console.log(session)
    },[session])

    useEffect(() => {
        if (status === "unauthenticated") {
        router.push("/login"); 
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>; 
    }

    if (session) {
        return (
        <div>
            <h1>Welcome, </h1>
            <p>This is a protected page.</p>
        </div>
        );
    }

    return null; 
}
