import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { TicketCardsData } from "@/types/charts";

function getTotalTickets(): Promise<TicketCardsData> {
    return api.get(`/dashboard/cards`)
}

export function getTotalTicketsQueryOptions() {
    return queryOptions({
        queryKey: ["total-tickets"],
        queryFn: getTotalTickets,
    })
}

export function useTotalTickets() {
    return useQuery(getTotalTicketsQueryOptions())
}