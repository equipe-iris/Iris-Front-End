import {
    AverageTimeHandlingChart,
    CategoryChart,
    EmotionScoreChart,
    EmotionScoreEvolutionChart,
    FrequentTermsCard,
    TodaysTicketsCard,
    TotalTicketsCard
} from "@/features/(dashboard)";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Íris - Dashboard",
    description: "Dashboard de análise de chamados",
};

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-medium text-zinc-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-4 grid-rows-12 gap-5">
                <TotalTicketsCard />
                <EmotionScoreChart />
                <FrequentTermsCard />
                <TodaysTicketsCard />
                <EmotionScoreEvolutionChart />
                <CategoryChart />
                <AverageTimeHandlingChart />
            </div>
        </div>
    )
}