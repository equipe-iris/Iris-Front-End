import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { EmotionScoreChartData } from "@/types/charts";
import { getDateRange } from "@/lib/utils";
import { TimeRange } from "@/types/api";

async function getEmotionScoreEvolution(timeRange: TimeRange): Promise<EmotionScoreChartData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    return api.get(`/dashboard/daily-satisfaction`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
}

function getEmotionScoreQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["emotion-score-evolution", timeRange],
        queryFn: () => getEmotionScoreEvolution(timeRange),
    })
}

export function useEmotionScoreEvolution(timeRange: TimeRange) {
    return useQuery({
        ...getEmotionScoreQueryOptions(timeRange),
        placeholderData: [{ date: "2025-01-01", score: 0, ticket_count: 0 }],
    })
}