import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Ticket } from "@/types/api";

function getEmotionEvolutionTicketsDetails(startDate?: string, endDate?: string): Promise<Ticket[]> {

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

export function getEmotionEvolutionTicketsDetailsQueryOptions(startDate?: string, endDate?: string) {
    return queryOptions({
        queryKey: ["daily-tickets-details", startDate, endDate],
        queryFn: () => getEmotionEvolutionTicketsDetails(startDate, endDate),
    })
}

export function useEmotionEvolutionTicketsDetails(startDate?: string, endDate?: string) {
    return useQuery(getEmotionEvolutionTicketsDetailsQueryOptions(startDate, endDate))
}