import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getUsersQueryOptions } from "./get-users";

export const createUserSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
    role: z.enum(["Admin", "Viewer"], {
        errorMap: () => ({ message: "Selecione um papel" })
    })
})

export type CreateUserSchema = z.infer<typeof createUserSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createUser(data: CreateUserSchema): Promise<void> {
    //return api.post("/users", data)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

export type CreateUserOptions = {
    mutationConfig?: MutationConfig<typeof createUser>
}

export function useCreateUser({ mutationConfig }: CreateUserOptions = {}) {
    const queryClient = useQueryClient()
    const { onSuccess, ...restConfig } = mutationConfig ?? {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getUsersQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createUser,

    })
}

