import { Badge } from "@/components/ui/badge";

const userRoleBadgeClass: Record<string, string> = {
    "ADMIN": "bg-black",
    "VIEWER": "bg-gray-500"
};
export function UserRoleCell({ value }: { value: string }) {
    const badgeClass = userRoleBadgeClass[value] ?? "bg-gray-500";

    return (
        <Badge variant="default" className={badgeClass}>{value}</Badge>
    );
}