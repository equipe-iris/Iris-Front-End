import { SemanticSearchResults } from "@/features/semantic-search/components/semantic-search-results";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Íris - Resultados da busca semântica",
}

export default function SemanticSearchPage() {
    return (
        <SemanticSearchResults />
    );
}