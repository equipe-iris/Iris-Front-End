import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { Ticket } from "@/types/api";

function getTicketsDetailsByMonth(month?: string): Promise<Ticket[]> {
    return api.get<Ticket[]>(`/tickets/tickets-by-month`, {
        params: {
            month: month ? month : "",
        }
    })
}

export function getTicketsDetailsByMonthQueryOptions(month?: string) {
    return {
        queryKey: ["tickets-by-month", month],
        queryFn: () => getTicketsDetailsByMonth(month),
    }
}

export function useTicketsDetailsByMonth(month?: string) {
    return useQuery(getTicketsDetailsByMonthQueryOptions(month))
}