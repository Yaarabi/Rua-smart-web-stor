'use client';
import React, { useState } from 'react';

const AssignStrategyModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            onClick={() => setOpen(true)}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
        >
            ➕ Assign Strategy
        </button>

        {open && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-700 dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-6">Assign Strategy</h3>
                <form className="space-y-5">
                <input
                    type="text"
                    placeholder="Strategy Name"
                    className="w-full p-3 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <select
                    className="w-full p-3 rounded-md bg-gray-600 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    defaultValue=""
                >
                    <option value="" disabled>
                    Select Product or Category
                    </option>
                </select>
                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 rounded-md text-white font-medium hover:bg-green-700 transition"
                >
                    Assign
                </button>
                </form>
                <button
                onClick={() => setOpen(false)}
                className="mt-5 text-sm text-gray-300 hover:underline focus:outline-none"
                >
                Cancel
                </button>
            </div>
            </div>
        )}
        </>
    );
    };

export default AssignStrategyModal;
