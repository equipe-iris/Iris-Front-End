"use client"

import { useTotalTickets } from "../api/get-total-tickets";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketSlash } from "lucide-react";


export function TotalTicketsCard() {

    const totalTicketsQuery = useTotalTickets()
    const totalTickets = totalTicketsQuery.data?.total ?? 0
    const closedTickets = totalTicketsQuery.data?.closed ?? 0
    const openTickets = totalTicketsQuery.data?.open ?? 0
    const closedTicketsPercentage = (closedTickets / totalTickets) * 100
    const openTicketsPercentage = (openTickets / totalTickets) * 100

    const isEmpty = !totalTicketsQuery.data || totalTicketsQuery.data.total === 0

    if (totalTicketsQuery.isLoading) {
        return (
            <Card className="col-span-3 row-span-2 flex px-8 py-4 gap-8 justify-center">
                <div className="flex flex-col gap-5">
                    <Skeleton className="h-10 w-35" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </Card>
        )
    }

    return (
        <Card className="col-span-3 row-span-2 flex px-8 py-8 gap-8 justify-center">
            <div className="flex gap-5 ">
                <TicketSlash size={40} color="#FF2056" className="px-[10px] py-3 bg-rose-500/15 rounded-full" />
                <div className="flex flex-col gap-5 w-full max-w-[70%]">
                    <div className="flex flex-col">
                        <span className="text-lg font-medium text-zinc-600">Total de chamados</span>
                        <span className="text-2xl font-bold text-zinc-800">{totalTickets}</span>
                    </div>
                    {!isEmpty && (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-start justify-between">
                                    <span className="text-sm text-zinc-700 font-semibold">Encerrados</span>
                                    <span className="text-sm text-zinc-500 font-semibold">{closedTickets} {`(${closedTicketsPercentage.toFixed(1)}%)`}</span>
                                </div>
                                <Progress value={closedTicketsPercentage} className="[&>*]:bg-green-500" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-start justify-between">
                                    <span className="text-sm text-zinc-700 font-semibold">Em aberto</span>
                                    <span className="text-sm text-zinc-500 font-semibold">{openTickets} {`(${openTicketsPercentage.toFixed(1)}%)`}</span>
                                </div>
                                <Progress value={openTicketsPercentage} className="[&>*]:bg-yellow-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}