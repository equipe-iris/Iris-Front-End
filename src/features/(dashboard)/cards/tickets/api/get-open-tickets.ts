import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "@/types/api";

function getOpenTickets(startDate?: string, endDate?: string): Promise<Ticket[]> {
    return api.get<Ticket[]>(`/tickets/open-tickets`, {
        params: {
            start_date: startDate? startDate : "",
            end_date: endDate? endDate : "",
        }
    })
}

export function getOpenTicketsQueryOptions(startDate?: string, endDate?: string) {
    return queryOptions({
        queryKey: ["open-tickets", startDate, endDate],
        queryFn: () => getOpenTickets(startDate, endDate),
    })
}

export function useOpenTickets(startDate?: string, endDate?: string) {
    return useQuery(getOpenTicketsQueryOptions(startDate, endDate))
}