import { useQuery } from "@tanstack/react-query";

// import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

import { Ticket } from "@/features/support-tickets/components/tickets-table-columns";


export const TICKETS_MOCK: Ticket[] = Array.from({ length: 40 }, (_, index) => {
    const serviceRatings = ["Suporte", "Dúvida", "Reclamação"];
    const emotionRatings = ["Positivo", "Neutro", "Negativo"];
    const statuses = ["Aberto", "Finalizado"];
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

    return {
        id: (index + 1).toString(),
        title: `Ticket ${index + 1}`,
        service_rating: serviceRatings[Math.floor(Math.random() * serviceRatings.length)],
        emotion_rating: emotionRatings[Math.floor(Math.random() * emotionRatings.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        start_date: startDates[index % startDates.length],
    };
});

function getTickets(): Promise<Ticket[]> {
    //return api.get("/users")
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
