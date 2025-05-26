import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { getDateRange } from "@/lib/utils";
import { Ticket, TimeRange } from "@/types/api";

async function getEmotionsTicketsDetails(timeRange: TimeRange, emotion: string): Promise<Ticket[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    return api.get<Ticket[]>(`/tickets/tickets-by-emotion`, {
        params: {
            start_date: start_date,
            end_date: end_date,
            emotion: emotion,
        }
    });
}

export function getEmotionsTicketsDetailsQueryOptions(timeRange: TimeRange, emotion: string) {
    return queryOptions({
        queryKey: ["emotions", timeRange, emotion],
        queryFn: () => getEmotionsTicketsDetails(timeRange, emotion),
    })
}

export function useEmotionsTicketsDetails(timeRange: TimeRange, emotion: string) {
    return useQuery({
        ...getEmotionsTicketsDetailsQueryOptions(timeRange, emotion),
    })
}