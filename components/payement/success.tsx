
"use client"
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Thanks from "@/components/payement/thanks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Success = () => {
    const router = useRouter();

    const [purchase, setPurchase] = useState(null);
    const [customer, setCustomer] = useState<string | null>(null);

    useEffect(() => {
        const order = localStorage.getItem("order");
        const buyer = localStorage.getItem("customer");

        if (!order || !buyer) {
        router.push("/");
        } else {
        setPurchase(JSON.parse(order));
        setCustomer(buyer);
        }
    }, [router]);

    if (!purchase || !customer) return null;

    return (
        <>
        <Header />
        <Thanks customer={customer} purchase={purchase} />
        <Footer />
        </>
    );
};

export default Success;
