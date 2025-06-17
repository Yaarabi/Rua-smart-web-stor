import React from "react";

const DashboardHead = () => {

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
});

    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <h2 className="text-lg">{currentDate}</h2>
        </nav>
);
};

export default DashboardHead;
