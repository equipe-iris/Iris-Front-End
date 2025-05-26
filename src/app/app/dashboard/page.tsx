import {
    AverageTimeHandlingChart,
    CategoryChart,
    EmotionsChart,
    EmotionEvolutionChart,
    TodaysTicketsCard,
    TotalTicketsCard
} from "@/features/(dashboard)";
import { DailyTicketsChart } from "@/features/(dashboard)/charts/daily-tickets/components/daily-tickets-chart";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Íris - Dashboard",
    description: "Dashboard de análise de chamados",
};

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-medium text-zinc-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-10 grid-rows-12 gap-5">
                <TotalTicketsCard />
                <DailyTicketsChart />
                <TodaysTicketsCard />
                <EmotionEvolutionChart />
                <EmotionsChart />
                <CategoryChart />
                <AverageTimeHandlingChart />
            </div>
        </div>
    )
}