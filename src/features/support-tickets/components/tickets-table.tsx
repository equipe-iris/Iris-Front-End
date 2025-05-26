"use client";

import { useTickets } from "@/features/support-tickets/api/get-tickets";
import { columns } from "@/features/support-tickets/components/tickets-table-columns";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

export function TicketsTable() {
    const ticketsQuery = useTickets();
    const tickets = ticketsQuery.data || [];

    if (ticketsQuery.isPending) return (
        <div className="flex flex-col gap-4">
            <Skeleton className="w-[80%] h-12" />
            <Skeleton className="w-full h-96" />
        </div>
    )

    return (
        <DataTable columns={columns} data={tickets} />
    )
}