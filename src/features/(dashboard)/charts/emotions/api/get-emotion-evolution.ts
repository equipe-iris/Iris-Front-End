import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { EmotionEvolutionData } from "@/types/charts";
import { getDateRange } from "@/lib/utils";
import { TimeRange } from "@/types/api";

async function getEmotionEvolution(timeRange: TimeRange): Promise<EmotionEvolutionData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    return api.get(`/dashboard/daily-emotion`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
}

export function getEmotionEvolutionQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["emotion-evolution", timeRange],
        queryFn: () => getEmotionEvolution(timeRange),
    })
}

export function useEmotionEvolution(timeRange: TimeRange) {
    return useQuery({
        ...getEmotionEvolutionQueryOptions(timeRange),
    })
}