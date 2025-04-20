import { z } from "zod"

import { api } from "./api-client"

export const loginSchema = z.object({
    email: z.string().email("Digite um email válido"),
    password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres")
})
export type LoginSchema = z.infer<typeof loginSchema>

export type User = {
    id: string
    name: string
    role: string
}

export type AuthResponse = {
    user: User
    token: string
}

export function loginWithEmailAndPassword(data: LoginSchema): Promise<AuthResponse> {
    return api.post("/auth/login", data)
}

export function logoutFromServer(): Promise<void> {
    return api.post("/auth/logout")
}