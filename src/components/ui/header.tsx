"use client";

import React from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth"

import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { toast } from "sonner";
import { ChevronDown, LogOut, UserPen } from "lucide-react"
import { UserProfile } from "@/features/users/components/user-profile";
import { SemanticSearchInput } from "@/features/semantic-search/components/semantic-search-input";

function Header() {

    const [openProfile, setOpenProfile] = React.useState(false)

    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout()
            toast.success("Desconectado da conta com sucesso")
            router.push("/auth/login")
        } catch (error) {
            toast.error(`Erro ao fazer logout: ${error}`)
        }
    }

    return (
        <>
            <header className="bg-white w-full px-12 py-4 flex items-center justify-between border-b border-zinc-200">
                <div className="flex items-start gap-20">
                    <Image
                        src="/logo-iris.svg"
                        alt="Íris"
                        width={105}
                        height={36}
                    />
                    <div className="hidden lg:inline">
                        <SemanticSearchInput />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Image
                        src="/avatar.svg"
                        alt="Avatar"
                        width={36}
                        height={36}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-700">Bem-vindo(a)</span>
                        <div className="">
                            <Popover>
                                <PopoverTrigger className="flex items-end gap-1 cursor-pointer">
                                    <span className="text-sm font-bold text-zinc-800 max-w-[100px] truncate">{user?.name ?? "Nome do usuário"}</span>
                                    <ChevronDown size={16} className="" />
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[150px]">
                                    <div className="flex flex-col gap-2">
                                        <span
                                            className="flex items-center gap-2 text-sm font-semibold text-zinc-700 px-2 py-1 hover:bg-muted-foreground/10 rounded-md cursor-pointer"
                                            onClick={() => setOpenProfile(true)}
                                        >
                                            <UserPen size={16} />
                                            Perfil
                                        </span>
                                        <span
                                            className="flex items-center gap-2 text-sm font-semibold text-zinc-700 px-2 py-1 hover:bg-muted-foreground/10 rounded-md cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={16} />
                                            Sair
                                        </span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </header>
            <div className="p-2 lg:hidden">
                <SemanticSearchInput />
            </div>
            <UserProfile open={openProfile} onOpenChange={setOpenProfile} userId={user?.id} />
        </>
    )
}

export { Header }