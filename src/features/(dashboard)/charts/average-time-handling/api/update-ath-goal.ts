import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getAHTGoalQueryOptions } from './get-ath-goal';


export const updateATHGoalSchema = z.object({
    ath_hours: z.coerce.number().optional(),
    ath_minutes: z.coerce.number().min(0, "Minutos devem ser maior que 0").max(59, "Máximo de 59 minutos").optional(),
});

export type UpdateATHGoalSchema = z.infer<typeof updateATHGoalSchema>;

export const updateATHGoal = (data: UpdateATHGoalSchema): Promise<void> => {
    const athInMinutes = (data.ath_hours || 0) * 60 + (data.ath_minutes || 0);

    return api.put('/settings/update-ast-goal', {
        ast_goal: athInMinutes
    });
};

type UpdateATHGoalOptions = {
    mutationConfig?: MutationConfig<typeof updateATHGoal>;
};

export const useUpdateATHGoal = ({ mutationConfig }: UpdateATHGoalOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};


    return useMutation({
        onSuccess: async (...args) => {
            await queryClient.invalidateQueries({ queryKey: getAHTGoalQueryOptions().queryKey });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: updateATHGoal
    });
};