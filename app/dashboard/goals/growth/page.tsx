'use client';

// import AssignStrategyModal from "@/components/dashboard/growth/AssignStrategyModal";
import StrategyTracker from "@/components/dashboard/growth/StrategyTracker";
import GoalWithStrategies from "@/components/dashboard/growth/StrategyList";
import { useState } from "react";

const Page = () => {
    const [strategy, setStrategy] = useState("");

    const set = (strategy: string) => {
        setStrategy(strategy);
    };

    return (
        <section className="p-6 space-y-6">
            <GoalWithStrategies action={set} />
            {/* <AssignStrategyModal /> */}
            <StrategyTracker strategy={strategy} />
        </section>
    );
};

export default Page;
