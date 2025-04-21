"use client";

import React from "react";

import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

import { useUsers } from "../api/get-users"
import { columns } from "./users-table-columns"

export function UsersTable() {

    const usersQuery = useUsers()
    const users = usersQuery.data || []

    const [filter, setFilter] = React.useState<string>("")

    if (usersQuery.isPending) return (
        <div className="flex flex-col gap-4">
            <Skeleton className="w-[80%] h-12" />
            <Skeleton className="w-full h-96" />
        </div>
    )

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Pesquisar por nome, email..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <DataTable
                columns={columns}
                data={users}
                filterColumn="name"
                filterValue={filter}
            />
        </div>
    )

}