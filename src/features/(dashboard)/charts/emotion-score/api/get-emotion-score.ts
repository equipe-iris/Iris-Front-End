import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { EmotionScoreChartData } from "@/types/types";
import { formatToEmotionScoreChart } from "@/lib/formats";

async function getEmotionScore(): Promise<EmotionScoreChartData[]> {
    const response = await api.get<EmotionScoreChartData>(`/dashboard/satisfaction-score`, {
        params: {
            start_date: "2023-01-01",
            end_date: "2025-03-30"
        }
    });
    return formatToEmotionScoreChart(response);
}

function getEmotionScoreQueryOptions() {
    return queryOptions({
        queryKey: ["emotion-score"],
        queryFn: getEmotionScore,
    })
}

export function useEmotionScore() {
    return useQuery(getEmotionScoreQueryOptions())
}