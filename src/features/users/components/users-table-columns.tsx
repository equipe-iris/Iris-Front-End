"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";

import UsersTableActionsCell from "./users-table-actions-cell";
import { UserRoleCell } from "./users-table-cells";

export type User = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "VIEWER";
}

export const columns: ColumnDef<User>[] = [
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
        header: "Perfil",
        cell: ({ row }) => {
            const role = row.getValue<string>("role");
            return <UserRoleCell value={role} />;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">Ações</div>,
        cell: ({ row }) => <UsersTableActionsCell user={row.original} />,
    },
]