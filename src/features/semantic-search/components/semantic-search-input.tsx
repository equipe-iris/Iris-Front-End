
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

export function SemanticSearchInput() {
    const [query, setQuery] = React.useState("");
    const router = useRouter();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/app/busca?query=${encodeURIComponent(query)}`);
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <div className="flex items-center gap-4">
                <Input
                    className="w-full lg:w-[400px] xl:w-[600px] border-none shadow-none bg-zinc-100/70"
                    placeholder="Realizar uma busca na base de dados..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" className="hover:bg-zinc-400 transition-colors">
                    <Search className="size-4" />
                </Button>
            </div>
        </form>
    );
}