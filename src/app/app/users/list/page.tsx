import { UsersTable } from "@/features/users/components/users-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Íris - Usuários",
    description: "Gerenciamento de usuários",
}

export default function UsersListPage() {
    return (
        <UsersTable />
    )
}