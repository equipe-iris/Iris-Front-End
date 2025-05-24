import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "@/types/api";

function getClosedTickets(startDate?: string, endDate?: string): Promise<Ticket[]> {
    return api.get<Ticket[]>(`/tickets/closed-tickets`, {
        params: {
            start_date: startDate? startDate : "",
            end_date: endDate? endDate : "",
        }
    })
}

export function getClosedTicketsQueryOptions(startDate?: string, endDate?: string) {
    return queryOptions({
        queryKey: ["closed-tickets", startDate, endDate],
        queryFn: () => getClosedTickets(startDate, endDate),
    })
}

export function useClosedTickets(startDate?: string, endDate?: string) {
    return useQuery(getClosedTicketsQueryOptions(startDate, endDate))
}