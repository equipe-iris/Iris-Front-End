"use client";

import { columns } from "./emotion-evolution-drawer-table-columns"
import { useEmotionsTicketsDetails } from "../api/get-emotion-tickets-details";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";

import { TimeRange } from "@/types/api";

interface EmotionsDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    timeRange: TimeRange;
    emotion: string;
}

export function EmotionsDrawer({ open, onOpenChange, timeRange, emotion }: EmotionsDrawerProps) {

    const ticketsQuery = useEmotionsTicketsDetails(timeRange, emotion);
    const tickets = ticketsQuery.data || [];

    const formattedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Emoções dos chamados</DrawerTitle>
                    <DrawerDescription>
                        Chamados classificados como <span className="font-semibold text-zinc-800">{formattedEmotion}</span>, abertos no período selecionado.
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets} />
            </DrawerContent>
        </Drawer>
    )
}