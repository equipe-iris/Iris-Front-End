import { NavItem } from "./navItem"
import { ChartLine, CircleUser } from "lucide-react"

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
                href="/app/users"
            />
        </nav>
    )
}

export { Navbar }