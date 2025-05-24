import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "@/types/api";

function getTicketsDetails(startDate?: string, endDate?: string): Promise<Ticket[]> {

    if (!startDate && !endDate) {
        return Promise.resolve([] as Ticket[])
    }

    return api.get<Ticket[]>(`/tickets/processed-tickets`, {
        params: {
            start_date: startDate,
            end_date: endDate,
        }
    })
}

export function getTicketsDetailsQueryOptions(startDate?: string, endDate?: string) {
    return queryOptions({
        queryKey: ["daily-tickets-details", startDate, endDate],
        queryFn: () => getTicketsDetails(startDate, endDate),
    })
}

export function useTicketsDetails(startDate?: string, endDate?: string) {
    return useQuery(getTicketsDetailsQueryOptions(startDate, endDate))
}