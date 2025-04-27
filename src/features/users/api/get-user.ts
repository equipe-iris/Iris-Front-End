import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

import { User } from "../components/users-table-columns";

function getUser(userId: string): Promise<User> {
    return api.get(`/users/${userId}`)
}

export function getUserQueryOptions(userId: string) {
    return queryOptions({
        queryKey: ["users", userId],
        queryFn: () => getUser(userId),
    })
}

type UseUserOptions = {
    userId: string
    queryConfig?: QueryConfig<typeof getUserQueryOptions>
}

export function useUser({ userId, queryConfig }: UseUserOptions) {
    return useQuery({
        ...getUserQueryOptions(userId),
        ...queryConfig,
    })
}