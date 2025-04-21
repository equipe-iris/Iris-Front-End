import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";

export const updateUserSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória").min(6, "Senha deve ter no mínimo 6 caracteres").optional(), 
    role: z.enum(["Admin", "Viewer"], {
        errorMap: () => ({ message: "Selecione um papel" })
    })
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function updateUser(data: UpdateUserSchema): Promise<void> {
    //return api.put(`/update-user/${data.user.id}`, data)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

export type UpdateUserOptions = {
    mutationConfig?: MutationConfig<typeof updateUser>
}

export function useUpdateUser({ mutationConfig }: UpdateUserOptions = {}) {

    const queryClient = useQueryClient()
    const { onSuccess, ...restConfig } = mutationConfig ?? {}

    return useMutation({
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
            onSuccess?.(data, ...args)
        },
        ...restConfig,
        mutationFn: updateUser,
    })
}