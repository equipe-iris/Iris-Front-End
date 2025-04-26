import { useQuery } from "@tanstack/react-query";

// import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

import { Ticket } from "@/features/support-tickets/components/tickets-table-columns";


export const TICKETS_MOCK: Ticket[] = Array.from({ length: 40 }, (_, index) => {
    const serviceRatings = ["Suporte", "Dúvida", "Reclamação"];
    const emotionRatings = ["Positivo", "Neutro", "Negativo"];
    const startDates = [
        "01/01/2023 08:00",
        "15/02/2023 09:30",
        "10/03/2023 14:45",
        "20/04/2023 16:00",
        "05/05/2023 10:15",
        "18/06/2023 11:00",
        "25/07/2023 13:30",
        "30/08/2023 15:00",
        "12/09/2023 17:45",
        "01/10/2023 08:30",
    ];
    const endDates = [
        "02/01/2023 10:00",
        "16/02/2023 11:30",
        "11/03/2023 16:45",
        "21/04/2023 18:00",
        "06/05/2023 12:15",
        "19/06/2023 13:00",
        "26/07/2023 15:30",
        "31/08/2023 17:00",
        "13/09/2023 19:45",
        "02/10/2023 10:30",
    ];

    const isClosed = Math.random() > 0.5; // Randomly decide if the ticket is closed

    return {
        original_id: (index + 1).toString(),
        title: `Ticket ${index + 1}`,
        service_rating: serviceRatings[Math.floor(Math.random() * serviceRatings.length)],
        sentiment_rating: emotionRatings[Math.floor(Math.random() * emotionRatings.length)],
        start_date: startDates[index % startDates.length],
        end_date: isClosed ? endDates[index % endDates.length] : undefined, // Add end_date if closed
    };
});

function getTickets(): Promise<Ticket[]> {
    //return api.get("/tickets/processed-tickets")
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(TICKETS_MOCK)
        }, 1000)
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
