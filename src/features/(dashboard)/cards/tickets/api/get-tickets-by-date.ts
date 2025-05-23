import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { TicketCardsData } from "@/types/charts";

function getTicketsByDate(date: string): Promise<TicketCardsData> {
    return api.get(`/dashboard/tickets`, {
        params: {
            date
        }
    })
}

export function getTicketsByDateQueryOptions(date: string) {
    return queryOptions({
        queryKey: ["tickets", date],
        queryFn: () => getTicketsByDate(date),
    })
}

export function useTicketsByDate(date: string) {
    return useQuery(getTicketsByDateQueryOptions(date))
}