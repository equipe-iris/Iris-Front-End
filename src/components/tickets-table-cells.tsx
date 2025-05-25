import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { View } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";


export function TicketTitleCell({ value }: { value: string }) {
    return (
        <Tooltip delayDuration={700}>
            <TooltipTrigger asChild><p className="truncate w-full cursor-default">{value}</p></TooltipTrigger>
            <TooltipContent><p className="text-base">{value}</p></TooltipContent>
        </Tooltip>
    );
}

// ---------------------------------


const categoryBadgeClass: Record<string, { text: string; color: string }> = {
    "duvida": { text: "Dúvida", color: "bg-amber-500" },
    "reclamacao": { text: "Reclamação", color: "bg-rose-500" },
    "solicitacao": { text: "Solicitação", color: "bg-cyan-500" }
};
export function TicketCategoryCell({ value }: { value: string }) {
    const badgeClass = categoryBadgeClass[value]?.color ?? "bg-gray-500";
    const badgeText = categoryBadgeClass[value]?.text ?? "Desconhecido";

    return (
        <Badge variant="default" className={badgeClass}>{badgeText}</Badge>
    );
}

// ---------------------------------

const emotionBadgeClass: Record<string, string> = {
    "positivo": "bg-green-500/10 text-green-600 border-green-600",
    "neutro": "bg-yellow-500/10 text-yellow-600 border-yellow-600",
    "negativo": "bg-red-500/10 text-red-600 border-red-600",
}
export function TicketEmotionCell({ value }: { value: string }) {
    const badgeClass = emotionBadgeClass[value] ?? "bg-gray-500";
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    return (
        <Badge variant="outline" className={badgeClass} >{capitalizedValue}</Badge>
    )
}

// ---------------------------------

export function TicketStartDateCell({ value }: { value: string }) {
    return <p>{formatDateTime(value)}</p>
}

// ---------------------------------

export function TicketStatusCell({ value }: { value: string | undefined }) {
    return <p>{value ? "Fechado" : "Aberto"}</p>;
}

// ---------------------------------

export function ViewTicketCell({ value }: { value: number }) {
    return (
        <Tooltip delayDuration={700}>
            <TooltipTrigger>
                <Link
                    href={`/app/tickets/${value}`}
                    className="text-zinc-500 hover:text-zinc-600 font-medium transition-colors"
                >
                    <View className="size-4" />
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <p>Visualizar</p>
            </TooltipContent>
        </Tooltip>
    );
}