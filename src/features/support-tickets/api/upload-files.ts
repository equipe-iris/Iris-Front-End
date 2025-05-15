import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getPendingFilesQueryOptions } from './get-pending-files';
import { getTodayTicketsQueryOptions } from '@/features/(dashboard)/cards/tickets/api/get-today-tickets';
import { getTotalTicketsQueryOptions } from '@/features/(dashboard)/cards/tickets/api/get-total-tickets';
import { getAHTQueryOptions } from '@/features/(dashboard)/charts/average-time-handling/api/get-average-time-handling';
import { getTicketsCategorizationQueryOptions } from '@/features/(dashboard)/charts/categorization/api/get-tickets-categorization';
import { getEmotionScoreQueryOptions } from '@/features/(dashboard)/charts/emotion-score/api/get-emotion-score';
import { getEmotionScoreEvolutionQueryOptions } from '@/features/(dashboard)/charts/emotion-score/api/get-emotion-score-evolution';
import { getTicketsQueryOptions } from './get-tickets';


export const ticketsUploadSchema = z.object({
    tickets: z.array(z.instanceof(File)).min(1, "Selecione pelo menos um arquivo")
});

export type TicketsUploadSchema = z.infer<typeof ticketsUploadSchema>;

export const uploadTicketsFile = ({ data }: { data: TicketsUploadSchema }): Promise<void> => {
    const formData = new FormData()
    data.tickets.forEach((file) => {
        formData.append('file', file)
    })

    return api.post('/predict', formData);
};

type UploadTicketsFileOptions = {
    mutationConfig?: MutationConfig<typeof uploadTicketsFile>;
};

export const useUploadTicketsFile = ({ mutationConfig }: UploadTicketsFileOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};


    return useMutation({
        onSuccess: (...args) => {
            [
                getPendingFilesQueryOptions(),
                getTodayTicketsQueryOptions(),
                getTotalTicketsQueryOptions(),
                getAHTQueryOptions("7d"),
                getTicketsCategorizationQueryOptions(),
                getEmotionScoreQueryOptions("today"),
                getEmotionScoreEvolutionQueryOptions("7d"),
                getTicketsQueryOptions()
            ]
                .forEach((queryOptions) => {
                    queryClient.refetchQueries({
                        queryKey: queryOptions.queryKey,
                    });
                });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: uploadTicketsFile
    });
};