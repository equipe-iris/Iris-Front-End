"use client";

import { formatDateTime, formatTicketHandlingTime, splitTicketMessages } from "@/lib/utils";
import { useTicketDetails } from "../api/get-ticket-details";
import { TicketCategoryCell, TicketEmotionCell } from "@/components/tickets-table-cells";
import { Badge } from "@/components/ui/badge";
import { CircleHelp, Sparkles } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { BackButton } from "@/components/back-button";

interface TicketViewProps {
    ticketId: string | number;
}



export function TicketView({ ticketId }: TicketViewProps) {

    const ticketDetailsQuery = useTicketDetails(ticketId);
    const ticketDetails = ticketDetailsQuery.data;

    const status = ticketDetails?.end_date ? "Fechado" : "Em Aberto";
    const messages = ticketDetails?.content ? splitTicketMessages(ticketDetails.content) : [];
    const firstMessage = messages.length > 0 ? messages[0] : null;
    const hasInteractions = messages.length > 1;

    if (ticketDetailsQuery.isPending) {
        return (
            <div className="flex flex-col gap-4">
                <BackButton />
                <Skeleton className="h-12 w-[80%] bg-zinc-200 rounded-md" />
                <Skeleton className="h-96 w-full bg-zinc-200 rounded-md" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <BackButton />
            <div className="bg-white flex flex-col gap-12 rounded-xl p-10 shadow-sm">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 text-2xl">
                            <span className="font-semibold">{ticketDetails?.original_id} -</span>
                            <span className="font-medium text-zinc-700">{ticketDetails?.title}</span>
                        </div>
                        <Badge variant="secondary">{status}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <span className="text-zinc-500 min-w-[84px]">Aberto em:</span>
                            <span className="text-zinc-700">{formatDateTime(ticketDetails?.start_date)}</span>
                        </div>
                        {ticketDetails?.end_date && (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <span className="text-zinc-500 min-w-[84px]">Fechado em:</span>
                                    <span className="text-zinc-700">{formatDateTime(ticketDetails?.end_date)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <span className="text-zinc-500 min-w-[84px]">Tempo para encerramento:</span>
                                    <span className="text-zinc-700">
                                        {formatTicketHandlingTime(ticketDetails.start_date, ticketDetails.end_date)}
                                    </span>
                                </div>
                            </div>
                        )}
                        {ticketDetails?.in_charge && (
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <span className="text-zinc-500 min-w-[84px]">Responsável:</span>
                                <span className="text-zinc-700">{ticketDetails.in_charge}</span>
                            </div>
                        )}
                        <div className="mt-8 flex flex-col gap-2">
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <span className="text-zinc-500 min-w-[84px]">Categoria:</span>
                                <TicketCategoryCell value={ticketDetails?.service_rating ? ticketDetails.service_rating : ""} />
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <span className="text-zinc-500 min-w-[84px]">Emoção:</span>
                                <TicketEmotionCell value={ticketDetails?.sentiment_rating ? ticketDetails.sentiment_rating : ""} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="flex flex-col gap-15">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-xl font-semibold">
                            <span className="bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">Resumo</span>
                            <Sparkles className="text-teal-500" />
                            <Tooltip>
                                <TooltipTrigger>
                                    {/* <span className="px-2 py-1 rounded-full bg-zinc-200 text-zinc-700 text-xs font-semibold">?</span> */}
                                    <CircleHelp className="size-4 text-zinc-500 font-medium ml-5" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Sumarização do conteúdo do chamado gerado por inteligência artificial</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="p-10 text-center rounded-lg bg-zinc-50 border border-zinc-100">
                            <p className="text-zinc-600 text-sm">
                                {ticketDetails?.summary ? ticketDetails.summary : "Nenhum resumo disponível."}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <span className="text-xl font-semibold text-zinc-700">Conteúdo</span>
                        <div className="p-10 rounded-lg bg-zinc-50 border border-zinc-100">
                            <p className="text-zinc-600 text-sm">
                                {firstMessage ? firstMessage : ""}
                            </p>
                        </div>
                        {hasInteractions ? (
                            <div className="flex flex-col gap-6">
                                <span className="text-zinc-600 font-semibold">Interações</span>
                                <div className="flex flex-col gap-10 overflow-y-auto min-h-0 max-h-[280px]">
                                    {messages.slice(1).map((message, index) => (
                                        <div key={index} className="p-10 rounded-lg bg-zinc-50 border border-zinc-100">
                                            <p className="text-zinc-600 text-sm mb-4">
                                                {message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm font-medium text-zinc-600">Não há interações neste chamado</p>
                        )}
                    </div>
                </div>
            </div >
        </div>
    )
}