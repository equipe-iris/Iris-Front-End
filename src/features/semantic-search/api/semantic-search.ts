import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Ticket } from '@/types/api';


export const semanticSearch = (query: string): Promise<Ticket[]> => {
    return api.get('/semantic-search', {
        params: {
            query
        }
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