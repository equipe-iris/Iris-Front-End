import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { TicketCardsData } from "@/types/charts";

function getTodayTickets(): Promise<TicketCardsData> {
    return api.get(`/dashboard/cards`)
}

export function getTodayTicketsQueryOptions() {
    return queryOptions({
        queryKey: ["today-tickets"],
        queryFn: getTodayTickets,
    })
}

export function useTodayTickets() {
    return useQuery(getTodayTicketsQueryOptions())
}