import { ImportedFilesList } from "@/features/support-tickets/components/imported-files-list";
import { TicketsUploader } from "@/features/support-tickets/components/tickets-uploader";

export default function ImportTicketsPage() {
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <TicketsUploader/>
            <ImportedFilesList/>
        </div>
    )
}