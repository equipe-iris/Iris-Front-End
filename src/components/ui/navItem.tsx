import Link from "next/link"

interface NavItemProps {
    icon: React.ReactNode
    label: string
    href: string
}

function NavItem({ icon, label, href }: NavItemProps) {
    return (
        <Link
            href={href}
            className="flex px-3 py-2 items-center gap-2 hover:bg-zinc-200/30 rounded-md transition-colors"
        >
            {icon}
            <span className="text-sm font-medium text-zinc-800">{label}</span>
        </Link>
    )
}

export { NavItem }