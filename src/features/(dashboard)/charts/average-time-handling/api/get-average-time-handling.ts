import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { AHTChartData } from "@/types/charts";

function getAHT(): Promise<AHTChartData[]> {
    return api.get(`/dashboard/average-service-time`);
}

function getAHTQueryOptions() {
    return queryOptions({
        queryKey: ["average-handling-time"],
        queryFn: getAHT,
    })
}

export function useAHT() {
    return useQuery(getAHTQueryOptions())
}