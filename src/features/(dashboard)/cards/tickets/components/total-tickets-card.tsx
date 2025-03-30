"use client"

import { useTotalTickets } from "../api/get-total-tickets";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketSlash } from "lucide-react";


export function TotalTicketsCard() {

    const totalTicketsQuery = useTotalTickets()
    const totalTickets = totalTicketsQuery.data?.total_tickets

    if (totalTicketsQuery.isLoading) {
        return (
            <Card className="col-span-1 row-span-2 flex px-8 py-4 gap-8 justify-center">
                <div className="flex flex-col gap-5">
                    <Skeleton className="h-10 w-35" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </Card>
        )
    }

    return (
        <Card className="col-span-1 row-span-2 flex px-8 py-4 gap-8 justify-center">
            <div className="flex gap-5 ">
                <TicketSlash size={40} color="#FF2056" className="px-[10px] py-3 bg-rose-500/15 rounded-full" />
                <div className="flex flex-col gap-4">
                    <span className="text-lg font-medium text-zinc-600">Total de chamados</span>
                    <span className="text-4xl font-bold text-zinc-800">{totalTickets}</span>
                </div>
            </div>
        </Card>
    )
}