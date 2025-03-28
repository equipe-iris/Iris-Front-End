"use client"

import { Card } from "@/components/ui/card";
import { TicketSlash } from "lucide-react";

interface TotalTicketsCardProps {
    totalTickets: number
}

export default function TotalTicketsCard({ totalTickets }: TotalTicketsCardProps) {
    return (
        <Card className="col-span-1 row-span-2 flex px-8 py-4 gap-8 justify-center">
            <div className="flex gap-5 ">
                <TicketSlash size={40} color="#FF2056" className="px-[10px] py-3 bg-rose-500/15 rounded-full"/>
                <div className="flex flex-col gap-4">
                    <span className="text-lg font-medium text-zinc-600">Total de chamados</span>
                    <span className="text-4xl font-bold text-zinc-800">{totalTickets}</span>
                </div>
            </div>
        </Card>    
    )
}