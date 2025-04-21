import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { getUsersQueryOptions } from "./get-users";

export const createUserSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    role: z.enum(["Admin", "Viewer"], {
        errorMap: () => ({ message: "Selecione um papel" })
    })
})

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export function createUser(data: CreateUserSchema) {
    //return api.post("/create-user", data)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
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
        onSuccess: (...args: any) => {
            queryClient.invalidateQueries({
                queryKey: getUsersQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createUser,

    })
}

