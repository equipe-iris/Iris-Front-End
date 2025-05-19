import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { EmotionsChartData } from "@/types/charts";
import { formatToEmotionsChart } from "@/lib/formats";
import { getDateRange } from "@/lib/utils";
import { TimeRange } from "@/types/api";

async function getEmotions(timeRange: TimeRange): Promise<EmotionsChartData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    const response = await api.get<EmotionsChartData[]>(`/dashboard/emotions`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
    return formatToEmotionsChart(response);
}

export function getEmotionsQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["emotions", timeRange],
        queryFn: () => getEmotions(timeRange),
    })
}

export function useEmotions(timeRange: TimeRange) {
    return useQuery({
        ...getEmotionsQueryOptions(timeRange),
    })
}