import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CategoryChartData } from "@/types/types";
import { formatToCategoryChart } from "@/lib/formats";

async function getTicketsCategorization(): Promise<CategoryChartData[]> {
    const response = await api.get<CategoryChartData[]>(`/dashboard/categories`);
    const data = formatToCategoryChart(response);
    return data;
}

function getTicketsCategorizationQueryOptions() {
    return queryOptions({
        queryKey: ["tickets-categorization"],
        queryFn: getTicketsCategorization,
    })
}

export function useTicketsCategories() {
    return useQuery(getTicketsCategorizationQueryOptions())
}