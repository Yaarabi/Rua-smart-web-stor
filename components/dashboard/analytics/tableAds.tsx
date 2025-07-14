"use client";

import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/loading";
import { useState } from "react";
import { useUpdatePromotion, useDeletePromotion } from "@/app/hooks/forPromo";

interface Ad {
    _id: string;
    title: string;
    status: "active" | "paused" | "ended";
    startDate: string;
    endDate: string;
    createdAt: string;
}

const AdsTable = () => {
    const [filter, setFilter] = useState<"all" | "active" | "paused" | "ended">("all");
    const [selectedAds, setSelectedAds] = useState<{ adId: string }[]>([]);

    const updatePromotion = useUpdatePromotion();
    const deletePromotion = useDeletePromotion();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["promotions"],
        queryFn: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promo`);
        if (!response.ok) throw new Error("Failed to fetch ads.");
        return response.json();
        },
    });

    const ads: Ad[] = data?.promotions || [];

    const filteredAds = ads.filter((ad: Ad) => {
        if (filter === "all") return true;
        return ad.status === filter;
    });

    const toggleSelect = (adId: string) => {
        setSelectedAds((prev) => {
        const exists = prev.some((a) => a.adId === adId);
        if (exists) {
            return prev.filter((a) => a.adId !== adId);
        } else {
            return [...prev, { adId }];
        }
        });
    };

    const isSelected = (adId: string) => selectedAds.some((a) => a.adId === adId);

    const selectAll = () => {
        if (selectedAds.length === filteredAds.length) {
        setSelectedAds([]);
        } else {
        const all = filteredAds.map((ad) => ({ adId: ad._id }));
        setSelectedAds(all);
        }
    };

    const toggleAdStatus = (ad: Ad) => {
        const newStatus = ad.status === "active" ? "paused" : "active";
        const updatedPromotion = {
        title: ad.title,
        status: newStatus,
        startDate: ad.startDate,
        endDate: ad.endDate,
        };
        updatePromotion.mutate({ promotion: updatedPromotion, id: ad._id });
    };

    const handleDeleteSelected = async () => {
        if (selectedAds.length === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedAds.length} promotion(s)?`)) return;
        try {
        await Promise.all(selectedAds.map(({ adId }) => deletePromotion.mutateAsync(adId)));
        setSelectedAds([]);
        alert("Selected promotions deleted successfully");
        } catch {
        alert("Failed to delete one or more promotions.");
        }
    };

    if (isLoading) return <Skeleton />;
    if (isError || !data?.promotions)
        return <p className="text-red-500 text-center mt-6">Failed to load ads.</p>;

    return (
        <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
            <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "active" | "paused" | "ended")}
            className="border border-gray-300 p-2 rounded text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter"
            >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="ended">Ended</option>
            </select>

            {selectedAds.length > 0 && (
            <div className="flex gap-2 mt-4">
                <button
                onClick={handleDeleteSelected}
                disabled={deletePromotion.isPending}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
                >
                Delete Selected
                </button>
            </div>
            )}
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
            <table className="w-full table-auto text-sm text-gray-200 bg-gray-800">
            <thead className="bg-gray-700 text-xs uppercase text-gray-300">
                <tr>
                <th>
                    <button onClick={selectAll} className="text-blue-500 hover:text-blue-700">
                    {selectedAds.length === filteredAds.length ? "Unselect All" : "Select All"}
                    </button>
                </th>
                <th>#</th>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Created At</th>
                <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredAds.map((ad: Ad, i: number) => (
                <tr
                    key={ad._id}
                    className="hover:bg-gray-700 transition duration-200 border-t border-gray-600"
                >
                    <td className="text-center">
                    <span
                        onClick={() => toggleSelect(ad._id)}
                        className={`cursor-pointer w-4 h-4 inline-block rounded-full border-2 ${
                        isSelected(ad._id)
                            ? "bg-blue-500 border-blue-500"
                            : "bg-transparent border-gray-400"
                        }`}
                    ></span>
                    </td>
                    <td className="text-center">{i + 1}</td>
                    <td className="p-4 text-center">{ad.title}</td>
                    <td className="p-4 text-center capitalize">{ad.status}</td>
                    <td className="p-4 text-center">
                    {new Date(ad.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    </td>
                    <td className="p-4 text-center">
                    {new Date(ad.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    </td>
                    <td className="p-4 text-center">
                    {new Date(ad.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    </td>
                    <td className="p-4 text-center">
                    <button
                        disabled={updatePromotion.isPending}
                        onClick={() => toggleAdStatus(ad)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm disabled:opacity-50"
                    >
                        {ad.status === "active" ? "Pause" : "Activate"}
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

export default AdsTable;
