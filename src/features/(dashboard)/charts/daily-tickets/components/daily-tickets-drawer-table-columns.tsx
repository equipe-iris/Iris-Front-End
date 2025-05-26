import { ColumnDef } from "@tanstack/react-table";
import { TicketCategoryCell, TicketEmotionCell, TicketStatusCell, TicketTitleCell, ViewTicketCell } from "@/components/tickets-table-cells";
import { Ticket } from "@/types/api";


export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "original_id",
        header: "ID",
        size: 100,
    },
    {
        accessorKey: "title",
        header: "Título",
        size: 180,
        cell: ({ cell }) => {
            const title = cell.getValue<string>();
            return <TicketTitleCell value={title} />;
        }
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
    {
        accessorKey: "id",
        header: "",
        size: 75,
        cell: ({ cell }) => {
            const id = cell.getValue<number>();
            return <ViewTicketCell value={id} />
        }
    }
]