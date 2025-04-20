import ContentLayout from "@/components/layouts/content-layout";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-22">
            <ContentLayout>
                {children}
            </ContentLayout>
        </div>
    );
}