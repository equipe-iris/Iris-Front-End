"use client";

import { columns } from "./category-drawer-table-columns"
import { useCategoriesTicketsDetails } from "../api/get-category-tickets-details";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DataTable } from "@/components/data-table";

import { TimeRange } from "@/types/api";

interface CategoryDrawerProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    timeRange: TimeRange;
    category: string;
}


const categories: Record<string, { text: string }> = {
    "duvida": { text: "Dúvida" },
    "reclamacao": { text: "Reclamação" },
    "solicitacao": { text: "Solicitação" }
};

export function CategoryDrawer({ open, onOpenChange, timeRange, category }: CategoryDrawerProps) {

    const ticketsQuery = useCategoriesTicketsDetails(timeRange, category);
    const tickets = ticketsQuery.data || [];

    const formattedCategory = categories[category]?.text || category.charAt(0).toUpperCase() + category.slice(1);
    
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="min-w-[1000px] w-fit p-8 flex flex-col gap-10">
                <DrawerHeader className="p-0">
                    <DrawerTitle>Emoções dos chamados</DrawerTitle>
                    <DrawerDescription>
                        Chamados classificados como <span className="font-semibold text-zinc-800">{formattedCategory}</span>, abertos no período selecionado.
                    </DrawerDescription>
                </DrawerHeader>
                <DataTable columns={columns} data={tickets} />
            </DrawerContent>
        </Drawer>
    )
}