import { Metadata } from "next";

import { UsersTable } from "@/features/users/components/users-table";

import { UsersListHeader } from "@/features/users/components/users-list-header";
import { Authorization } from "@/features/auth/components/authorization";

export const metadata: Metadata = {
    title: "Íris - Usuários",
    description: "Gerenciamento de usuários",
}

export default function UsersListPage() {
    return (
        <Authorization allowedRole="ADMIN">
            <div className="flex flex-col gap-4 p-4 lg:p-0">
                <UsersListHeader />
                <UsersTable />
            </div>
        </Authorization>
    )
}