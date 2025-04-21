"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";

import UsersTableActionsCell from "./users-table-actions-cell";

export type User = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Viewer";
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "name",
        header: "Nome",
        filterFn: (row, columnId, filterValue) => {
            const name = row.getValue<string>("name")?.toLowerCase() ?? "";
            const email = row.getValue<string>("email")?.toLowerCase() ?? "";
            const value = (filterValue as string).toLowerCase();
            return name.includes(value) || email.includes(value);
        }
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "role",
        header: "Cargo"
    },
    {
        id: "actions",
        header: () => <div className="text-center">Ações</div>,
        cell: ({ row }) => <UsersTableActionsCell user={row.original} />,      
    },
]