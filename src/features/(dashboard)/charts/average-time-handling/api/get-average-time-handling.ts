import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { AHTChartData } from "@/types/charts";

function getAHT(months: number): Promise<AHTChartData[]> {
    return api.get(`/dashboard/average-service-time`, {
        params: {
            months: months,
        }
    });
}

export function getAHTQueryOptions(months: number) {
    return queryOptions({
        queryKey: ["average-handling-time", months],
        queryFn: () => getAHT(months),
    })
}

export function useAHT(months: number) {    
    return useQuery(getAHTQueryOptions(months))
}