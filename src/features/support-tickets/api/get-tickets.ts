import { useQuery } from "@tanstack/react-query";

// import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

import { Ticket } from "@/types/api";
import { api } from "@/lib/api-client";

function getTickets(): Promise<Ticket[]> {
    return api.get("/tickets/processed-tickets", {
        params: {
            start_date: "",
            end_date: "",
        }
    })
}

export function getTicketsQueryOptions() {
    return {
        queryKey: ["tickets"],
        queryFn: getTickets,
    }
}

type UseTicketsOptions = {
    queryConfig?: QueryConfig<typeof getTicketsQueryOptions>
}

export function useTickets({ queryConfig }: UseTicketsOptions = {}) {
    return useQuery({
        ...getTicketsQueryOptions(),
        ...queryConfig,
    })
}   
