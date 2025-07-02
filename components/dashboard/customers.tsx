
"use client";

import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../loading";
import Loader from "../loader";
import { useDeleteCustomer } from "@/app/hooks/forClient";

export interface Customer {
    _id: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    role:string;
    createdAt: Date;
}

const CustomerTable = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/users");
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const customers = data?.clients.filter((ele:Customer)=> ele.role !== "admin")

    const deleteCustomer = useDeleteCustomer();

    const remove = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (confirmed) {
            deleteCustomer.mutate(id);
        }
    };

    if (isLoading) return <Skeleton />;
    if (isError || !data?.clients)
        return <p className="text-red-500 text-center mt-6">Failed to load customers.</p>;
    if (deleteCustomer.isPending) return <Loader />;

    return (
        <div className="overflow-x-auto mt-10 rounded-xl shadow-lg border border-gray-300">
            <table className="w-full table-auto text-sm text-gray-200 bg-gray-800">
                <thead className="bg-gray-700 text-xs uppercase text-gray-300">
                    <tr>
                        <th className="p-4">#</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Address</th>
                        <th className="p-4">Date Joined</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer: Customer, i: number) => (
                        <tr
                            key={customer._id}
                            className="hover:bg-gray-700 transition duration-200 border-t border-gray-600"
                        >
                            <td className="p-4 text-center">{i + 1}</td>
                            <td className="p-4 text-center">{customer.username}</td>
                            <td className="p-4 text-center">{customer.email}</td>
                            <td className="p-4 text-center">{customer.phone !== null ? customer.phone : "---"}</td>
                            <td className="p-4 text-center">{customer.address !== null ? customer.address : "Morocco"}</td>
                            <td className="p-4 text-center">
                                {new Date(customer.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                            <td className="p-4 flex justify-center items-center gap-4">
                                <button
                                    onClick={() => remove(customer._id)}
                                    className="text-red-400 hover:text-red-600 transition"
                                    title="Delete Customer"
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

export default CustomerTable;
