"use client";

import Image from "next/image"
import { ChevronDown, LogOut, UserPen } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Header() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout()
            router.push("/auth/login")
        } catch (error) {
            toast.error(`Erro ao fazer logout: ${error}`)
        }
    }

    return (
        <>
            <header className="bg-white w-full px-12 py-4 flex items-center justify-between border-b border-zinc-200">
                <Image
                    src="/logo-iris.svg"
                    alt="Íris"
                    width={105}
                    height={36}
                />
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
                                    <span className="text-sm font-bold text-zinc-800">{user?.name ?? "Nome do usuário"}</span>
                                    <ChevronDown size={16} className="" />
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[150px]">
                                    <div className="flex flex-col gap-2">
                                        <span className="flex items-center gap-2 text-sm font-semibold text-zinc-700 px-2 py-1 hover:bg-muted-foreground/10 rounded-md cursor-pointer">
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
        </>
    )
}

export { Header }