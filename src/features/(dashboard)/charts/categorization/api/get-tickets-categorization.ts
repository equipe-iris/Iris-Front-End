import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CategoryChartData } from "@/types/charts";
import { formatToCategoryChart } from "@/lib/formats";
import { TimeRange } from "@/types/api";
import { getDateRange } from "@/lib/utils";

async function getTicketsCategorization(timeRange: TimeRange): Promise<CategoryChartData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    const response = await api.get<CategoryChartData[]>(`/dashboard/categories`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
    const data = formatToCategoryChart(response);
    return data;
}

export function getTicketsCategorizationQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["tickets-categorization", timeRange],
        queryFn: () => getTicketsCategorization(timeRange),
    })
}

export function useTicketsCategories(timeRange: TimeRange) {
    return useQuery(getTicketsCategorizationQueryOptions(timeRange))
}