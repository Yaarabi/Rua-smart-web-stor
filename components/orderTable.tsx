
"use client";

import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "./loading";
// import Loader from "./loader";

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    userId: string;
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
    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/orders");
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });



    // const deleteOrder = useDeleteProduct();

    // const remove = async (id: string) => {
    //     const confirmed = window.confirm("Are you sure you want to delete this order?");
    //     if (confirmed) {
    //         deleteOrder.mutate(id);
    //     }
    // };

    if (isLoading) return <Skeleton />;
    if (isError || !data) return <p className="text-red-500 text-center mt-6">Failed to load orders.</p>;
    // if (deleteOrder.isPending) return <Loader />;

    return (
        <div className="overflow-x-auto mt-10 rounded-xl shadow-lg border border-gray-300">
            <table className="w-full table-auto text-sm text-gray-200 bg-gray-800">
                <thead className="bg-gray-700 text-xs uppercase text-gray-300">
                    <tr>
                        <th className="p-4">#</th>
                        <th className="p-4">User</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Total Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.orders?.map((order:Order, i:number) => (
                        <tr
                            key={order._id}
                            className="hover:bg-gray-700 transition duration-200 border-t border-gray-600"
                        >
                            <td className="p-4 text-center">{i + 1}</td>
                            <td className="p-4 text-center">{order.userId || "Guest"}</td>
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
                                    <span className={`px-2 py-1 rounded text-xs ${order.isDelivered ? "bg-green-500" : "bg-yellow-500"}`}>
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
                                <button
                                    // onClick={() => remove(order._id)}
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
    );
};

export default Orders;
