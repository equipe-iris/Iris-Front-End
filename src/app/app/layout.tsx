import ContentLayout from "@/components/layouts/content-layout";
import { Authorization } from "@/features/auth/components/authorization";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-22">
            <Authorization>
                <ContentLayout>
                    {children}
                </ContentLayout>
            </Authorization>
        </div>
    );
}