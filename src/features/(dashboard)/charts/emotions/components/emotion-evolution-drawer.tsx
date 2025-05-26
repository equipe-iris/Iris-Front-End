"use client";

import { columns } from "./emotion-evolution-drawer-table-columns"
import { useEmotionEvolutionTicketsDetails } from "../api/get-emotion-evolution-tickets-details";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";

import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EmotionEvolutionDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    start_date?: string;
}

export function EmotionEvolutionDrawer({ open, onOpenChange, start_date }: EmotionEvolutionDrawerProps) {

    
    const ticketsQuery = useEmotionEvolutionTicketsDetails(start_date, start_date);
    const tickets = ticketsQuery.data || [];
    
    const formattedDate = start_date ? format(parseISO(start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : undefined;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[600px] md:min-w-[700px] lg:min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Emoções dos chamados</DrawerTitle>
                    <DrawerDescription>
                        Chamados que foram abertos no dia {formattedDate}
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets} />
            </DrawerContent>
        </Drawer>
    )
}