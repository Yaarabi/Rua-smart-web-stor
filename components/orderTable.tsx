"use client";

import { FaTrashCan } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "./loading";
import { useDeleteOrder } from "@/app/hooks/orderHooks";
import Loader from "./loader";
import { useState } from "react";

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    userId: string;
    name: string;
    email: string;
    items: OrderItem[];
    shippingAddress: {
        city: string;
        country: string;
    };
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt: Date;
}

const Orders = () => {
    const [filter, setFilter] = useState<"all" | "paid" | "unpaid" | "delivered" | "pending">("all");

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const deleteOrder = useDeleteOrder();

    const remove = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if (confirmed) {
            deleteOrder.mutate(id, {
                onSuccess: () => refetch(),
            });
        }
    };

    const toggleDeliveryStatus = async (id: string, currentStatus: boolean) => {
        const response = await fetch(`/api/orders?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDelivered: !currentStatus }),
        });

        if (response.ok) {
            refetch();
        } else {
            alert("Failed to update delivery status");
        }
    };

    if (isLoading) return <Skeleton />;
    if (isError || !data) return <p className="text-red-500 text-center mt-6">Failed to load orders.</p>;
    if (deleteOrder.isPending) return <Loader />;

    const sortedOrders = [...data.orders].sort(
        (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const filteredOrders = sortedOrders.filter((order: Order) => {
        switch (filter) {
            case "paid": return order.isPaid;
            case "unpaid": return !order.isPaid;
            case "delivered": return order.isDelivered;
            case "pending": return !order.isDelivered;
            default: return true;
        }
    });

    return (
        <div className="mt-10">
            <div className="flex justify-end mb-4 space-x-2 text-sm">
                {["all", "paid", "unpaid", "delivered", "pending"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status as "all" | "paid" | "unpaid" | "delivered" | "pending")}
                        className={`px-3 py-1 rounded ${
                            filter === status ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
                <table className="w-full table-auto text-sm text-gray-200 bg-gray-800">
                    <thead className="bg-gray-700 text-xs uppercase text-gray-300">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">Id</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order: Order, i: number) => (
                            <tr
                                key={order._id}
                                className="hover:bg-gray-700 transition duration-200 border-t border-gray-600"
                            >
                                <td className="p-4 text-center">{i + 1}</td>
                                <td className="p-4 text-center">{order._id}</td>
                                <td className="p-4 text-center">{order.name}</td>
                                <td className="p-4 text-left">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <span className="font-semibold">{item.name}</span> x {item.quantity}{" "}
                                            <span className="text-gray-400">({item.price} MAD)</span>
                                        </div>
                                    ))}
                                </td>
                                <td className="p-4 text-center font-semibold">{order.totalPrice} MAD</td>
                                <td className="p-4 text-center">
                                    <div className="flex flex-col items-center space-y-1">
                                        <span className={`px-2 py-1 rounded text-xs ${order.isPaid ? "bg-green-500" : "bg-red-500"}`}>
                                            {order.isPaid ? "Paid" : "Unpaid"}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs cursor-pointer ${
                                                order.isDelivered ? "bg-green-500" : "bg-yellow-500"
                                            }`}
                                            title="Click to update"
                                            onClick={() => toggleDeliveryStatus(order._id, order.isDelivered)}
                                        >
                                            {order.isDelivered ? "Delivered" : "Pending"}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                                <td className="p-4 flex justify-center items-center gap-4">
                                    {/* <button className="text-green-400 hover:text-green-600 transition" title="Edit Order">
                                        <FaEdit size={18} />
                                    </button> */}
                                    <button
                                        onClick={() => remove(order._id)}
                                        className="text-red-400 hover:text-red-600 transition"
                                        title="Delete Order"
                                    >
                                        <FaTrashCan size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
