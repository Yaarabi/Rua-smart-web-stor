"use client";

import { useGetGoals } from "@/app/hooks/forGoal";
import Chart from "@/components/charts/goal";
import CheckGoal from "@/components/dashboard/checkGoal";
import SmartGoal from "@/components/dashboard/smartGoal";
import Loader from "@/components/loader";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaClipboardCheck, FaLightbulb, FaStreetView } from "react-icons/fa";

const Page = () => {
    const [show, setShow] = useState(true);
    const [check, setCheck] = useState(false);
    const [go, setGo] = useState(false);
    const [track, setTrack] = useState(false);
    const [input, setInput] = useState("");
    const [goals, setGoals] = useState([]);

    const router = useRouter();

    const resetAll = () => {
        setShow(true);
        setCheck(false);
        setGo(false);
        setTrack(false);
        setInput("");
        setGoals([]);
    };

    const getGoals = useGetGoals();

    useEffect(() => {
        if (track && getGoals.data) {
        setGoals(getGoals.data);
        }
    }, [track, getGoals.data]);

    if (getGoals.isLoading) return <Loader />;

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
        {show && (
            <div className="max-w-xl w-full p-8 bg-gray-800 rounded-3xl shadow-lg text-center space-y-8">
            <div
                onClick={() => router.push("/dashboard/goals")}
                className="flex items-center gap-2 cursor-pointer self-start hover:text-indigo-400 transition"
            >
                <FaArrowLeft className="text-lg" />
                <span className="font-medium">Back</span>
            </div>
            <div
                onClick={() => {
                setCheck(true);
                setShow(false);
                }}
                className="cursor-pointer flex items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 hover:bg-indigo-700 transition px-6 py-4"
            >
                <FaClipboardCheck className="text-3xl text-indigo-400" />
                <span className="text-xl font-semibold">Check a Goal</span>
            </div>

            <div
                onClick={() => {
                setGo(true);
                setShow(false);
                }}
                className="cursor-pointer flex items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 hover:bg-indigo-700 transition px-6 py-4"
            >
                <FaLightbulb className="text-3xl text-indigo-400" />
                <span className="text-xl font-semibold">Get some SMART Goals</span>
            </div>
            <div
                onClick={() => {
                setTrack(true);
                setShow(false);
                }}
                className="cursor-pointer flex items-center justify-center space-x-4 rounded-lg bg-indigo-700/30 hover:bg-indigo-700 transition px-6 py-4"
            >
                <FaStreetView className="text-3xl text-indigo-400" />
                <span className="text-xl font-semibold">Track my Goals</span>
            </div>
            </div>
        )}

        {check && (
            <div className="w-4/5 mx-auto p-8 bg-gray-800 rounded-3xl shadow-lg flex flex-col space-y-6">
            <input
                type="textarea"
                placeholder="Enter your goal"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition"
            />
            <div className="flex justify-between">
                <button
                onClick={resetAll}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                Back
                </button>
                <button
                onClick={() => {
                    if (input.trim() !== "") {
                    setGo(true);
                    setCheck(false);
                    }
                }}
                disabled={input.trim() === ""}
                className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
                >
                Get Response
                </button>
            </div>
            </div>
        )}

        {go && (
            <div className="w-full mt-8 p-8 rounded-3xl shadow-lg">
            <button
                onClick={resetAll}
                className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white transition"
            >
                Back to Menu
            </button>
            <CheckGoal title={input} />
            </div>
        )}

        {!show && !check && !go && !track && (
            <div className="max-w-xl w-full p-8 bg-gray-800 rounded-3xl shadow-lg">
            <button
                onClick={resetAll}
                className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white transition"
            >
                Back to Menu
            </button>
            <SmartGoal />
            </div>
        )}

        {track && (
            <div className="max-w-4xl w-full space-y-8 mt-4">
            <button
                onClick={resetAll}
                className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white transition"
            >
                Back to Menu
            </button>
            {goals.length > 0 ? (
                goals.map((goal, index) => <Chart key={index} goal={goal} />)
            ) : (
                <Typography>No goals to track.</Typography>
            )}
            </div>
        )}
        </section>
    );
};

export default Page;
