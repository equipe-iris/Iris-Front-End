"use client"

import React from "react";

import { useTicketsByDate } from "../api/get-tickets-by-date";

import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DatePicker } from "@/components/date-picker";

import { getToday } from "@/lib/utils";

import { Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { OpenTicketsDrawer } from "./open-tickets-drawer";
import { ClosedTicketsDrawer } from "./closed-tickets-drawer";


export function TodaysTicketsCard() {

    //OT = Open Tickets, CT = Closed Tickets
    const [openOTDrawer, setOpenOTDrawer] = React.useState(false)
    const [openCTDrawer, setOpenCTDrawer] = React.useState(false)


    const today = getToday()
    const [date, setDate] = React.useState<string>(today)
    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(format(newDate, "yyyy-MM-dd"))
        }
    }

    const ticketsQuery = useTicketsByDate(date)
    const totalTickets = ticketsQuery.data?.total ?? 0
    const closedTickets = ticketsQuery.data?.closed ?? 0
    const openTickets = ticketsQuery.data?.open ?? 0
    const closedTicketsPercentage = (closedTickets / totalTickets) * 100
    const openTicketsPercentage = (openTickets / totalTickets) * 100

    const isEmpty = !ticketsQuery.data || ticketsQuery.data.total === 0

    if (ticketsQuery.isLoading) {
        return (
            <Card className="col-span-10 row-span-4 lg:col-span-5 lg:row-span-2 xl:col-span-3 flex px-8 py-4 gap-8 justify-center">
                <div className="flex flex-col gap-5">
                    <Skeleton className="h-10 w-35" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </Card>
        )
    }

    return (
        <>
            <Card className="col-span-10 row-span-4 lg:col-span-5 lg:row-span-2 xl:col-span-3 flex px-8 py-6 gap-8 justify-center">
                <div className="flex gap-5 ">
                    <Calendar size={40} color="#4f46e5" className="px-[10px] py-3 bg-indigo-500/15 rounded-full" />
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-medium text-zinc-600">Chamados dia</span>
                                <DatePicker
                                    date={date ? parseISO(date) : undefined}
                                    setDate={handleDateChange}
                                />
                            </div>
                            <span className="text-2xl font-bold text-zinc-800">{totalTickets}</span>
                        </div>
                        {!isEmpty && (
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1 p-2 rounded-md cursor-pointer hover:bg-muted-foreground/5" onClick={() => setOpenCTDrawer(true)}>
                                    <div className="flex items-start justify-between">
                                        <span className="text-sm text-zinc-700 font-semibold">Encerrados</span>
                                        <span className="text-sm text-zinc-500 font-semibold">{closedTickets} {`(${closedTicketsPercentage.toFixed(1)}%)`}</span>
                                    </div>
                                    <Progress value={closedTicketsPercentage} className="[&>*]:bg-green-500" />
                                </div>
                                <div className="flex flex-col gap-1 p-2 rounded-md cursor-pointer hover:bg-muted-foreground/5" onClick={() => setOpenOTDrawer(true)}>
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

            <OpenTicketsDrawer open={openOTDrawer} onOpenChange={setOpenOTDrawer} start_date={date} end_date={date} />
            <ClosedTicketsDrawer open={openCTDrawer} onOpenChange={setOpenCTDrawer} start_date={date} end_date={date} />
        </>
    )
}