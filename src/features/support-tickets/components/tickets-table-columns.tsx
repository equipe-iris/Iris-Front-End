import { ColumnDef } from "@tanstack/react-table";
import { TicketCategoryCell, TicketEmotionCell, TicketStatusCell } from "./tickets-table-cells";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export type Ticket = {
    original_id: string;
    title: string;
    service_rating: string;
    sentiment_rating: string;
    start_date: string;
    end_date?: string;
}

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "original_id",
        header: "ID",
        size: 75,
    },
    {
        accessorKey: "title",
        header: "Título",
        size: 300
    },
    {
        accessorKey: "service_rating",
        header: "Categoria",
        cell: ({ cell }) => {
            const category = cell.getValue<string>();
            return <TicketCategoryCell value={category} />;
        }
    },
    {
        accessorKey: "sentiment_rating",
        header: "Emoção",
        cell: ({ cell }) => {
            const emotion = cell.getValue<string>();
            return <TicketEmotionCell value={emotion} />;
        }
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => {
            const sorted = column.getIsSorted();
            let Icon = ArrowUpDown;
            if (sorted === "asc") Icon = ArrowUp;
            if (sorted === "desc") Icon = ArrowDown;

            return (
                <div className="flex items-center gap-2">
                    <span>Data de abertura</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Ordenar por data de abertura"
                        onClick={() => {
                            if (sorted === "desc") {
                                column.clearSorting();
                            } else {
                                column.toggleSorting();
                            }
                        }}
                    >
                        <Icon className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "end_date",
        header: "Status",
        cell: ({ cell }) => {
            const endDate = cell.getValue<string | undefined>();
            return <TicketStatusCell value={endDate} />;
        }

    },
]