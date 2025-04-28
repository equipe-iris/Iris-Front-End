"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema, LoginSchema } from "@/lib/auth";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export function LoginForm() {

    const { login, loading } = useAuth()
    const router = useRouter()

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(data: LoginSchema) {
        try {
            await login(data)
            toast.success("Autenticado com sucesso")
            router.push("/app/dashboard")
        } catch (error) {
            toast.error(`Erro ao fazer login: ${error}`)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-[406px] flex flex-col gap-9"
                >
                    <div className="w-full flex flex-col gap-3 text-center">
                        <h1 className="text-zinc-800 text-2xl font-medium">Bem-vindo(a) de volta!</h1>
                        <p className="text-zinc-600 text-sm">Por favor, preencha suas informações para acessar o sistema</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="seuemail@dominio.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className={`${loading ? "cursor-not-allowed opacity-70" : ""}`}>
                        {loading && (<LoaderCircle className="size-4 animate-spin"/>)}
                        Entrar
                    </Button>
                </form>
            </Form>

        </div>
    )
}