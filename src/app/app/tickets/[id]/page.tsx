import { TicketView } from "@/features/ticket-view/components/ticket-view";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Íris - Visualização de chamado",
};

type Props = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TicketsViewPage({ params }: Props) {
    const { id } = await params;

    return (
        <TicketView ticketId={id} />
    );
}