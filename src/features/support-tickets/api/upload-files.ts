import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getPendingFilesQueryOptions } from './get-pending-files';
import { getTodayTicketsQueryOptions } from '@/features/(dashboard)/cards/tickets/api/get-today-tickets';
import { getTotalTicketsQueryOptions } from '@/features/(dashboard)/cards/tickets/api/get-total-tickets';
import { getAHTQueryOptions } from '@/features/(dashboard)/charts/average-time-handling/api/get-average-time-handling';
import { getTicketsCategorizationQueryOptions } from '@/features/(dashboard)/charts/categorization/api/get-tickets-categorization';
import { getEmotionsQueryOptions } from '@/features/(dashboard)/charts/emotions/api/get-emotions';
import { getEmotionEvolutionQueryOptions } from '@/features/(dashboard)/charts/emotions/api/get-emotion-evolution';
import { getTicketsQueryOptions } from './get-tickets';
import { getProcessedFilesQueryOptions } from './get-processed-files';
import { sleep } from '@/lib/utils';
import { getDailyTicketsQueryOptions } from '@/features/(dashboard)/charts/daily-tickets/api/get-daily-tickets';


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
        onMutate: async () => {
            await sleep(10000);
            await queryClient.invalidateQueries({ queryKey: getPendingFilesQueryOptions().queryKey });
        },
        onSuccess: async (...args) => {
            const queriesToInvalidate = [
                getPendingFilesQueryOptions(),
                getProcessedFilesQueryOptions(),
                getTodayTicketsQueryOptions(),
                getTotalTicketsQueryOptions(),
                getAHTQueryOptions(12),
                getTicketsCategorizationQueryOptions("all"),
                getEmotionsQueryOptions("all"),
                getEmotionEvolutionQueryOptions("90d"),
                getTicketsQueryOptions(),
                getDailyTicketsQueryOptions("90d"),
            ];
            await Promise.all(
                queriesToInvalidate.map((queryOptions) => {
                    queryClient.invalidateQueries({ queryKey: queryOptions.queryKey });
                })
            );
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: uploadTicketsFile
    });
};