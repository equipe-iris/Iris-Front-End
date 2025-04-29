import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { getDateRange } from "@/lib/utils";

import { AHTChartData } from "@/types/charts";
import { TimeRange } from "@/types/api";

function getAHT(timeRange: TimeRange): Promise<AHTChartData[]> {
    const { start_date, end_date } = getDateRange(timeRange);
    return api.get(`/dashboard/average-service-time`, {
        params: {
            start_date: start_date,
            end_date: end_date
        }
    });
}

export function getAHTQueryOptions(timeRange: TimeRange) {
    return queryOptions({
        queryKey: ["average-handling-time", timeRange],
        queryFn: () => getAHT(timeRange),
    })
}

export function useAHT(timeRange: TimeRange) {
    return useQuery(getAHTQueryOptions(timeRange))
}