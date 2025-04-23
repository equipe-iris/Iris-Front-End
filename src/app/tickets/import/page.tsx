import { ImportedFilesList } from "@/features/support-tickets/components/imported-files-list";
import { PendingFilesList } from "@/features/support-tickets/components/pending-files-list";
import { TicketsUploader } from "@/features/support-tickets/components/tickets-uploader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Íris - Importação de chamados",
    description: "Importe novos chamados para o sistema",
};

export default function ImportTicketsPage() {
    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <TicketsUploader/>
            <PendingFilesList/>
            <ImportedFilesList/>
        </div>
    )
}