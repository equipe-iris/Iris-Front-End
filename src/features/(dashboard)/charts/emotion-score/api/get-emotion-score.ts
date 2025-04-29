import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { EmotionScoreChartData } from "@/types/charts";
import { formatToEmotionScoreChart } from "@/lib/formats";
import { getDateRange } from "@/lib/utils";
import { TimeRange } from "@/types/api";

async function getEmotionScore(timeRange: TimeRange): Promise<EmotionScoreChartData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    const response = await api.get<EmotionScoreChartData>(`/dashboard/satisfaction-score`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
    return formatToEmotionScoreChart(response);
}

export function getEmotionScoreQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["emotion-score", timeRange],
        queryFn: () => getEmotionScore(timeRange),
    })
}

export function useEmotionScore(timeRange: TimeRange) {
    return useQuery({
        ...getEmotionScoreQueryOptions(timeRange),
        placeholderData: [{ score: 0, ticket_count: 0, fill: "var(--color-score)" }],
    })
}