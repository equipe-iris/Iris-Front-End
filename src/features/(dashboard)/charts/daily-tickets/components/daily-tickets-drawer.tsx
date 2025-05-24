"use client";

import { columns } from "./daily-tickets-drawer-table-columns"
import { useTicketsDetails } from "../api/get-tickets-details";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";

import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DailyTicketsDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    start_date?: string;
}

export function DailyTicketsDrawer({ open, onOpenChange, start_date }: DailyTicketsDrawerProps) {

    
    const ticketsQuery = useTicketsDetails(start_date, start_date);
    const tickets = ticketsQuery.data || [];
    
    const formattedDate = start_date ? format(parseISO(start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : undefined;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Chamados diários</DrawerTitle>
                    <DrawerDescription>
                        Chamados que foram abertos no dia {formattedDate}
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets} />
            </DrawerContent>
        </Drawer>
    )
}