import { Header } from "../ui/header";
import { Navbar } from "../ui/navbar";

interface ContentLayoutProps {
    children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
    return (
        <>
            <div className="w-full">
                <Header />
                <Navbar />
            </div>
            <main className="flex justify-center">
                <div className="w-full max-w-[1360px]">
                    {children}
                </div>
            </main>
        </>
    )
}