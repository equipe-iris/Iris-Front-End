import { Badge } from "@/components/ui/badge";

const categoryBadgeClass: Record<string, string> = {
    "duvida": "bg-teal-500",
    "reclamacao": "bg-indigo-500",
    "solicitacao": "bg-cyan-500"
};
export function TicketCategoryCell({ value }: { value: string }) {
    const badgeClass = categoryBadgeClass[value] ?? "bg-gray-500";
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    return (
        <Badge variant="default" className={badgeClass}>{capitalizedValue}</Badge>
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

export function TicketStatusCell({ value }: { value: string | undefined }) {
    return <p>{value ? "Fechado" : "Aberto"}</p>;
}