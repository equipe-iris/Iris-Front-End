import { useQuery } from "@tanstack/react-query";

// import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

import { User } from "../components/users-table-columns";


const USERS_MOCK: User[] = [
    {
        id: "728ed52f",
        name: "John Doe",
        email: "johndoe@gmail.com",
        role: "Admin"
    },
    {
        id: "728ed52g",
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52h",
        name: "Alice Smith",
        email: "alicesmith@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52i",
        name: "Bob Johnson",
        email: "bobjohnson@gmail.com",
        role: "Admin"
    },
    {
        id: "728ed52j",
        name: "Charlie Brown",
        email: "charliebrown@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52f",
        name: "John Doe",
        email: "johndoe@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52g",
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52h",
        name: "Alice Smith",
        email: "alicesmith@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52i",
        name: "Bob Johnson",
        email: "bobjohnson@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52j",
        name: "Charlie Brown",
        email: "charliebrown@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52j",
        name: "Charlie Brown",
        email: "charliebrown@gmail.com",
        role: "Viewer"
    },
    {
        id: "728ed52j",
        name: "Charlie Brown",
        email: "emailnadaaver@gmail.com",
        role: "Viewer"
    }
]

function getUsers(): Promise<User[]> {
    //return api.get("/users")
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(USERS_MOCK)
        }, 1000)
    })
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
