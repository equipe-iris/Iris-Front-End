import { useMutation } from '@tanstack/react-query';

//import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Ticket } from '@/types/api';

const SEMANTIC_SEARCH_MOCK: Ticket[] = [
    {
        id: 1,
        original_id: 'SUS-123456',
        title: 'Problema com o sistema de login',
        service_rating: 'reclamacao',
        sentiment_rating: 'negativo',
        start_date: '2023-10-01T10:00:00Z',
        in_charge: 'João Silva',
        score: "85%",
        content: "Estou tendo dificuldades para acessar minha conta. O sistema não aceita minha senha e não consigo redefini-la.",
    },
    {
        id: 2,
        original_id: 'SUS-123457',
        title: 'Dúvida sobre o funcionamento do sistema',
        service_rating: 'duvida',
        sentiment_rating: 'neutro',
        start_date: '2023-10-02T11:00:00Z',
        in_charge: 'Maria Oliveira',
        score: "75.4%",
        content: "Gostaria de entender melhor como funciona a integração com o sistema de pagamentos. Poderiam me ajudar?",
    },
    {
        id: 3,
        original_id: 'SUS-123458',
        title: 'Solicitação de melhoria no sistema',
        service_rating: 'solicitacao',
        sentiment_rating: 'positivo',
        start_date: '2023-10-03T12:00:00Z',
        in_charge: 'Carlos Pereira',
        score: "62.9%",
        content: "Seria interessante adicionar uma funcionalidade de exportação de dados em PDF. Isso facilitaria muito nosso trabalho.",
    },
]

export const semanticSearch = (query: string): Promise<Ticket[]> => {
    console.log('query', query);
    if (!query) return Promise.resolve([]);
    // return api.post('/semantic-search', {
    //     params: {
    //         query
    //     }
    // });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(SEMANTIC_SEARCH_MOCK);
        }, 1000);
    });
};

type SemanticSearchOptions = {
    mutationConfig?: MutationConfig<typeof semanticSearch>;
};

export const useSemanticSearch = ({ mutationConfig }: SemanticSearchOptions = {}) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: async (...args) => {
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: semanticSearch
    });
};