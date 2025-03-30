import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { TicketCardsData } from "@/types/types";

function getTotalTickets(): Promise<TicketCardsData> {
    return api.get(`/dashboard/cards`)
}

function getTotalTicketsQueryOptions() {
    return queryOptions({
        queryKey: ["total-tickets"],
        queryFn: getTotalTickets,
    })
}

export function useTotalTickets() {
    return useQuery(getTotalTicketsQueryOptions())
}