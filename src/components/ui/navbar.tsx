import { NavItem } from "./navItem"
import { ChartLine, CircleUser, FileDown, Text } from "lucide-react"

function Navbar() {
    return (
        <nav className="bg-white w-full px-4 py-2 flex items-center gap-3 shadow-md">
            <NavItem
                icon={<ChartLine size={20} />}
                label="Dashboard"
                href="/app/dashboard"
            />
            <NavItem
                icon={<CircleUser size={20} />}
                label="Usuários"
                href="/app/users/list"
            />
            <NavItem 
                icon={<Text size={20} />}
                label="Chamados"
                href="/app/tickets/list"
            />
            <NavItem 
                icon={<FileDown size={20} />}
                label="Importações"
                href="/app/tickets/import"
            />
        </nav>
    )
}

export { Navbar }