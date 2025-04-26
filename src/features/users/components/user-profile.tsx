"use client";

import { useUser } from "../api/get-user";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UpdateUserForm } from "./update-user-form";

import { Loader2 } from "lucide-react"

interface UserProfileProps {
    userId: string | undefined
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UserProfile({ userId = "0", open, onOpenChange }: UserProfileProps) {

    const userQuery = useUser({ userId })
    const user = userQuery.data

    const isLoading = userQuery.isPending

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogTitle>Perfil de usuário</DialogTitle>
                <DialogDescription hidden>Visualizar os dados atuais de um usuário</DialogDescription>
                {isLoading ? (
                    <div className="w-full h-72 flex items-center justify-center">
                        <Loader2 className="size-20 animate-spin text-zinc-700" />
                    </div>
                ) : (
                    <UpdateUserForm user={user} />

                )}
            </DialogContent>
        </Dialog>
    )
}