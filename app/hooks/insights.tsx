    import { useEffect, useState } from "react";
import { Order } from "./orderHooks";
import { Product } from "../dashboard/page";


    

export interface User {
        _id: string;
        username: string;
        email: string;
        phone: string;
        address: string;
        role: string;
        createdAt: Date;
        audience: string; 
}

    interface BestCustomer {
    userId: string;
    totalSpent: number;
    orderCount: number;
    audience?: string;
    }

    export function useStoreInsights(
    orders: Order[],
    products: Product[],
    users: User[]
    ) {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        avgBasketValue: 0,
        paidOrdersCount: 0,
        totalOrders: orders.length,
        mostPopularCategory: "",
        averageRating: 0,
        lowStockProducts: [] as Product[],
        deliveryRate: 0,
        ordersToday: 0,
        totalCustomers: users.length,
        bestCustomer: null as BestCustomer | null,
        audienceDistribution: {} as Record<string, number>, 
    });

    useEffect(() => {
        if (!orders.length || !products.length || !users.length) return;

        const paidOrders = orders.filter((o) => o.isPaid);
        const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);
        const avgBasketValue = +(totalRevenue / paidOrders.length || 0).toFixed(2);
        const deliveredOrders = orders.filter((o) => o.isDelivered);
        const deliveryRate = +((deliveredOrders.length / orders.length) * 100).toFixed(2);
        const today = new Date().toDateString();
        const ordersToday = paidOrders.filter(
        (o) => new Date(o.createdAt).toDateString() === today
        ).length;

        
        const customerMap = paidOrders.reduce((acc, o) => {
        if (!acc[o.userId]) {
            acc[o.userId] = { userId: o.userId, totalSpent: 0, orderCount: 0 };
        }
        acc[o.userId].totalSpent += o.totalPrice;
        acc[o.userId].orderCount += 1;
        return acc;
        }, {} as Record<string, BestCustomer>);

        const totalCustomers = users.length;
        const bestCustomer = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent)[0] || null;

        
        if (bestCustomer) {
        const matchedUser = users.find((u) => u._id === bestCustomer?.userId);
        if (matchedUser) bestCustomer.audience = matchedUser.audience;
        }

        const audienceStats = users.reduce((acc, user) => {
        const key = user.audience || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
        }, {} as Record<string, number>);

        const categoryStats = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
        }, {} as Record<string, number>);

        const mostPopularCategory = Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
        const lowStockProducts = products.filter((p) => Number(p.stock) < 5);
        const averageRating = +(products.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / products.length).toFixed(2);

        setStats({
        totalRevenue,
        avgBasketValue,
        paidOrdersCount: paidOrders.length,
        totalOrders: orders.length,
        mostPopularCategory,
        averageRating,
        lowStockProducts,
        deliveryRate,
        ordersToday,
        totalCustomers,
        bestCustomer,
        audienceDistribution: audienceStats,
        });
    }, [orders, products, users]);

    return stats;
    }
