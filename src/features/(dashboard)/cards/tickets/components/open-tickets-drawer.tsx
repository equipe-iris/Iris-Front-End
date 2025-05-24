"use client";

import { useOpenTickets } from "../api/get-open-tickets";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";
import { columns } from "./tickets-drawer-table-columns"

import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface OpenTicketsDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    start_date?: string;
    end_date?: string;
}

export function OpenTicketsDrawer({ open, onOpenChange, start_date, end_date }: OpenTicketsDrawerProps) {

    const ticketsQuery = useOpenTickets(start_date, end_date);
    const tickets = ticketsQuery.data || [];

    const formattedDate = start_date ? format(parseISO(start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : undefined;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Chamados em aberto</DrawerTitle>
                    <DrawerDescription>
                        Chamados que não foram encerrados
                        {start_date ? `, abertos no dia ${formattedDate}.` : " em todo o período."}
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets} />
            </DrawerContent>
        </Drawer>
    )
}