"use client";

import { useRouter } from "next/navigation";

import { TicketCategoryCell } from "@/components/tickets-table-cells";

import { formatDateTime, splitTicketMessages } from "@/lib/utils";
import { Ticket } from "@/types/api";

interface SemanticSearchCardProps {
    ticket: Ticket
}

export function SemanticSearchCard({ ticket }: SemanticSearchCardProps) {

    const router = useRouter();
    const contentPreview = splitTicketMessages(ticket.content || "");

    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-zinc-500">Similaridade: {ticket.score}</span>
            <div
                className="flex flex-col md:flex-row gap-4 md:gap-10 justify-between bg-white rounded-lg shadow-md p-4 md:p-6 cursor-pointer hover:bg-zinc-50/10 transition-colors"
                onClick={() => router.push(`/app/tickets/${ticket.id}`)}
            >
                <div className="flex flex-col gap-2 max-w-full md:max-w-[680px]">
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-zinc-800">
                        <span className="truncate">{ticket.original_id} - </span>
                        <span className="truncate">{ticket.title}</span>
                    </div>
                    <p className="text-sm break-words">{contentPreview}</p>
                    <span className="text-sm font-medium text-zinc-500">
                        Aberto em: <span className="text-zinc-600">{formatDateTime(ticket.start_date)}</span>
                    </span>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                    <span className="font-medium text-zinc-500">Responsável</span>
                    <span className="truncate">{ticket.in_charge}</span>
                </div>
                <div className="flex items-center justify-start min-w-[120px] md:min-w-[168px]">
                    <TicketCategoryCell value={ticket.service_rating} />
                </div>
            </div>
        </div>
    )

}