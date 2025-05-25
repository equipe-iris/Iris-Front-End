import { Ticket } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const mockTicket: Ticket = {
    id: 1,
    original_id: "SUS-2022",
    title: "Exclusão de Usuário Sistema Point Service",
    service_rating: "solicitacao",
    sentiment_rating: "neutro",
    start_date: "2023-10-01T12:00:00Z",
    end_date: "2023-10-02T12:00:00Z",
    content: "Olá, gostaria de solicitar a exclusão de um usuário dos sistemas da empresa. Seguem os dados: Nome: João Silva E-mail: joao.silva@empresa.com Agradeço a ajuda! | Olá! Claro, posso ajudar com isso. Para prosseguir, poderia me informar o motivo da exclusão do usuário João? | O João não faz mais parte da nossa equipe e precisamos remover seu acesso a todos os sistemas por questões de segurança. | Usuário removido do sistema.",
    summary: "Solicitação de exclusão de um usuário do sistema",
    in_charge: "Carlos Silva",
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTicketDetails(id: number | string): Promise<Ticket> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTicket);
        }, 1000);
    });

    // return api.get<Ticket>(`/tickets/${id}`)
}

function getTicketDetailsQueryOptions(id: number | string) {
    return {
        queryKey: ["ticket", id],
        queryFn: () => getTicketDetails(id),
        refetchOnWindowFocus: false,
    };
}

export function useTicketDetails(id: number | string) {
    return useQuery(getTicketDetailsQueryOptions(id));
}