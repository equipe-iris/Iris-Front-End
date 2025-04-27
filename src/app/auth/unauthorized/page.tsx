import { Metadata } from "next";

import { Unauthorized } from "@/features/auth/components/unauthorized";

export const metadata: Metadata = {
    title: "Íris - Acesso não autorizado",
}

export default function UnauthorizedPage() {
    return (
        <Unauthorized/>
    )
}