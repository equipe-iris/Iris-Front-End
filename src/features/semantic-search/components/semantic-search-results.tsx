"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { useSemanticSearch } from "../api/semantic-search";
import { SemanticSearchCard } from "./semantic-search-card";

import { toast } from "sonner";

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

    return (
        <div>
            <h1 className="font-medium text-zinc-700">
                Exibindo resultados para:
                <span className="font-semibold text-zinc-800"> &quot;{query}&quot;</span>
            </h1>

            <div className="flex flex-col gap-4 mt-8">
                {tickets.map((ticket, index) => (
                    <SemanticSearchCard ticket={ticket} key={index} />
                ))}
            </div>
        </div>
    );
}