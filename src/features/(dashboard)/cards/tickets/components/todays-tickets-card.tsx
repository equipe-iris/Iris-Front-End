"use client"

import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface TodaysTicketsCardProps {
    todayTickets: number
}

export function TodaysTicketsCard({ todayTickets }: TodaysTicketsCardProps) {
    return (
        <Card className="col-span-1 row-span-2 flex px-8 py-4 gap-8 justify-center">
            <div className="flex gap-5 ">
                <TrendingUp size={40} color="#00BBA7" className="px-[10px] py-3 bg-teal-500/20 rounded-full" />
                <div className="flex flex-col gap-4">
                    <span className="text-lg font-medium text-zinc-600">Chamados do dia</span>
                    <span className="text-4xl font-bold text-zinc-800">{todayTickets}</span>
                </div>
            </div>
        </Card>
    )
}