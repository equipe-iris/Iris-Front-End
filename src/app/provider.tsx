'use client';

import { queryConfig } from "@/lib/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface ProviderProps {
    children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: queryConfig
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

}