import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { getDateRange } from "@/lib/utils";
import { Ticket, TimeRange } from "@/types/api";

async function getCategoriesTicketsDetails(timeRange: TimeRange, category: string): Promise<Ticket[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    return api.get<Ticket[]>(`/tickets/tickets-by-category`, {
        params: {
            start_date: start_date,
            end_date: end_date,
            category: category,
        }
    });
}

export function getCategoriesTicketsDetailsQueryOptions(timeRange: TimeRange, category: string) {
    return queryOptions({
        queryKey: ["categories", timeRange, category],
        queryFn: () => getCategoriesTicketsDetails(timeRange, category),
    })
}

export function useCategoriesTicketsDetails(timeRange: TimeRange, category: string) {
    return useQuery({
        ...getCategoriesTicketsDetailsQueryOptions(timeRange, category),
    })
}