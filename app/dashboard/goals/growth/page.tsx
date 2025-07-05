import AISuggestions from "@/components/dashboard/growth/AISuggestions"
import AssignStrategyModal from "@/components/dashboard/growth/AssignStrategyModal"
import StrategyList from "@/components/dashboard/growth/StrategyList"
import StrategyTracker from "@/components/dashboard/growth/StrategyTracker"



const Page = () => {
    return (
        
        <section className="p-6 space-y-6">
        <StrategyList />
        <AssignStrategyModal />
        <StrategyTracker />
        <AISuggestions />
        </section>

    )
}

export default Page
