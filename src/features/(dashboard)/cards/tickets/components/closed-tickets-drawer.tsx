"use client";

import { columns } from "./tickets-drawer-table-columns"
import { useClosedTickets } from "../api/get-closed-tickets";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";

import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ClosedTicketsDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    start_date?: string;
    end_date?: string;
}

export function ClosedTicketsDrawer({ open, onOpenChange, start_date, end_date }: ClosedTicketsDrawerProps) {

    const ticketsQuery = useClosedTickets(start_date, end_date);
    const tickets = ticketsQuery.data || [];

    const formattedDate = start_date ? format(parseISO(start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : undefined;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[600px] md:min-w-[700px] lg:min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Chamados encerrados</DrawerTitle>
                    <DrawerDescription>
                        Chamados que já foram encerrados
                        { formattedDate ? `, abertos no dia ${formattedDate}.` : " em todo o período." }
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets}/>
            </DrawerContent>
        </Drawer>
    )
}