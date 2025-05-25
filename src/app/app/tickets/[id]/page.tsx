import { TicketView } from "@/features/ticket-view/components/ticket-view";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Íris - Visualização de chamado",
}

export default async function TicketsViewPage({ params }: { params: { id: string } }) {

    const { id } = await params;

    return (
        <TicketView ticketId={id} />
    )
}