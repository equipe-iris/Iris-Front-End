import { Badge } from "@/components/ui/badge";

const categoryBadgeClass: Record<string, string> = {
    "Dúvida": "bg-teal-500",
    "Reclamação": "bg-indigo-500",
    "Suporte": "bg-cyan-500"
};
export function TicketCategoryCell({ value }: { value: string }) {
    const badgeClass = categoryBadgeClass[value] ?? "bg-gray-500";

    return (
        <Badge variant="default" className={badgeClass}>{value}</Badge>
    );
}

// ---------------------------------

const emotionBadgeClass: Record<string, string> = {
    "Positivo": "bg-green-500/10 text-green-600 border-green-600",
    "Neutro": "bg-yellow-500/10 text-yellow-600 border-yellow-600",
    "Negativo": "bg-red-500/10 text-red-600 border-red-600",
}
export function TicketEmotionCell({ value }: { value: string }) {
    const badgeClass = emotionBadgeClass[value] ?? "bg-gray-500";

    return (
        <Badge variant="outline" className={badgeClass} >{value}</Badge>
    )
}