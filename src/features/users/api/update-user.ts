import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import { getUsersQueryOptions } from "./get-users";

export const updateUserSchema = z.object({
    id: z.string().min(1, "ID é obrigatório"),
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z
        .string()
        .optional()
        .refine((value) => !value || value.length >= 6, {
            message: "Senha deve ter no mínimo 6 caracteres",
        }),
    role: z.enum(["ADMIN", "VIEWER"], {
        errorMap: () => ({ message: "Selecione um papel" })
    })
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export function updateUser(data: UpdateUserSchema): Promise<void> {
    return api.put(`/users/${data.id}`, data)
}

export type UpdateUserOptions = {
    mutationConfig?: MutationConfig<typeof updateUser>
}

export function useUpdateUser({ mutationConfig }: UpdateUserOptions = {}) {

    const queryClient = useQueryClient()
    const { onSuccess, ...restConfig } = mutationConfig ?? {}

    return useMutation({
        onSuccess: (data, ...args) => {
            queryClient.refetchQueries({
                queryKey: getUsersQueryOptions().queryKey,
            })
            onSuccess?.(data, ...args)
        },
        ...restConfig,
        mutationFn: updateUser,
    })
}