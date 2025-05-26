import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

function getAHTGoal(): Promise<number> {
    return api.get(`/settings/ast-goal`)
}

export function getAHTGoalQueryOptions() {
    return queryOptions({
        queryKey: ["ast-goal"],
        queryFn: getAHTGoal,
    })
}

export function useAHTGoal() {
    return useQuery(getAHTGoalQueryOptions())
}