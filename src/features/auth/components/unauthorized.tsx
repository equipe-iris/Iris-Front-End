"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function Unauthorized() {
    const router = useRouter()

    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="p-10 max-w-[400px]">
                <CardContent className="flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-semibold text-zinc-800">Acesso não autorizado</h1>
                        <p className="text-zinc-600">Somente admnistradores do sistema possuem acesso a esse recurso.</p>
                    </div>
                    <Button className="mt-10" onClick={() => router.replace("/app/dashboard")}>Voltar</Button>
                </CardContent>
            </Card>
        </div>
    )
}