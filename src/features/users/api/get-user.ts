import { queryOptions, useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";

import { User } from "../components/users-table-columns";

import { USERS_MOCK } from "./get-users";

function getUser(userId: string): Promise<User> {
    //return api.get(`/users/${userId}`)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = USERS_MOCK.find(user => user.id === userId);
            if (user) {
                resolve(user);
            } else {
                reject(new Error("Usuário não encontrado"));
            }
        }, 2000);
    })
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