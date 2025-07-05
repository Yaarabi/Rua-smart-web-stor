"use client";

import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/loading";
import Select from "@/components/dashboard/selecte";
import Loader from "@/components/loader";
import { useDeleteCustomer } from "@/app/hooks/forClient";
import { Customer } from "@/components/dashboard/customers";
import { useState } from "react";



const CustomerTable = () => {

    
        const [select, setSelect] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const customers: Customer[] = data?.clients.filter(
        (ele: Customer) => ele.role !== "admin"
    );

    const deleteCustomer = useDeleteCustomer();

    const [filter, setFilter] = useState<"all" | "new" | "regular" | "vip">("all");
    const [selectedCustomers, setSelectedCustomers] = useState<{ name: string; email: string }[]>([]);

    const getStatus = (customer: Customer) => {
        if (customer.totalOrders === 0) return "New";
        if (customer.totalSpent >= 1000) return "VIP";
        if (customer.totalOrders > 0 && customer.totalSpent < 1000) return "Regular";
        return "New";
    };

    const filteredCustomers = customers?.filter((customer: Customer) => {
        if (filter === "new") return customer.totalOrders === 0;
        if (filter === "regular") return customer.totalOrders > 0 && customer.totalSpent < 1000;
        if (filter === "vip") return customer.totalSpent >= 1000;
        return true;
    }) || [];

    const toggleSelect = (email: string, name: string) => {
        setSelectedCustomers((prev) => {
            const exists = prev.some((c) => c.email === email);
            if (exists) {
                return prev.filter((c) => c.email !== email);
            } else {
                return [...prev, { name, email }];
            }
        });
    };

    const isSelected = (email: string) => selectedCustomers.some((c) => c.email === email);

    const selectAll = () => {
        if (selectedCustomers.length === filteredCustomers.length) {
            setSelectedCustomers([]);
        } else {
            const all = filteredCustomers.map((c) => ({ name: c.username, email: c.email }));
            setSelectedCustomers(all);
        }
    };

    if (isLoading) return <Skeleton />;
    if (isError || !data?.clients)
        return <p className="text-red-500 text-center mt-6">Failed to load customers.</p>;
    if (deleteCustomer.isPending) return <Loader />;

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as "all" | "new" | "regular" | "vip")}
                    className="border border-gray-300 p-2 rounded text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Filter"
                >
                    <option value="all">All</option>
                    <option value="new">New</option>
                    <option value="regular">Regular</option>
                    <option value="vip">VIP</option>
                </select>

                {selectedCustomers.length > 0 && (
                    <div className="mt-4">
                        <button
                            onClick={() => setSelect(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Send Email
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
                <table className="w-full table-auto text-sm text-gray-200 bg-gray-800">
                    <thead className="bg-gray-700 text-xs uppercase text-gray-300">
                        <tr>
                            <th>
                                <button
                                    onClick={selectAll}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    {selectedCustomers.length === filteredCustomers.length
                                        ? "Unselect All"
                                        : "Select All"}
                                </button>
                            </th>
                            <th>#</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer: Customer, i: number) => (
                            <tr
                                key={customer._id}
                                className="hover:bg-gray-700 transition duration-200 border-t border-gray-600"
                            >
                                <td className="text-center">
                                    <span
                                        onClick={() => toggleSelect(customer.email, customer.username)}
                                        className={`cursor-pointer w-4 h-4 inline-block rounded-full border-2 ${isSelected(customer.email)
                                            ? "bg-blue-500 border-blue-500"
                                            : "bg-transparent border-gray-400"
                                            }`}
                                    ></span>
                                </td>
                                <td className="text-center">{i + 1}</td>
                                <td className="p-4 text-center">{customer.username}</td>
                                <td className="p-4 text-center">{customer.email}</td>
                                <td className="p-4 text-center">{getStatus(customer)}</td>
                                <td className="p-4 text-center">
                                    {new Date(customer.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {  select && <Select customers={selectedCustomers} action={()=> setSelect(false)}/>}
        </div>
    );
};

export default CustomerTable;
