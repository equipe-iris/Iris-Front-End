import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getPendingFilesQueryOptions } from './get-pending-files';


export const ticketsUploadSchema = z.object({
    tickets: z.array(z.instanceof(File)).min(1, "Selecione pelo menos um arquivo")
});

export type TicketsUploadSchema = z.infer<typeof ticketsUploadSchema>;

export const uploadTicketsFile = ({ data }: { data: TicketsUploadSchema }): Promise<void> => {
    const formData = new FormData()
    data.tickets.forEach((file) => {
        formData.append('file', file)
    })

    return api.post('/preprocessing/upload-dataset', formData);
};

type UploadTicketsFileOptions = {
    mutationConfig?: MutationConfig<typeof uploadTicketsFile>;
};

export const useUploadTicketsFile = ({ mutationConfig }: UploadTicketsFileOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.refetchQueries({
                queryKey: getPendingFilesQueryOptions().queryKey
            })
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: uploadTicketsFile
    });
};