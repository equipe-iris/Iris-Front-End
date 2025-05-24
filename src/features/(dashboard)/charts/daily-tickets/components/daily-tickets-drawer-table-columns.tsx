import { ColumnDef } from "@tanstack/react-table";
import { TicketCategoryCell, TicketEmotionCell, TicketStatusCell } from "@/components/tickets-table-cells";
import { Ticket } from "@/types/api";


export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "original_id",
        header: "ID",
        size: 75,
    },
    {
        accessorKey: "title",
        header: "Título",
        size: 180
    },
    {
        accessorKey: "service_rating",
        header: "Categoria",
        size: 100,
        cell: ({ cell }) => {
            const category = cell.getValue<string>();
            return <TicketCategoryCell value={category} />;
        }
    },
    {
        accessorKey: "sentiment_rating",
        header: "Emoção",
        size: 100,
        cell: ({ cell }) => {
            const emotion = cell.getValue<string>();
            return <TicketEmotionCell value={emotion} />;
        }
    },
    {
        accessorKey: "end_date",
        header: "Status",
        size: 100,
        cell: ({ cell }) => {
            const endDate = cell.getValue<string | undefined>();
            return <TicketStatusCell value={endDate} />;
        }

    },
]