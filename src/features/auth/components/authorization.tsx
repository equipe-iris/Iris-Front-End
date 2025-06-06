"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/use-auth"

interface AuthorizationProps {
    children: React.ReactNode
    allowedRole?: "ADMIN" | "VIEWER"
}

export function Authorization({ children, allowedRole }: AuthorizationProps) {

    const { user, isAuthenticated, isInitializing } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (!isInitializing) { // Aguarda a inicialização
            if (!isAuthenticated) {
                router.replace("/auth/login")
            } else if (allowedRole && user?.role !== allowedRole) {
                router.push("/auth/unauthorized")
            }
        }
    }, [isAuthenticated, router, user, allowedRole, isInitializing])

    if (isInitializing || !isAuthenticated || (allowedRole && user?.role !== allowedRole)) {
        return null
    }

    return <>{children}</>
}