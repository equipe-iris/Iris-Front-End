"use client";

import { columns } from "./average-handling-time-drawer-table-columns"
import { useTicketsDetailsByMonth } from "../api/get-tickets-details-by-month";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";

import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AHTDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    date?: string;
}

export function AHTDrawer({ open, onOpenChange, date }: AHTDrawerProps) {

    const month = date ? format(parseISO(date), "MM/yyyy") : "";

    const ticketsQuery = useTicketsDetailsByMonth(month);
    const tickets = ticketsQuery.data || [];
    
    const formattedDate = date ? format(parseISO(date), "MMMM 'de' yyyy", { locale: ptBR }) : undefined;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Chamados por mês</DrawerTitle>
                    <DrawerDescription>
                        Chamados que foram abertos em {formattedDate}
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets} />
            </DrawerContent>
        </Drawer>
    )
}