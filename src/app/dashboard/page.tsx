import { CategoryChart } from "@/features/(dashboard)/classification/components/category-chart"
import { EmotionScoreChart } from "@/features/(dashboard)/classification/components/emotion-score-chart"
import { EmotionScoreEvolutionChart } from "@/features/(dashboard)/classification/components/emotion-score-evolution-chart"

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-medium text-zinc-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-3 grid-rows-12 gap-4">
                <div className="bg-red-500 min-h-[150px] rounded-lg shadow-lg col-span-1 row-span-2"></div>
                {/* <div className="bg-blue-500 min-h-[300px] rounded-lg shadow-lg col-span-1 row-span-4"></div> */}
                <EmotionScoreChart />
                <div className="bg-yellow-500 min-h-[300px] rounded-lg shadow-lg col-span-1 row-span-6"></div>
                <div className="bg-cyan-500 min-h-[150px] rounded-lg shadow-lg row-span-2"></div>
                {/* <div className="bg-slate-500 min-h-[300px] rounded-lg shadow-lg col-span-2 row-span-4"></div> */}
                <EmotionScoreEvolutionChart />
                {/* <div className="bg-teal-500 min-h-[300px] rounded-lg shadow-lg col-span-1 row-span-4"></div> */}
                <CategoryChart />
                <div className="bg-indigo-500 min-h-[300px] rounded-lg shadow-lg col-span-2 row-span-4"></div>
            </div>
        </div>
    )
}