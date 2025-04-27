import { useQuery } from "@tanstack/react-query";

import { QueryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

import { User } from "../components/users-table-columns";

function getUsers(): Promise<User[]> {
    return api.get("/users")
}

export function getUsersQueryOptions() {
    return {
        queryKey: ["users"],
        queryFn: getUsers,
    }
}

type UseUsersOptions = {
    queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export function useUsers({ queryConfig }: UseUsersOptions = {}) {
    return useQuery({
        ...getUsersQueryOptions(),
        ...queryConfig,
    })
}   
