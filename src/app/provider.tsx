'use client';

import { AuthProvider } from "@/contexts/AuthContext";
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
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    );
}