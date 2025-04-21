"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";

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
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center justify-center">
                            <EllipsisVertical className="cursor-pointer text-muted-foreground hover:text-zinc-800" size={16} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => { console.log(user) }}
                            className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer"
                        >
                            <Eye size={16} className="text-sm font-semibold text-zinc-700" />
                            Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => { }}
                            className="flex items-center gap-2 text-sm font-medium text-red-500 cursor-pointer hover:text-red-500"
                        >
                            <Trash2 size={16} className="text-sm font-semibold text-red-500" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]