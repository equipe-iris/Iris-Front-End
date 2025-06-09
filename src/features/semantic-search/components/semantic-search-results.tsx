"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { useSemanticSearch } from "../api/semantic-search";
import { SemanticSearchCard } from "./semantic-search-card";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { sortTicketsBySimilarity } from "@/lib/utils";

export function SemanticSearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const semanticSearchQuery = useSemanticSearch({
        mutationConfig: {
            onSuccess: () => { },
            onError: (error) => {
                toast.error(
                    "Erro ao trazer os resultados da busca semântica",
                    {
                        description: `${error}`
                    }
                );
            },
        },
    })

    React.useEffect(() => {
        if (query) {
            semanticSearchQuery.mutate(query);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const tickets = semanticSearchQuery.data || [];
    const sortedTickets = sortTicketsBySimilarity(tickets);
    const ticketsCount = tickets.length;

    if (semanticSearchQuery.isPending) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="size-10 animate-spin text-zinc-700" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="font-medium text-zinc-700">
                Exibindo {ticketsCount} resultados para:
                <span className="font-semibold text-zinc-800"> &quot;{query}&quot;</span>
            </h1>

            <div className="flex flex-col gap-4 mt-8">
                {sortedTickets.map((ticket, index) => (
                    <SemanticSearchCard ticket={ticket} key={index} />
                ))}
            </div>
        </div>
    );
}