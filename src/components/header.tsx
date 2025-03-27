import Image from "next/image"
import { ChevronDown } from "lucide-react"

function Header() {
    return (
        <>
            <header className="bg-white px-12 py-4 flex items-center justify-between border-b border-zinc-200">
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
                    //lassName="border border-primary rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-700">Bem-vindo(a)</span>
                        <div className="flex items-end gap-1 ">
                            <span className="text-sm font-bold text-zinc-800">Nome do usuário</span>
                            <ChevronDown size={16} className="" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export { Header }