import { Metadata } from "next"

import { TicketsListHeader } from "@/features/support-tickets/components/tickets-list-header"
import { TicketsTable } from "@/features/support-tickets/components/tickets-table"

export const metadata: Metadata = {
    title: "Íris - Listagem de chamados",
}

export default function TicketsListPage() {
    return (
        <div className="flex flex-col gap-4 p-4 lg:p-0">
            <TicketsListHeader />
            <TicketsTable />
        </div>
    )
}