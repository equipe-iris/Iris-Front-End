"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

import { MoveLeft } from "lucide-react";

function BackButton() {
    const router = useRouter()

    return (
        <Button
            variant="ghost"
            onClick={() => router.back()}
            className="font-medium text-base text-zinc-800 flex items-center"
        >
            <MoveLeft size={20} className="mr-1" />
            Voltar
        </Button>
    )
}

export { BackButton };