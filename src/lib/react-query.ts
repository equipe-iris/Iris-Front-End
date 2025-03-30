import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig = {
    queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60 * 2, // 2 minutes
        retry: false,
        staleTime: 1000 * 60 * 2, 
    }
} satisfies DefaultOptions