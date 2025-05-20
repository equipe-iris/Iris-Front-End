import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { DailyTicketsData } from "@/types/charts";
import { getDateRange } from "@/lib/utils";
import { TimeRange } from "@/types/api";

async function getDailyTickets(timeRange: TimeRange): Promise<DailyTicketsData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    return api.get(`/dashboard/daily-tickets`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
}

export function getDailyTicketsQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["daily-tickets", timeRange],
        queryFn: () => getDailyTickets(timeRange),
    })
}

export function useDailyTickets(timeRange: TimeRange) {
    return useQuery({
        ...getDailyTicketsQueryOptions(timeRange),
    })
}